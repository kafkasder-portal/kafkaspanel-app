/**
 * Akıllı Yanıt Üretici Modülü
 * Context7 best practices ile geliştirilmiş yapay zeka yanıt sistemi
 */

import type { EnhancedNLPResult } from './enhancedNlpProcessor';
import type { ConversationContext, ConversationInsights } from './conversationAnalyzer';

// Type definitions - Immutable ve type-safe
export interface ResponseTemplate {
  readonly id: string;
  readonly category: string;
  readonly template: string;
  readonly variables: readonly string[];
  readonly tone: 'formal' | 'informal' | 'neutral';
  readonly confidence: number;
}

export interface ContextualResponse {
  readonly content: string;
  readonly confidence: number;
  readonly tone: 'formal' | 'informal' | 'neutral';
  readonly suggestions: readonly string[];
  readonly followUpQuestions: readonly string[];
  readonly actionItems: readonly string[];
  readonly metadata: {
    readonly templateUsed?: string;
    readonly reasoning?: string;
    readonly alternatives?: readonly string[];
  };
}

export interface ResponsePersonalization {
  readonly userId: string;
  readonly preferredTone: 'formal' | 'informal' | 'neutral';
  readonly responseLength: 'short' | 'medium' | 'long';
  readonly expertiseLevel: 'beginner' | 'intermediate' | 'expert';
  readonly interests: readonly string[];
  readonly commonPatterns: readonly string[];
}

// Gelişmiş Türkçe yanıt şablonları
const RESPONSE_TEMPLATES: Record<string, readonly ResponseTemplate[]> = {
  CREATE: [
    {
      id: 'create_success',
      category: 'success',
      template: '✅ {entity} başarıyla oluşturuldu. {details} {nextSteps}',
      variables: ['entity', 'details', 'nextSteps'],
      tone: 'neutral',
      confidence: 0.9
    },
    {
      id: 'create_confirm',
      category: 'confirmation',
      template: '📝 {entity} oluşturmak için aşağıdaki bilgileri doğrular mısınız? {details}',
      variables: ['entity', 'details'],
      tone: 'formal',
      confidence: 0.8
    },
    {
      id: 'create_missing_info',
      category: 'request_info',
      template: '⚠️ {entity} oluşturmak için {missingFields} bilgilerine ihtiyacım var.',
      variables: ['entity', 'missingFields'],
      tone: 'neutral',
      confidence: 0.7
    }
  ],
  
  READ: [
    {
      id: 'read_results',
      category: 'data_presentation',
      template: '📊 {count} adet {entity} bulundu. {summary} {filterOptions}',
      variables: ['count', 'entity', 'summary', 'filterOptions'],
      tone: 'neutral',
      confidence: 0.9
    },
    {
      id: 'read_empty',
      category: 'no_results',
      template: '🔍 {criteria} için sonuç bulunamadı. {suggestions}',
      variables: ['criteria', 'suggestions'],
      tone: 'neutral',
      confidence: 0.8
    },
    {
      id: 'read_search_help',
      category: 'search_assistance',
      template: '🎯 Arama kriterlerinizi genişletebiliriz: {options}',
      variables: ['options'],
      tone: 'informal',
      confidence: 0.7
    }
  ],

  UPDATE: [
    {
      id: 'update_success',
      category: 'success',
      template: '✏️ {entity} başarıyla güncellendi. {changes}',
      variables: ['entity', 'changes'],
      tone: 'neutral',
      confidence: 0.9
    },
    {
      id: 'update_confirm',
      category: 'confirmation',
      template: '🔄 {entity} için yapılacak değişiklikler: {changes} Onaylıyor musunuz?',
      variables: ['entity', 'changes'],
      tone: 'formal',
      confidence: 0.8
    }
  ],

  DELETE: [
    {
      id: 'delete_confirm',
      category: 'confirmation',
      template: '⚠️ {entity} silinecek. Bu işlem geri alınamaz. Emin misiniz?',
      variables: ['entity'],
      tone: 'formal',
      confidence: 0.9
    },
    {
      id: 'delete_success',
      category: 'success',
      template: '🗑️ {entity} başarıyla silindi.',
      variables: ['entity'],
      tone: 'neutral',
      confidence: 0.9
    }
  ],

  HELP: [
    {
      id: 'help_general',
      category: 'guidance',
      template: '💡 Size nasıl yardımcı olabilirim? {options}',
      variables: ['options'],
      tone: 'informal',
      confidence: 0.8
    },
    {
      id: 'help_specific',
      category: 'specific_help',
      template: '📚 {topic} hakkında: {explanation} {examples}',
      variables: ['topic', 'explanation', 'examples'],
      tone: 'neutral',
      confidence: 0.9
    }
  ],

  ERROR: [
    {
      id: 'error_general',
      category: 'error_handling',
      template: '❌ Bir sorun oluştu: {error} {suggestions}',
      variables: ['error', 'suggestions'],
      tone: 'neutral',
      confidence: 0.7
    },
    {
      id: 'error_permission',
      category: 'permission_error',
      template: '🔒 Bu işlem için yetkiniz bulunmuyor. {alternatives}',
      variables: ['alternatives'],
      tone: 'formal',
      confidence: 0.9
    }
  ]
} as const;

