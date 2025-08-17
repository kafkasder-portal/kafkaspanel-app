export interface UserIntent {
  id: string;
  type: IntentType;
  confidence: number;
  entities: IntentEntity[];
  context?: IntentContext;
  timestamp: Date;
}

export type IntentType = 
  | 'navigation'
  | 'search'
  | 'create'
  | 'update'
  | 'delete'
  | 'view'
  | 'help'
  | 'settings'
  | 'export'
  | 'import'
  | 'analyze'
  | 'report'
  | 'unknown';

export interface IntentEntity {
  type: EntityType;
  value: string;
  confidence: number;
  startIndex?: number;
  endIndex?: number;
}

export type EntityType =
  | 'module'
  | 'action'
  | 'date'
  | 'number'
  | 'person'
  | 'organization'
  | 'location'
  | 'file'
  | 'status'
  | 'category';

export interface IntentContext {
  currentModule?: string;
  currentPage?: string;
  userRole?: string;
  previousIntents?: UserIntent[];
  sessionData?: Record<string, any>;
}

export interface IntentAction {
  type: string;
  payload?: Record<string, any>;
  route?: string;
  component?: string;
}

export interface IntentResponse {
  intent: UserIntent;
  actions: IntentAction[];
  suggestions?: string[];
  confidence: number;
}

// Intent patterns for Turkish language
const INTENT_PATTERNS = {
  navigation: [
    /(?:git|aç|göster|görüntüle)\s+(dashboard|ana sayfa|bağış|burs|görev|ayar)/i,
    /(?:dashboard|ana sayfa|bağış|burs|görev|ayar)\s*(?:a|e)?\s*(?:git|aç|göster)/i,
    /(dashboard|ana sayfa|bağış|burs|görev|ayar)\s*(?:sayfası)?/i
  ],
  search: [
    /(?:ara|bul|arama)\s+(.+)/i,
    /(.+)\s+(?:ara|bul|arama)/i,
    /(?:nerede|hangi)\s+(.+)/i
  ],
  create: [
    /(?:yeni|oluştur|ekle|kaydet)\s+(.+)/i,
    /(.+)\s+(?:oluştur|ekle|kaydet)/i,
    /(?:bir)?\s*(.+)\s+(?:yap|oluştur)/i
  ],
  update: [
    /(?:güncelle|değiştir|düzenle)\s+(.+)/i,
    /(.+)\s+(?:güncelle|değiştir|düzenle)/i
  ],
  delete: [
    /(?:sil|kaldır)\s+(.+)/i,
    /(.+)\s+(?:sil|kaldır)/i
  ],
  view: [
    /(?:göster|görüntüle|listele)\s+(.+)/i,
    /(.+)\s+(?:göster|görüntüle|listele)/i,
    /(.+)\s+(?:neler|hangileri)/i
  ],
  help: [
    /(?:yardım|nasıl|ne yapmalı)/i,
    /(?:help|yardım)\s*(.+)?/i,
    /(.+)\s+(?:nasıl yapılır|nasıl)/i
  ],
  settings: [
    /(?:ayar|ayarlar|konfigürasyon)/i,
    /(?:profil|hesap)\s*(?:ayar)?/i
  ],
  export: [
    /(?:dışa aktar|export|indir)\s+(.+)/i,
    /(.+)\s+(?:dışa aktar|export|indir)/i
  ],
  import: [
    /(?:içe aktar|import|yükle)\s+(.+)/i,
    /(.+)\s+(?:içe aktar|import|yükle)/i
  ],
  analyze: [
    /(?:analiz|analiz et|incele)\s+(.+)/i,
    /(.+)\s+(?:analiz|analiz et|incele)/i
  ],
  report: [
    /(?:rapor|rapor al|rapor oluştur)\s*(.+)?/i,
    /(.+)\s+(?:rapor|rapor al)/i
  ]
};

