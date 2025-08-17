import { AIAction, AIActionContext, AIResponse } from '../../components/AICommandCenter';

export interface AIServiceConfig {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIRequestOptions {
  context?: AIActionContext;
  action?: AIAction;
  userId?: string;
  sessionId?: string;
}

export class AIActionService {
  private config: AIServiceConfig;
  private isInitialized: boolean = false;

  constructor(config: AIServiceConfig = {}) {
    this.config = {
      baseUrl: 'https://api.openai.com/v1',
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 1000,
      ...config
    };
  }

  async initialize(): Promise<void> {
    // Initialize AI service connection
    try {
      // Check if API key is available
      if (!this.config.apiKey) {
        console.warn('AI Service: API key not provided. Using mock responses.');
      }
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize AI service:', error);
      throw error;
    }
  }

  async executeAction(
    prompt: string,
    options: AIRequestOptions = {}
  ): Promise<AIResponse> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // If no API key, return mock response
      if (!this.config.apiKey) {
        return this.generateMockResponse(prompt, options);
      }

      // Real AI API call would go here
      const response = await this.callAIAPI(prompt, options);
      return response;
    } catch (error) {
      console.error('AI action execution failed:', error);
      // Fallback to mock response on error
      return this.generateMockResponse(prompt, options);
    }
  }

  private async callAIAPI(
    prompt: string,
    options: AIRequestOptions
  ): Promise<AIResponse> {
    const requestBody = {
      model: this.config.model,
      messages: [
        {
          role: 'system',
          content: this.getSystemPrompt(options.action)
        },
        {
          role: 'user',
          content: this.formatPrompt(prompt, options.context)
        }
      ],
      temperature: this.config.temperature,
      max_tokens: this.config.maxTokens
    };

    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`AI API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'Yanıt alınamadı.';

    return {
      id: Date.now().toString(),
      content,
      type: this.detectResponseType(content),
      timestamp: new Date(),
      actionId: options.action?.id || 'default'
    };
  }

  private generateMockResponse(
    prompt: string,
    options: AIRequestOptions
  ): AIResponse {
    const mockResponses = {
      'generate-text': `Metin oluşturma talebi: "${prompt}"

Bu bir örnek yanıttır. Gerçek AI entegrasyonu için API anahtarı gereklidir.

Örnek içerik:
- Başlık: ${prompt.slice(0, 50)}...
- İçerik: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
- Sonuç: Başarıyla oluşturuldu.`,
      
      'analyze-data': `Veri analizi sonuçları: "${prompt}"

📊 Analiz Özeti:
- Veri türü: Metin/Sayısal
- Kayıt sayısı: ~1000
- Kalite skoru: 85/100

🔍 Önemli Bulgular:
- Trend: Pozitif yönlü
- Anomali: 3 adet tespit edildi
- Güvenilirlik: Yüksek

💡 Öneriler:
- Veri temizleme önerilir
- Ek analiz gerekebilir`,
      
      'optimize-code': `Kod optimizasyon önerileri: "${prompt}"

🚀 Performans İyileştirmeleri:
- Gereksiz döngüler kaldırılabilir
- Bellek kullanımı %20 azaltılabilir
- Çalışma süresi %15 iyileştirilebilir

🔧 Kod Kalitesi:
- Değişken isimleri iyileştirilebilir
- Fonksiyon boyutları küçültülebilir
- Yorum satırları eklenebilir

✅ Önerilen Değişiklikler:
1. Async/await kullanımı
2. Error handling eklenmesi
3. Type safety iyileştirmesi`,
      
      'transform-format': `Format dönüştürme sonucu: "${prompt}"

🔄 Dönüştürme Detayları:
- Kaynak format: Otomatik tespit edildi
- Hedef format: Belirtilen format
- Durum: Başarılı

📋 Sonuç:
- İşlenen kayıt: 100%
- Hata oranı: 0%
- Süre: 2.3 saniye

💾 Çıktı:
[Dönüştürülmüş veri burada görünecek]`
    };

    const actionId = options.action?.id || 'default';
    const content = mockResponses[actionId as keyof typeof mockResponses] || 
      `AI Yanıtı: "${prompt}"

Bu bir örnek yanıttır. Gerçek AI entegrasyonu için API anahtarı yapılandırması gereklidir.

Talep edilen işlem: ${options.action?.name || 'Genel sorgu'}
Zaman: ${new Date().toLocaleString('tr-TR')}`;

    return {
      id: Date.now().toString(),
      content,
      type: this.detectResponseType(content),
      timestamp: new Date(),
      actionId
    };
  }

  private getSystemPrompt(action?: AIAction): string {
    const basePrompt = 'Sen yardımcı bir AI asistanısın. Türkçe yanıt ver ve kullanıcıya yardımcı ol.';
    
    if (!action) return basePrompt;

    const actionPrompts = {
      'generate-text': 'Sen bir metin oluşturma uzmanısın. Yaratıcı, akıcı ve amaca uygun metinler üret.',
      'analyze-data': 'Sen bir veri analisti uzmanısın. Verileri analiz et, trendleri bul ve öngörüler sun.',
      'optimize-code': 'Sen bir kod optimizasyon uzmanısın. Kodu analiz et ve performans iyileştirmeleri öner.',
      'transform-format': 'Sen bir veri dönüştürme uzmanısın. Verileri farklı formatlara dönüştür.'
    };

    return actionPrompts[action.id as keyof typeof actionPrompts] || basePrompt;
  }

  private formatPrompt(prompt: string, context?: AIActionContext): string {
    if (!context) return prompt;

    return `Bağlam: ${context.type}
İçerik: ${context.content}

Talep: ${prompt}`;
  }

  private detectResponseType(content: string): 'text' | 'code' | 'markdown' {
    if (content.includes('```') || content.includes('function') || content.includes('const ')) {
      return 'code';
    }
    if (content.includes('#') || content.includes('*') || content.includes('-')) {
      return 'markdown';
    }
    return 'text';
  }

  updateConfig(newConfig: Partial<AIServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.isInitialized = false; // Force re-initialization
  }

  getConfig(): AIServiceConfig {
    return { ...this.config };
  }
}

// Singleton instance
let aiServiceInstance: AIActionService | null = null;

export const getAIService = (config?: AIServiceConfig): AIActionService => {
  if (!aiServiceInstance) {
    aiServiceInstance = new AIActionService(config);
  }
  return aiServiceInstance;
};

// Convenience functions
export const executeAIAction = async (
  prompt: string,
  options: AIRequestOptions = {}
): Promise<AIResponse> => {
  const service = getAIService();
  return service.executeAction(prompt, options);
};

export const initializeAI = async (config?: AIServiceConfig): Promise<void> => {
  const service = getAIService(config);
  await service.initialize();
};

// Default actions
export const defaultAIActions: AIAction[] = [
  {
    id: 'generate-text',
    name: 'Metin Oluştur',
    description: 'Belirtilen konuda metin oluşturur',
    category: 'generate'
  },
  {
    id: 'analyze-data',
    name: 'Veri Analizi',
    description: 'Verilerinizi analiz eder ve öngörüler sunar',
    category: 'analyze'
  },
  {
    id: 'optimize-code',
    name: 'Kod Optimizasyonu',
    description: 'Kodunuzu optimize eder ve iyileştirmeler önerir',
    category: 'optimize'
  },
  {
    id: 'transform-format',
    name: 'Format Dönüştürme',
    description: 'Verileri farklı formatlara dönüştürür',
    category: 'transform'
  }
];

export default {
  AIActionService,
  getAIService,
  executeAIAction,
  initializeAI,
  defaultAIActions
};