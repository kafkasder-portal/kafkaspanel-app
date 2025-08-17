/**
 * Gelişmiş Konuşma Analizi Modülü
 * TypeScript Best Practices uygulanarak geliştirilmiştir
 */

// Types - Immutable ve type-safe
export interface ConversationTurn {
  readonly id: string;
  readonly timestamp: Date;
  readonly speaker: 'user' | 'assistant';
  readonly content: string;
  readonly intent: string;
  readonly confidence: number;
  readonly entities: readonly Record<string, unknown>[];
}

export interface ConversationContext {
  readonly sessionId: string;
  readonly userId: string;
  readonly startTime: Date;
  readonly turns: readonly ConversationTurn[];
  readonly currentTopic?: string;
  readonly userPreferences: {
    readonly language: 'tr' | 'en';
    readonly formality: 'formal' | 'informal';
    readonly responseLength: 'short' | 'medium' | 'long';
  };
}

export interface ConversationInsights {
  readonly topicProgression: readonly string[];
  readonly userSatisfaction: 'high' | 'medium' | 'low';
  readonly conversationQuality: number; // 0-1
  readonly suggestedActions: readonly string[];
  readonly keyEntities: Record<string, number>; // entity -> frequency
  readonly conversationSummary: string;
}

export interface MemoryItem {
  readonly id: string;
  readonly timestamp: Date;
  readonly content: string;
  readonly relevanceScore: number;
  readonly type: 'fact' | 'preference' | 'context';
}

// Advanced Turkish Language Patterns
const TURKISH_LINGUISTIC_PATTERNS = {
  // Modalite ifadeleri (kesinlik derecesi)
  CERTAINTY: {
    high: ['kesinlikle', 'mutlaka', 'elbette', 'tabii ki', 'şüphesiz'],
    medium: ['sanırım', 'galiba', 'muhtemelen', 'belki de'],
    low: ['belki', 'mümkün', 'olabilir', 'ihtimal']
  },
  
  // Duygusal yoğunluk
  EMOTIONAL_INTENSITY: {
    high: ['çok', 'son derece', 'fevkalade', 'aşırı', 'büyük'],
    medium: ['oldukça', 'epey', 'bayağı', 'hayli'],
    low: ['biraz', 'az', 'hafif', 'kısmen']
  },
  
  // Zaman ifadeleri
  TEMPORAL_EXPRESSIONS: {
    immediate: ['hemen', 'şimdi', 'derhal', 'acilen'],
    soon: ['yakında', 'kısa sürede', 'en kısa zamanda'],
    later: ['sonra', 'daha sonra', 'ileride', 'gelecekte']
  }
} as const;

export class ConversationAnalyzer {
  private static instance: ConversationAnalyzer;
  private readonly conversationMemory = new Map<string, readonly MemoryItem[]>();
  
  private constructor() {
    // Singleton pattern - best practice
  }
  
  static getInstance(): ConversationAnalyzer {
    if (!ConversationAnalyzer.instance) {
      ConversationAnalyzer.instance = new ConversationAnalyzer();
    }
    return ConversationAnalyzer.instance;
  }

  /**
   * Konuşma bağlamını analiz eder ve iyileştirmeler önerir
   */
  analyzeConversation(context: ConversationContext): ConversationInsights {
    const topicProgression = this.extractTopicProgression(context.turns);
    const userSatisfaction = this.assessUserSatisfaction(context.turns);
    const conversationQuality = this.calculateConversationQuality(context.turns);
    const suggestedActions = this.generateSuggestedActions(context);
    const keyEntities = this.extractKeyEntities(context.turns);
    const conversationSummary = this.generateSummary(context.turns);

    return {
      topicProgression,
      userSatisfaction,
      conversationQuality,
      suggestedActions,
      keyEntities,
      conversationSummary
    } as const;
  }

  /**
   * Kullanıcının yanıt stilini analiz eder
   */
  analyzeResponseStyle(userMessage: string): {
    readonly formality: 'formal' | 'informal';
    readonly emotionalTone: 'positive' | 'negative' | 'neutral';
    readonly urgency: 'high' | 'medium' | 'low';
    readonly certainty: 'high' | 'medium' | 'low';
  } {
    const text = userMessage.toLowerCase();
    
    // Formallik analizi
    const formalityIndicators = {
      formal: ['sayın', 'saygılarımla', 'arz ederim', 'rica ederim'],
      informal: ['selam', 'merhaba', 'nasılsın', 'teşekkürler']
    };
    
    const isFormal = formalityIndicators.formal.some(indicator => text.includes(indicator));
    const isInformal = formalityIndicators.informal.some(indicator => text.includes(indicator));
    const formality = isFormal ? 'formal' : isInformal ? 'informal' : 'formal';
    
    // Duygusal ton
    const emotionalTone = this.detectEmotionalTone(text);
    
    // Aciliyet
    const urgency = this.detectUrgency(text);
    
    // Kesinlik
    const certainty = this.detectCertainty(text);
    
    return { formality, emotionalTone, urgency, certainty } as const;
  }