// Entity patterns
const ENTITY_PATTERNS = {
  module: /(dashboard|ana sayfa|bağış|burs|görev|ayar|kullanıcı|profil)/i,
  action: /(oluştur|sil|güncelle|göster|ara|ekle|kaldır|düzenle)/i,
  date: /(bugün|dün|yarın|bu hafta|geçen hafta|bu ay|geçen ay|\d{1,2}[.\/]\d{1,2}[.\/]\d{2,4})/i,
  number: /(\d+)/g,
  status: /(aktif|pasif|beklemede|tamamlandı|iptal|onaylandı|reddedildi)/i
};

export class IntentRecognizer {
  private context: IntentContext;

  constructor(context: IntentContext = {}) {
    this.context = context;
  }

  async recognizeIntent(input: string): Promise<IntentResponse> {
    const normalizedInput = this.normalizeInput(input);
    const intent = this.extractIntent(normalizedInput);
    const actions = this.generateActions(intent);
    const suggestions = this.generateSuggestions(intent);

    return {
      intent,
      actions,
      suggestions,
      confidence: intent.confidence
    };
  }

  private normalizeInput(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[.,!?;]/g, '')
      .replace(/\s+/g, ' ');
  }

  private extractIntent(input: string): UserIntent {
    let bestMatch: { type: IntentType; confidence: number; entities: IntentEntity[] } = {
      type: 'unknown',
      confidence: 0,
      entities: []
    };

    // Check each intent type
    for (const [intentType, patterns] of Object.entries(INTENT_PATTERNS)) {
      for (const pattern of patterns) {
        const match = input.match(pattern);
        if (match) {
          const confidence = this.calculateConfidence(match, input);
          if (confidence > bestMatch.confidence) {
            bestMatch = {
              type: intentType as IntentType,
              confidence,
              entities: this.extractEntities(input, match)
            };
          }
        }
      }
    }

    return {
      id: this.generateId(),
      type: bestMatch.type,
      confidence: bestMatch.confidence,
      entities: bestMatch.entities,
      context: this.context,
      timestamp: new Date()
    };
  }

  private extractEntities(input: string, match: RegExpMatchArray): IntentEntity[] {
    const entities: IntentEntity[] = [];

    // Extract entities from the matched groups
    if (match[1]) {
      const entityText = match[1].trim();
      
      // Check for module entities
      const moduleMatch = entityText.match(ENTITY_PATTERNS.module);
      if (moduleMatch) {
        entities.push({
          type: 'module',
          value: moduleMatch[0],
          confidence: 0.9
        });
      }

      // Check for action entities
      const actionMatch = entityText.match(ENTITY_PATTERNS.action);
      if (actionMatch) {
        entities.push({
          type: 'action',
          value: actionMatch[0],
          confidence: 0.8
        });
      }

      // Check for date entities
      const dateMatch = entityText.match(ENTITY_PATTERNS.date);
      if (dateMatch) {
        entities.push({
          type: 'date',
          value: dateMatch[0],
          confidence: 0.7
        });
      }

      // Check for number entities
      const numberMatches = entityText.match(ENTITY_PATTERNS.number);
      if (numberMatches) {
        numberMatches.forEach(num => {
          entities.push({
            type: 'number',
            value: num,
            confidence: 0.9
          });
        });
      }

      // Check for status entities
      const statusMatch = entityText.match(ENTITY_PATTERNS.status);
      if (statusMatch) {
        entities.push({
          type: 'status',
          value: statusMatch[0],
          confidence: 0.8
        });
      }
    }

    return entities;
  }

  private calculateConfidence(match: RegExpMatchArray, input: string): number {
    const matchLength = match[0].length;
    const inputLength = input.length;
    const coverage = matchLength / inputLength;
    
    // Base confidence from coverage
    let confidence = Math.min(coverage * 1.5, 1.0);
    
    // Boost confidence for exact module matches
    if (match[0].match(ENTITY_PATTERNS.module)) {
      confidence = Math.min(confidence + 0.2, 1.0);
    }
    
    // Boost confidence for action words
    if (match[0].match(ENTITY_PATTERNS.action)) {
      confidence = Math.min(confidence + 0.1, 1.0);
    }
    
    return Math.round(confidence * 100) / 100;
  }

  private generateActions(intent: UserIntent): IntentAction[] {
    const actions: IntentAction[] = [];

    switch (intent.type) {
      case 'navigation':
        const moduleEntity = intent.entities.find(e => e.type === 'module');
        if (moduleEntity) {
          actions.push({
            type: 'navigate',
            route: this.getModuleRoute(moduleEntity.value),
            payload: { module: moduleEntity.value }
          });
        }
        break;

      case 'search':
        const searchTerm = intent.entities.find(e => e.type !== 'action')?.value;
        if (searchTerm) {
          actions.push({
            type: 'search',
            payload: { query: searchTerm, module: this.context.currentModule }
          });
        }
        break;

      case 'create':
        const createEntity = intent.entities.find(e => e.type === 'module');
        if (createEntity) {
          actions.push({
            type: 'create',
            route: `/${createEntity.value}/new`,
            payload: { type: createEntity.value }
          });
        }
        break;

      case 'help':
        actions.push({
          type: 'help',
          component: 'HelpModal',
          payload: { context: this.context.currentModule }
        });
        break;

      case 'settings':
        actions.push({
          type: 'navigate',
          route: '/settings',
          payload: { module: 'settings' }
        });
        break;

      default:
        actions.push({
          type: 'fallback',
          payload: { originalInput: intent }
        });
    }

    return actions;
  }

  private generateSuggestions(intent: UserIntent): string[] {
    const suggestions: string[] = [];

    switch (intent.type) {
      case 'navigation':
        suggestions.push(
          'Dashboard\'a git',
          'Bağışları göster',
          'Yeni burs oluştur',
          'Görevleri listele'
        );
        break;

      case 'search':
        suggestions.push(
          'Aktif bağışları ara',
          'Bu ayki bursları bul',
          'Tamamlanan görevleri göster'
        );
        break;

      case 'create':
        suggestions.push(
          'Yeni bağış oluştur',
          'Burs başvurusu ekle',
          'Görev ata'
        );
        break;

      case 'unknown':
        suggestions.push(
          'Dashboard\'a git',
          'Yardım al',
          'Arama yap',
          'Ayarları aç'
        );
        break;
    }

    return suggestions.slice(0, 4); // Limit to 4 suggestions
  }

  private getModuleRoute(module: string): string {
    const routes: Record<string, string> = {
      'dashboard': '/',
      'ana sayfa': '/',
      'bağış': '/donations',
      'burs': '/scholarships',
      'görev': '/tasks',
      'ayar': '/settings',
      'kullanıcı': '/users',
      'profil': '/profile'
    };

    return routes[module.toLowerCase()] || '/';
  }

  private generateId(): string {
    return `intent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  updateContext(newContext: Partial<IntentContext>): void {
    this.context = { ...this.context, ...newContext };
  }

  getContext(): IntentContext {
    return { ...this.context };
  }
}

// Singleton instance
let recognizerInstance: IntentRecognizer | null = null;

export const getIntentRecognizer = (context?: IntentContext): IntentRecognizer => {
  if (!recognizerInstance) {
    recognizerInstance = new IntentRecognizer(context);
  } else if (context) {
    recognizerInstance.updateContext(context);
  }
  return recognizerInstance;
};

// Convenience function
export const recognizeUserIntent = async (
  input: string,
  context?: IntentContext
): Promise<IntentResponse> => {
  const recognizer = getIntentRecognizer(context);
  return recognizer.recognizeIntent(input);
};

export default {
  IntentRecognizer,
  getIntentRecognizer,
  recognizeUserIntent
};