// Kişiselleştirme kalıpları
const PERSONALIZATION_PATTERNS = {
  FORMAL_RESPONSES: {
    greeting: ['Sayın kullanıcı', 'Değerli kullanıcı'],
    confirmation: ['Lütfen onayınızı veriniz', 'Tasdik eder misiniz'],
    closing: ['Saygılarımla', 'İyi çalışmalar dilerim']
  },
  
  INFORMAL_RESPONSES: {
    greeting: ['Merhaba', 'Selam', 'Hey'],
    confirmation: ['Tamam mı?', 'Onaylıyor musun?'],
    closing: ['Görüşürüz', 'Başka bir şey?', 'Yardımcı olabildiysem ne mutlu']
  },
  
  EXPERTISE_ADAPTATIONS: {
    beginner: {
      explanationLevel: 'detailed',
      technicalTerms: 'minimal',
      stepByStep: true
    },
    intermediate: {
      explanationLevel: 'moderate',
      technicalTerms: 'some',
      stepByStep: false
    },
    expert: {
      explanationLevel: 'brief',
      technicalTerms: 'extensive',
      stepByStep: false
    }
  }
} as const;

export class IntelligentResponseGenerator {
  private static instance: IntelligentResponseGenerator;
  private readonly userProfiles = new Map<string, ResponsePersonalization>();
  
  private constructor() {
    // Singleton pattern
  }
  
  static getInstance(): IntelligentResponseGenerator {
    if (!IntelligentResponseGenerator.instance) {
      IntelligentResponseGenerator.instance = new IntelligentResponseGenerator();
    }
    return IntelligentResponseGenerator.instance;
  }

  /**
   * Bağlamsal ve kişiselleştirilmiş yanıt üretir
   */
  generateContextualResponse(
    nlpResult: EnhancedNLPResult,
    conversationContext: ConversationContext,
    conversationInsights: ConversationInsights,
    operationResult?: { success: boolean; data?: unknown; error?: string }
  ): ContextualResponse {
    
    const userProfile = this.getUserProfile(conversationContext.userId);
    const intent = nlpResult.intent.primary;
    const templates = RESPONSE_TEMPLATES[intent] || RESPONSE_TEMPLATES.HELP;
    
    // En uygun template seç
    const selectedTemplate = this.selectBestTemplate(
      templates,
      nlpResult,
      userProfile,
      operationResult
    );
    
    // Template'i kişiselleştir ve doldur
    const personalizedContent = this.personalizeResponse(
      selectedTemplate,
      nlpResult,
      userProfile,
      operationResult
    );
    
    // Öneriler ve takip soruları üret
    const suggestions = this.generateSmartSuggestions(nlpResult, conversationInsights);
    const followUpQuestions = this.generateFollowUpQuestions(nlpResult, conversationContext);
    const actionItems = this.generateActionItems(nlpResult, operationResult);
    
    // Güven skoru hesapla
    const confidence = this.calculateResponseConfidence(
      nlpResult,
      selectedTemplate,
      operationResult
    );
    
    return {
      content: personalizedContent,
      confidence,
      tone: userProfile.preferredTone,
      suggestions,
      followUpQuestions,
      actionItems,
      metadata: {
        templateUsed: selectedTemplate.id,
        reasoning: this.generateReasoningExplanation(nlpResult, selectedTemplate),
        alternatives: this.generateAlternativeResponses(templates, selectedTemplate)
      }
    } as const;
  }