  /**
   * Konuşma hafızasına bilgi ekler
   */
  addToMemory(sessionId: string, content: string, type: MemoryItem['type']): void {
    const memoryItem: MemoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      content,
      relevanceScore: this.calculateRelevanceScore(content),
      type
    } as const;

    const existingMemory = this.conversationMemory.get(sessionId) || [];
    const updatedMemory = [...existingMemory, memoryItem]
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 50); // Sadece en ilgili 50 öğeyi tut

    this.conversationMemory.set(sessionId, updatedMemory);
  }

  /**
   * İlgili hafıza öğelerini getirir
   */
  getRelevantMemory(sessionId: string, query: string): readonly MemoryItem[] {
    const memory = this.conversationMemory.get(sessionId) || [];
    const queryWords = query.toLowerCase().split(/\s+/);
    
    return memory
      .filter(item => {
        const contentWords = item.content.toLowerCase().split(/\s+/);
        return queryWords.some(queryWord => 
          contentWords.some(contentWord => 
            contentWord.includes(queryWord) || queryWord.includes(contentWord)
          )
        );
      })
      .slice(0, 5); // En ilgili 5 öğe
  }

  /**
   * Konuşma kalitesini değerlendirir
   */
  private calculateConversationQuality(turns: readonly ConversationTurn[]): number {
    if (turns.length === 0) return 0;

    let qualityScore = 0;
    const factors = {
      avgConfidence: this.calculateAverageConfidence(turns),
      responseRelevance: this.calculateResponseRelevance(turns),
      conversationFlow: this.calculateConversationFlow(turns),
      entityConsistency: this.calculateEntityConsistency(turns)
    };

    // Ağırlıklı puanlama
    qualityScore = (
      factors.avgConfidence * 0.3 +
      factors.responseRelevance * 0.3 +
      factors.conversationFlow * 0.2 +
      factors.entityConsistency * 0.2
    );

    return Math.min(Math.max(qualityScore, 0), 1);
  }

  private extractTopicProgression(turns: readonly ConversationTurn[]): readonly string[] {
    // Topic modeling için basit anahtar kelime analizi
    const topics: string[] = [];
    const processedTurns = turns.filter(turn => turn.speaker === 'user');
    
    processedTurns.forEach(turn => {
      const intent = turn.intent;
      if (intent && !topics.includes(intent)) {
        topics.push(intent);
      }
    });
    
    return topics;
  }

  private assessUserSatisfaction(turns: readonly ConversationTurn[]): 'high' | 'medium' | 'low' {
    const userTurns = turns.filter(turn => turn.speaker === 'user');
    if (userTurns.length === 0) return 'medium';

    let satisfactionScore = 0;
    const recentTurns = userTurns.slice(-3); // Son 3 kullanıcı mesajı

    recentTurns.forEach(turn => {
      const content = turn.content.toLowerCase();
      
      // Pozitif ifadeler
      if (/teşekkür|memnun|harika|süper|iyi/.test(content)) {
        satisfactionScore += 1;
      }
      
      // Negatif ifadeler
      if (/sorun|problem|kötü|yanlış|anlama/.test(content)) {
        satisfactionScore -= 1;
      }
      
      // Yüksek güven skoru
      if (turn.confidence > 0.8) {
        satisfactionScore += 0.5;
      }
    });

    if (satisfactionScore > 1) return 'high';
    if (satisfactionScore < -1) return 'low';
    return 'medium';
  }

  private generateSuggestedActions(context: ConversationContext): readonly string[] {
    const suggestions: string[] = [];
    const lastUserTurn = [...context.turns]
      .reverse()
      .find(turn => turn.speaker === 'user');

    if (!lastUserTurn) {
      return ['Kullanıcıyla etkileşime geçin'];
    }

    // Intent tabanlı öneriler
    switch (lastUserTurn.intent) {
      case 'CREATE':
        suggestions.push('Oluşturma işlemini tamamlamak için eksik bilgileri sorun');
        break;
      case 'READ':
        suggestions.push('Arama sonuçlarını filtreleme seçenekleri sunun');
        break;
      case 'HELP':
        suggestions.push('Daha spesifik yardım konuları önerin');
        break;
      default:
        suggestions.push('Daha detaylı bilgi için sorular sorun');
    }

    // Güven skoru düşükse
    if (lastUserTurn.confidence < 0.6) {
      suggestions.push('Kullanıcının amacını netleştirmek için soru sorun');
    }

    return suggestions.slice(0, 3);
  }

  private extractKeyEntities(turns: readonly ConversationTurn[]): Record<string, number> {
    const entityCounts: Record<string, number> = {};
    
    turns.forEach(turn => {
      turn.entities.forEach(entity => {
        Object.keys(entity).forEach(key => {
          entityCounts[key] = (entityCounts[key] || 0) + 1;
        });
      });
    });
    
    return entityCounts;
  }

  private generateSummary(turns: readonly ConversationTurn[]): string {
    if (turns.length === 0) {
      return 'Henüz konuşma başlamadı.';
    }

    const userTurns = turns.filter(turn => turn.speaker === 'user');
    const uniqueIntents = [...new Set(userTurns.map(turn => turn.intent))];
    
    const intentMap: Record<string, string> = {
      CREATE: 'oluşturma',
      READ: 'listeleme/arama',
      UPDATE: 'güncelleme',
      DELETE: 'silme',
      HELP: 'yardım alma',
      REPORT: 'rapor alma'
    };

    const intentSummary = uniqueIntents
      .map(intent => intentMap[intent] || intent)
      .join(', ');

    return `Kullanıcı ${uniqueIntents.length} farklı işlem türü gerçekleştirdi: ${intentSummary}. ` +
           `Toplam ${turns.length} mesaj alışverişi yapıldı.`;
  }

  // Helper methods
  private detectEmotionalTone(text: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['teşekkür', 'memnun', 'harika', 'süper', 'iyi', 'güzel'];
    const negativeWords = ['sorun', 'problem', 'kötü', 'yanlış', 'sıkıntı'];
    
    const positiveCount = positiveWords.filter(word => text.includes(word)).length;
    const negativeCount = negativeWords.filter(word => text.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private detectUrgency(text: string): 'high' | 'medium' | 'low' {
    if (TURKISH_LINGUISTIC_PATTERNS.TEMPORAL_EXPRESSIONS.immediate.some(word => text.includes(word))) {
      return 'high';
    }
    if (TURKISH_LINGUISTIC_PATTERNS.TEMPORAL_EXPRESSIONS.soon.some(word => text.includes(word))) {
      return 'medium';
    }
    return 'low';
  }

  private detectCertainty(text: string): 'high' | 'medium' | 'low' {
    if (TURKISH_LINGUISTIC_PATTERNS.CERTAINTY.high.some(word => text.includes(word))) {
      return 'high';
    }
    if (TURKISH_LINGUISTIC_PATTERNS.CERTAINTY.medium.some(word => text.includes(word))) {
      return 'medium';
    }
    return 'low';
  }

  private calculateRelevanceScore(content: string): number {
    // Basit relevance skoru hesaplama
    const wordCount = content.split(/\s+/).length;
    const hasEntities = /\b(?:TL|₺|\d+|[A-ZÇĞŞÜÖ][a-zçğşüöı]+)\b/.test(content);
    
    let score = Math.min(wordCount / 20, 1); // Kelime sayısı bazlı
    if (hasEntities) score += 0.3; // Entity varlığı
    
    return Math.min(score, 1);
  }

  private calculateAverageConfidence(turns: readonly ConversationTurn[]): number {
    if (turns.length === 0) return 0;
    return turns.reduce((sum, turn) => sum + turn.confidence, 0) / turns.length;
  }

  private calculateResponseRelevance(_turns: readonly ConversationTurn[]): number {
    // Basit relevance hesaplama - daha gelişmiş algoritma eklenebilir
    return 0.8; // Placeholder
  }

  private calculateConversationFlow(_turns: readonly ConversationTurn[]): number {
    // Konuşma akışı kalitesi - topic değişim sıklığı vs.
    return 0.7; // Placeholder
  }

  private calculateEntityConsistency(_turns: readonly ConversationTurn[]): number {
    // Entity tutarlılığı kontrolü
    return 0.75; // Placeholder
  }
}

// Singleton instance export
export const conversationAnalyzer = ConversationAnalyzer.getInstance();
