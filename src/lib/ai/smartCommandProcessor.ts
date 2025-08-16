import { enhancedNlpProcessor, type EnhancedNLPResult } from './enhancedNlpProcessor'
import { moduleController } from './moduleController'
import type { ProcessedCommand, CommandResult } from './commandProcessor'

export interface SmartCommand {
  originalText: string
  nlpResult: EnhancedNLPResult
  processedCommand: ProcessedCommand
  executionPlan: ExecutionStep[]
  confidence: number
  requiredConfirmation: boolean
  estimatedDuration: number // in seconds
}

export interface ExecutionStep {
  id: string
  type: 'validation' | 'data_collection' | 'execution' | 'notification' | 'follow_up'
  description: string
  module?: string
  action?: string
  parameters?: any
  dependencies?: string[]
  optional?: boolean
}

export interface SmartCommandResult extends CommandResult {
  executionSteps: ExecutionStep[]
  followUpActions: string[]
  learnedPatterns: string[]
  userFeedback?: 'positive' | 'negative' | 'neutral'
}

export class SmartCommandProcessor {
  private static instance: SmartCommandProcessor
  private executionHistory: Array<{
    command: string
    result: SmartCommandResult
    timestamp: Date
    userId?: string
  }> = []
  
  private learnedPatterns: Map<string, {
    pattern: string
    successRate: number
    usageCount: number
    lastUsed: Date
  }> = new Map()

  static getInstance(): SmartCommandProcessor {
    if (!SmartCommandProcessor.instance) {
      SmartCommandProcessor.instance = new SmartCommandProcessor()
    }
    return SmartCommandProcessor.instance
  }

  async processSmartCommand(
    text: string, 
    userId?: string, 
    context?: any
  ): Promise<SmartCommand> {
    // 1. Gelişmiş NLP analizi
    const nlpResult = enhancedNlpProcessor.process(text)
    
    // 2. Komut türünü belirle
    const processedCommand = this.createProcessedCommand(nlpResult, context)
    
    // 3. Execution plan oluştur
    const executionPlan = await this.createExecutionPlan(nlpResult, processedCommand)
    
    // 4. Confidence ve risk değerlendirmesi
    const { confidence, requiredConfirmation } = this.assessCommandRisk(
      nlpResult, 
      processedCommand, 
      executionPlan
    )
    
    // 5. Tahmini süre hesaplama
    const estimatedDuration = this.estimateExecutionTime(executionPlan)

    return {
      originalText: text,
      nlpResult,
      processedCommand,
      executionPlan,
      confidence,
      requiredConfirmation,
      estimatedDuration
    }
  }

  async executeSmartCommand(
    smartCommand: SmartCommand, 
    userId?: string
  ): Promise<SmartCommandResult> {
    const startTime = Date.now()
    const executionSteps: ExecutionStep[] = []
    let success = true
    let errorMessage = ''
    let result: any = null

    try {
      // Execution plan'ı adım adım çalıştır
      for (const step of smartCommand.executionPlan) {
        const stepResult = await this.executeStep(step, smartCommand, userId)
        executionSteps.push({
          ...step,
          ...stepResult
        })

        if (!stepResult.success && !step.optional) {
          success = false
          errorMessage = stepResult.error || 'Adım başarısız oldu'
          break
        }

        if (stepResult.data) {
          result = stepResult.data
        }
      }

      // Follow-up actions oluştur
      const followUpActions = this.generateFollowUpActions(
        smartCommand, 
        executionSteps, 
        success
      )

      // Öğrenilen pattern'ları güncelle
      const learnedPatterns = this.updateLearnedPatterns(
        smartCommand, 
        success, 
        userId
      )

      const commandResult: SmartCommandResult = {
        success,
        message: success 
          ? this.generateSuccessMessage(smartCommand, result)
          : `Komut başarısız: ${errorMessage}`,
        data: result,
        executionSteps,
        followUpActions,
        learnedPatterns,
        suggestions: success 
          ? followUpActions.slice(0, 3)
          : smartCommand.nlpResult.suggestions
      }

      // Execution history'e ekle
      this.addToHistory(smartCommand.originalText, commandResult, userId)

      return commandResult

    } catch (error: any) {
      return {
        success: false,
        message: `Beklenmeyen hata: ${error.message}`,
        executionSteps: [],
        followUpActions: [],
        learnedPatterns: [],
        suggestions: ['Komutu kontrol edin ve tekrar deneyin']
      }
    }
  }