  /**
   * Kullanıcı profilini günceller veya oluşturur
   */
  updateUserProfile(
    userId: string,
    updates: Partial<ResponsePersonalization>
  ): void {
    const existingProfile = this.userProfiles.get(userId) || {
      userId,
      preferredTone: 'neutral',
      responseLength: 'medium',
      expertiseLevel: 'intermediate',
      interests: [],
      commonPatterns: []
    } as ResponsePersonalization;

    const updatedProfile: ResponsePersonalization = {
      ...existingProfile,
      ...updates
    } as const;

    this.userProfiles.set(userId, updatedProfile);
  }

  /**
   * Kullanıcının etkileşim geçmişinden otomatik profil çıkarır
   */
  learnFromUserInteraction(
    userId: string,
    userMessage: string,
    _userResponse: string
  ): void {
    const profile = this.getUserProfile(userId);
    
    // Ton tercihi öğrenme
    const detectedTone = this.detectUserPreferredTone(userMessage);
    if (detectedTone !== 'neutral') {
      this.updateUserProfile(userId, { preferredTone: detectedTone });
    }
    
    // Uzmanlık seviyesi tahmini
    const expertiseLevel = this.estimateExpertiseLevel(userMessage);
    if (expertiseLevel !== profile.expertiseLevel) {
      this.updateUserProfile(userId, { expertiseLevel });
    }
    
    // İlgi alanları çıkarımı
    const interests = this.extractInterests(userMessage);
    if (interests.length > 0) {
      const updatedInterests = [...new Set([...profile.interests, ...interests])];
      this.updateUserProfile(userId, { interests: updatedInterests });
    }
  }

  private getUserProfile(userId: string): ResponsePersonalization {
    return this.userProfiles.get(userId) || {
      userId,
      preferredTone: 'neutral',
      responseLength: 'medium',
      expertiseLevel: 'intermediate',
      interests: [],
      commonPatterns: []
    } as const;
  }

  private selectBestTemplate(
    templates: readonly ResponseTemplate[],
    _nlpResult: EnhancedNLPResult,
    userProfile: ResponsePersonalization,
    operationResult?: { success: boolean; data?: unknown; error?: string }
  ): ResponseTemplate {
    
    // Durum bazlı filtreleme
    let filteredTemplates = templates;
    
    if (operationResult) {
      if (operationResult.success) {
        filteredTemplates = templates.filter(t => 
          t.category === 'success' || t.category === 'data_presentation'
        );
      } else {
        filteredTemplates = templates.filter(t => 
          t.category === 'error_handling' || t.category === 'request_info'
        );
      }
    }
    
    // Ton uyumluluğu
    const toneMatchedTemplates = filteredTemplates.filter(t => 
      t.tone === userProfile.preferredTone || t.tone === 'neutral'
    );
    
    if (toneMatchedTemplates.length > 0) {
      filteredTemplates = toneMatchedTemplates;
    }
    
    // En yüksek güven skoruna sahip template'i seç
    return filteredTemplates.reduce((best, current) => 
      current.confidence > best.confidence ? current : best
    );
  }

  private personalizeResponse(
    template: ResponseTemplate,
    nlpResult: EnhancedNLPResult,
    userProfile: ResponsePersonalization,
    operationResult?: { success: boolean; data?: unknown; error?: string }
  ): string {
    
    let content = template.template;
    
    // Template değişkenlerini doldur
    const variables = this.extractTemplateVariables(nlpResult, operationResult);
    
    template.variables.forEach(variable => {
      const value = variables[variable] || `[${variable}]`;
      content = content.replace(new RegExp(`{${variable}}`, 'g'), value);
    });
    
    // Kişiselleştirme eklemeleri
    content = this.addPersonalizationElements(content, userProfile);
    
    // Uzmanlık seviyesine göre açıklama ekle
    content = this.adjustForExpertiseLevel(content, userProfile.expertiseLevel);
    
    return content;
  }

  private generateSmartSuggestions(
    nlpResult: EnhancedNLPResult,
    insights: ConversationInsights
  ): readonly string[] {
    const suggestions: string[] = [];
    
    // Intent bazlı öneriler
    const intentSuggestions = this.getIntentBasedSuggestions(nlpResult.intent.primary);
    suggestions.push(...intentSuggestions);
    
    // Entity bazlı öneriler
    if (nlpResult.structuredEntities.money?.length) {
      suggestions.push('Bağış raporunu görüntüle', 'Finansal özet al');
    }
    
    if (nlpResult.structuredEntities.persons?.length) {
      suggestions.push('Kişi detaylarını görüntüle', 'İletişim bilgilerini güncelle');
    }
    
    // Konuşma geçmişi bazlı öneriler
    insights.suggestedActions.forEach(action => {
      if (!suggestions.includes(action)) {
        suggestions.push(action);
      }
    });
    
    return suggestions.slice(0, 5);
  }

  private generateFollowUpQuestions(
    nlpResult: EnhancedNLPResult,
    context: ConversationContext
  ): readonly string[] {
    const questions: string[] = [];
    
    // Düşük güven skorunda netleştirme soruları
    if (nlpResult.confidence < 0.7) {
      questions.push('Amacınızı daha detaylı açıklayabilir misiniz?');
    }
    
    // Entity eksikliğinde bilgi toplama
    if (nlpResult.intent.primary === 'CREATE') {
      if (!nlpResult.structuredEntities.persons?.length) {
        questions.push('Hangi kişi için işlem yapmak istiyorsunuz?');
      }
      if (!nlpResult.structuredEntities.money?.length) {
        questions.push('Tutar belirtmek ister misiniz?');
      }
    }
    
    // Bağlam bazlı sorular
    if (context.turns.length > 5) {
      questions.push('Başka hangi konularda yardımcı olabilirim?');
    }
    
    return questions.slice(0, 3);
  }

  private generateActionItems(
    nlpResult: EnhancedNLPResult,
    operationResult?: { success: boolean; data?: unknown; error?: string }
  ): readonly string[] {
    const actions: string[] = [];
    
    if (operationResult?.success) {
      actions.push('İşlem tamamlandı ✓');
      
      if (nlpResult.intent.primary === 'CREATE') {
        actions.push('Oluşturulan kaydı kontrol et');
      }
    } else if (operationResult?.error) {
      actions.push('Hata giderilmesi gerekiyor');
      actions.push('Eksik bilgileri tamamla');
    }
    
    // Aciliyet bazlı aksiyonlar
    if (nlpResult.contextAnalysis.urgency === 'high') {
      actions.push('Öncelikli işlem olarak işaretle');
    }
    
    return actions;
  }

  private calculateResponseConfidence(
    nlpResult: EnhancedNLPResult,
    template: ResponseTemplate,
    operationResult?: { success: boolean; data?: unknown; error?: string }
  ): number {
    let confidence = template.confidence;
    
    // NLP güven skoru etkisi
    confidence *= nlpResult.confidence;
    
    // Operasyon sonucu etkisi
    if (operationResult) {
      if (operationResult.success) {
        confidence += 0.1;
      } else {
        confidence -= 0.1;
      }
    }
    
    return Math.min(Math.max(confidence, 0), 1);
  }

  // Helper methods
  private extractTemplateVariables(
    nlpResult: EnhancedNLPResult,
    operationResult?: { success: boolean; data?: unknown; error?: string }
  ): Record<string, string> {
    const variables: Record<string, string> = {};
    
    // Entity'lerden değişken çıkarımı
    if (nlpResult.structuredEntities.persons?.length) {
      variables.entity = nlpResult.structuredEntities.persons[0].fullName;
    }
    
    if (nlpResult.structuredEntities.money?.length) {
      const money = nlpResult.structuredEntities.money[0];
      variables.amount = `${money.amount} ${money.currency}`;
    }
    
    // Operasyon sonucundan değişkenler
    if (operationResult?.data && Array.isArray(operationResult.data)) {
      variables.count = operationResult.data.length.toString();
    }
    
    return variables;
  }