  private createProcessedCommand(
    nlpResult: EnhancedNLPResult, 
    context?: any
  ): ProcessedCommand {
    const { intent, structuredEntities } = nlpResult

    // Modül belirleme
    let module = this.determineModule(nlpResult)
    
    // Action belirleme
    let action = intent.primary.toLowerCase()
    
    // Parameters oluşturma
    const parameters: any = {}
    
    // Structured entities'den parametreleri çıkar
    if (structuredEntities.money?.length > 0) {
      parameters.amount = structuredEntities.money[0].amount
      parameters.currency = structuredEntities.money[0].currency
    }
    
    if (structuredEntities.persons?.length > 0) {
      const person = structuredEntities.persons[0]
      parameters.name = person.firstName
      parameters.surname = person.lastName
      parameters.fullName = person.fullName
    }
    
    if (structuredEntities.phones?.length > 0) {
      parameters.phone = structuredEntities.phones[0]
    }
    
    if (structuredEntities.emails?.length > 0) {
      parameters.email = structuredEntities.emails[0]
    }
    
    if (structuredEntities.dates?.length > 0) {
      parameters.date = structuredEntities.dates[0]
    }
    
    if (structuredEntities.priorities?.length > 0) {
      parameters.priority = structuredEntities.priorities[0]
    }

    // Conditions
    const conditions: any = {}
    if (nlpResult.contextAnalysis.urgency !== 'low') {
      conditions.urgency = nlpResult.contextAnalysis.urgency
    }

    return {
      intent: intent.primary,
      confidence: nlpResult.confidence,
      parameters,
      action,
      module,
      conditions,
      metadata: {
        nlpAnalysis: nlpResult,
        context
      }
    }
  }

  private determineModule(nlpResult: EnhancedNLPResult): string {
    const tokens = nlpResult.tokens.join(' ').toLowerCase()
    
    // Modül mapping
    const moduleKeywords: Record<string, string[]> = {
      'beneficiaries': ['hak sahibi', 'yararlanıcı', 'ihtiyaç sahibi', 'beneficiary'],
      'donations': ['bağış', 'bağışçı', 'donation', 'para', 'miktar'],
      'meetings': ['toplantı', 'meeting', 'görüşme', 'randevu'],
      'tasks': ['görev', 'task', 'iş', 'yapılacak'],
      'messages': ['mesaj', 'sms', 'email', 'bildirim'],
      'system': ['sistem', 'kullanıcı', 'user', 'ayar']
    }

    for (const [module, keywords] of Object.entries(moduleKeywords)) {
      if (keywords.some(keyword => tokens.includes(keyword))) {
        return module
      }
    }

    // Entity bazlı modül belirleme
    if (nlpResult.structuredEntities.money?.length > 0) {
      return 'donations'
    }
    
    if (nlpResult.structuredEntities.persons?.length > 0) {
      return 'beneficiaries'
    }

    return 'system' // Default module
  }

  private async createExecutionPlan(
    nlpResult: EnhancedNLPResult,
    processedCommand: ProcessedCommand
  ): Promise<ExecutionStep[]> {
    const steps: ExecutionStep[] = []

    // 1. Validation step
    steps.push({
      id: 'validate',
      type: 'validation',
      description: 'Komut parametrelerini doğrula',
      module: processedCommand.module,
      parameters: processedCommand.parameters
    })

    // 2. Data collection (if needed)
    if (this.needsDataCollection(processedCommand)) {
      steps.push({
        id: 'collect_data',
        type: 'data_collection',
        description: 'Eksik verileri topla',
        dependencies: ['validate'],
        optional: false
      })
    }

    // 3. Main execution
    steps.push({
      id: 'execute',
      type: 'execution',
      description: `${processedCommand.action} işlemini gerçekleştir`,
      module: processedCommand.module,
      action: processedCommand.action,
      parameters: processedCommand.parameters,
      dependencies: ['validate']
    })

    // 4. Notification (for important operations)
    if (this.needsNotification(processedCommand)) {
      steps.push({
        id: 'notify',
        type: 'notification',
        description: 'İlgili tarafları bilgilendir',
        dependencies: ['execute'],
        optional: true
      })
    }

    // 5. Follow-up actions
    if (this.hasFollowUp(processedCommand)) {
      steps.push({
        id: 'follow_up',
        type: 'follow_up',
        description: 'Takip işlemlerini planla',
        dependencies: ['execute'],
        optional: true
      })
    }

    return steps
  }