  private addPersonalizationElements(
    content: string,
    userProfile: ResponsePersonalization
  ): string {
    let personalizedContent = content;
    
    // Ton bazlı eklentiler
    if (userProfile.preferredTone === 'formal') {
      if (!personalizedContent.startsWith('Sayın')) {
        personalizedContent = `Sayın kullanıcı, ${personalizedContent.toLowerCase()}`;
      }
    } else if (userProfile.preferredTone === 'informal') {
      if (!personalizedContent.match(/^(Merhaba|Selam|Hey)/)) {
        personalizedContent = `Merhaba! ${personalizedContent}`;
      }
    }
    
    return personalizedContent;
  }

  private adjustForExpertiseLevel(
    content: string,
    level: ResponsePersonalization['expertiseLevel']
  ): string {
    const adaptations = PERSONALIZATION_PATTERNS.EXPERTISE_ADAPTATIONS[level];
    
    if (adaptations.explanationLevel === 'detailed') {
      // Yeni başlayanlar için daha detaylı açıklama ekle
      if (!content.includes('detaylı')) {
        content += ' Detaylar için yardım menüsünü kullanabilirsiniz.';
      }
    }
    
    return content;
  }

  private getIntentBasedSuggestions(intent: string): readonly string[] {
    const suggestionMap: Record<string, readonly string[]> = {
      CREATE: ['Kaydet ve devam et', 'Önizleme göster', 'Benzer kayıt oluştur'],
      READ: ['Filtrele', 'Sırala', 'Dışa aktar'],
      UPDATE: ['Değişiklikleri kaydet', 'Geri al', 'Geçmişi görüntüle'],
      DELETE: ['Kalıcı olarak sil', 'Geri dönüşüm kutusuna taşı'],
      HELP: ['Komut listesi', 'Video rehber', 'Canlı destek']
    };
    
    return suggestionMap[intent] || ['Daha fazla bilgi al'];
  }

  private detectUserPreferredTone(message: string): 'formal' | 'informal' | 'neutral' {
    const text = message.toLowerCase();
    
    const formalIndicators = ['sayın', 'saygılar', 'rica ederim', 'lütfen'];
    const informalIndicators = ['selam', 'merhaba', 'teşekkürler', 'nasılsın'];
    
    const formalCount = formalIndicators.filter(ind => text.includes(ind)).length;
    const informalCount = informalIndicators.filter(ind => text.includes(ind)).length;
    
    if (formalCount > informalCount) return 'formal';
    if (informalCount > formalCount) return 'informal';
    return 'neutral';
  }

  private estimateExpertiseLevel(message: string): ResponsePersonalization['expertiseLevel'] {
    const text = message.toLowerCase();
    const technicalTerms = ['api', 'veritabanı', 'sql', 'algoritma', 'performans'];
    const basicTerms = ['nasıl', 'nedir', 'anlamadım', 'öğrenebilir miyim'];
    
    const technicalCount = technicalTerms.filter(term => text.includes(term)).length;
    const basicCount = basicTerms.filter(term => text.includes(term)).length;
    
    if (technicalCount > 1) return 'expert';
    if (basicCount > 0) return 'beginner';
    return 'intermediate';
  }

  private extractInterests(message: string): readonly string[] {
    const text = message.toLowerCase();
    const interestKeywords = [
      'rapor', 'analiz', 'grafik', 'istatistik',
      'bağış', 'yardım', 'toplantı', 'görev'
    ];
    
    return interestKeywords.filter(keyword => text.includes(keyword));
  }

  private generateReasoningExplanation(
    nlpResult: EnhancedNLPResult,
    template: ResponseTemplate
  ): string {
    return `Intent: ${nlpResult.intent.primary} (${Math.round(nlpResult.intent.confidence * 100)}%) → Template: ${template.id}`;
  }

  private generateAlternativeResponses(
    templates: readonly ResponseTemplate[],
    selected: ResponseTemplate
  ): readonly string[] {
    return templates
      .filter(t => t.id !== selected.id)
      .slice(0, 2)
      .map(t => t.template);
  }
}

// Singleton instance export
export const intelligentResponseGenerator = IntelligentResponseGenerator.getInstance();