  private async executeStep(
    step: ExecutionStep, 
    smartCommand: SmartCommand, 
    userId?: string
  ): Promise<any> {
    try {
      switch (step.type) {
        case 'validation':
          return await this.validateStep(step, smartCommand)
        
        case 'data_collection':
          return await this.collectDataStep(step, smartCommand)
        
        case 'execution':
          return await this.executeMainStep(step, smartCommand)
        
        case 'notification':
          return await this.notifyStep(step, smartCommand, userId)
        
        case 'follow_up':
          return await this.followUpStep(step, smartCommand)
        
        default:
          return { success: false, error: 'Bilinmeyen adım türü' }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  private async validateStep(step: ExecutionStep, smartCommand: SmartCommand): Promise<any> {
    const { parameters } = smartCommand.processedCommand
    const errors: string[] = []

    // Required field validation
    if (smartCommand.processedCommand.action === 'create') {
      if (smartCommand.processedCommand.module === 'beneficiaries') {
        if (!parameters.name && !parameters.fullName) {
          errors.push('İsim gerekli')
        }
      } else if (smartCommand.processedCommand.module === 'donations') {
        if (!parameters.amount) {
          errors.push('Bağış miktarı gerekli')
        }
      }
    }

    return {
      success: errors.length === 0,
      errors,
      data: { validationPassed: errors.length === 0 }
    }
  }

  private async collectDataStep(step: ExecutionStep, smartCommand: SmartCommand): Promise<any> {
    // Bu adımda kullanıcıdan eksik bilgiler istenebilir
    // Şu an için placeholder
    return {
      success: true,
      data: { collectedData: {} }
    }
  }

  private async executeMainStep(step: ExecutionStep, smartCommand: SmartCommand): Promise<any> {
    try {
      const result = await moduleController.executeCommand(smartCommand.processedCommand)
      return {
        success: result.success,
        data: result.data,
        error: result.success ? undefined : result.message
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  private async notifyStep(
    step: ExecutionStep, 
    smartCommand: SmartCommand, 
    userId?: string
  ): Promise<any> {
    // Notification logic
    return {
      success: true,
      data: { notificationSent: true }
    }
  }

  private async followUpStep(step: ExecutionStep, smartCommand: SmartCommand): Promise<any> {
    // Follow-up logic
    return {
      success: true,
      data: { followUpScheduled: true }
    }
  }

  private needsDataCollection(command: ProcessedCommand): boolean {
    // Eksik parametre kontrolü
    if (command.action === 'create') {
      return Object.keys(command.parameters).length < 2
    }
    return false
  }

  private needsNotification(command: ProcessedCommand): boolean {
    // Önemli işlemler için bildirim
    return ['create', 'delete', 'approve', 'reject'].includes(command.action)
  }

  private hasFollowUp(command: ProcessedCommand): boolean {
    // Takip gerektiren işlemler
    return ['create', 'approve'].includes(command.action)
  }

  private assessCommandRisk(
    nlpResult: EnhancedNLPResult,
    command: ProcessedCommand,
    executionPlan: ExecutionStep[]
  ): { confidence: number; requiredConfirmation: boolean } {
    let confidence = nlpResult.confidence
    let requiredConfirmation = false

    // Risk faktörleri
    if (command.action === 'delete') {
      confidence *= 0.8
      requiredConfirmation = true
    }

    if (nlpResult.contextAnalysis.complexity === 'complex') {
      confidence *= 0.9
    }

    if (nlpResult.structuredEntities.money?.some(m => m.amount > 10000)) {
      requiredConfirmation = true
    }

    return { confidence, requiredConfirmation }
  }

  private estimateExecutionTime(executionPlan: ExecutionStep[]): number {
    const timeEstimates: Record<string, number> = {
      'validation': 1,
      'data_collection': 5,
      'execution': 3,
      'notification': 2,
      'follow_up': 1
    }

    return executionPlan.reduce((total, step) => {
      return total + (timeEstimates[step.type] || 2)
    }, 0)
  }

  private generateSuccessMessage(smartCommand: SmartCommand, result: any): string {
    const { action, module } = smartCommand.processedCommand
    
    const moduleNames: Record<string, string> = {
      'beneficiaries': 'Hak Sahibi',
      'donations': 'Bağış',
      'meetings': 'Toplantı',
      'tasks': 'Görev',
      'messages': 'Mesaj'
    }

    const actionNames: Record<string, string> = {
      'CREATE': 'oluşturuldu',
      'READ': 'listelendi',
      'UPDATE': 'güncellendi',
      'DELETE': 'silindi'
    }

    const moduleName = moduleNames[module || ''] || module
    const actionName = actionNames[action.toUpperCase()] || 'işlendi'

    if (Array.isArray(result)) {
      return `✅ ${result.length} ${moduleName} kaydı ${actionName}`
    } else {
      return `✅ ${moduleName} başarıyla ${actionName}`
    }
  }

  private generateFollowUpActions(
    smartCommand: SmartCommand,
    executionSteps: ExecutionStep[],
    success: boolean
  ): string[] {
    const actions: string[] = []
    const { action, module } = smartCommand.processedCommand

    if (success) {
      switch (action) {
        case 'create':
          actions.push(`${module} listele`, `${module} düzenle`, 'Rapor al')
          break
        case 'list':
          actions.push('Filtreleme uygula', 'Dışa aktar', 'Arama yap')
          break
        case 'update':
          actions.push('Değişiklikleri kontrol et', 'Bildirim gönder')
          break
      }
    } else {
      actions.push('Hatayı kontrol et', 'Tekrar dene', 'Yardım al')
    }

    return actions
  }

  private updateLearnedPatterns(
    smartCommand: SmartCommand,
    success: boolean,
    userId?: string
  ): string[] {
    const pattern = this.extractPattern(smartCommand)
    const existing = this.learnedPatterns.get(pattern)

    if (existing) {
      existing.usageCount++
      existing.lastUsed = new Date()
      if (success) {
        existing.successRate = (existing.successRate + 1) / 2
      } else {
        existing.successRate = existing.successRate * 0.9
      }
    } else {
      this.learnedPatterns.set(pattern, {
        pattern,
        successRate: success ? 0.8 : 0.2,
        usageCount: 1,
        lastUsed: new Date()
      })
    }

    return Array.from(this.learnedPatterns.values())
      .filter(p => p.successRate > 0.7)
      .map(p => p.pattern)
  }

  private extractPattern(smartCommand: SmartCommand): string {
    const { intent, structuredEntities } = smartCommand.nlpResult
    const entityTypes = Object.keys(structuredEntities)
      .filter(key => (structuredEntities as any)[key].length > 0)
      .join(',')
    
    return `${intent.primary}:${smartCommand.processedCommand.module}:${entityTypes}`
  }

  private addToHistory(
    command: string,
    result: SmartCommandResult,
    userId?: string
  ): void {
    this.executionHistory.push({
      command,
      result,
      timestamp: new Date(),
      userId
    })

    // Son 100 kaydı tut
    if (this.executionHistory.length > 100) {
      this.executionHistory.shift()
    }
  }

  // Public methods
  getExecutionHistory(userId?: string): typeof this.executionHistory {
    return userId 
      ? this.executionHistory.filter(h => h.userId === userId)
      : this.executionHistory
  }

  getLearnedPatterns(): Map<string, any> {
    return this.learnedPatterns
  }

  // Analytics
  getSuccessRate(): number {
    const total = this.executionHistory.length
    if (total === 0) return 0

    const successful = this.executionHistory.filter(h => h.result.success).length
    return successful / total
  }

  getMostUsedCommands(limit: number = 10): Array<{ command: string; count: number }> {
    const commandCounts = new Map<string, number>()
    
    this.executionHistory.forEach(h => {
      const normalized = h.command.toLowerCase().trim()
      commandCounts.set(normalized, (commandCounts.get(normalized) || 0) + 1)
    })

    return Array.from(commandCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([command, count]) => ({ command, count }))
  }
}

export const smartCommandProcessor = SmartCommandProcessor.getInstance()
