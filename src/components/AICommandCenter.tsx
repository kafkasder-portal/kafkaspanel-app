import React, { useState, useEffect } from 'react';
import { X, Send, Loader2, Sparkles, Copy, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export interface AIAction {
  id: string;
  name: string;
  description: string;
  category: 'generate' | 'analyze' | 'transform' | 'optimize';
  icon?: React.ReactNode;
}

export interface AIActionContext {
  type: 'text' | 'code' | 'data' | 'image';
  content: string;
  metadata?: Record<string, any>;
}

export interface AIResponse {
  id: string;
  content: string;
  type: 'text' | 'code' | 'markdown';
  timestamp: Date;
  actionId: string;
}

interface AICommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  context?: AIActionContext;
  userId?: string;
}

const AICommandCenter: React.FC<AICommandCenterProps> = ({
  isOpen,
  onClose,
  context,
  userId
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [selectedAction, setSelectedAction] = useState<AIAction | null>(null);

  const availableActions: AIAction[] = [
    {
      id: 'generate-text',
      name: 'Metin Oluştur',
      description: 'Belirtilen konuda metin oluşturur',
      category: 'generate',
      icon: <Sparkles className="h-4 w-4" />
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

  useEffect(() => {
    if (context && context.content) {
      setPrompt(context.content);
    }
  }, [context]);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    
    try {
      // Mock AI response - replace with actual AI service call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse: AIResponse = {
        id: Date.now().toString(),
        content: `AI yanıtı: "${prompt}" için oluşturulan içerik. Bu bir örnek yanıttır ve gerçek AI entegrasyonu ile değiştirilmelidir.`,
        type: 'text',
        timestamp: new Date(),
        actionId: selectedAction?.id || 'default'
      };
      
      setResponses(prev => [...prev, mockResponse]);
      setPrompt('');
    } catch (error) {
      console.error('AI request failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const getCategoryColor = (category: AIAction['category']) => {
    switch (category) {
      case 'generate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'analyze':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'transform':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'optimize':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">AI Komut Merkezi</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Actions Sidebar */}
          <div className="w-64 border-r p-4">
            <h3 className="text-sm font-medium mb-3">Hızlı İşlemler</h3>
            <div className="space-y-2">
              {availableActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedAction?.id === action.id
                      ? 'bg-primary/10 border border-primary/20'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {action.icon}
                    <span className="text-sm font-medium">{action.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className={`mt-2 text-xs ${getCategoryColor(action.category)}`}
                  >
                    {action.category}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Chat History */}
            <ScrollArea className="flex-1 p-4">
              {responses.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>AI asistanınızla konuşmaya başlayın</p>
                  <p className="text-sm mt-1">Ctrl/Cmd + Enter ile gönderebilirsiniz</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {responses.map((response) => (
                    <div key={response.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {response.timestamp.toLocaleTimeString('tr-TR')}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(response.content)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Card className="p-4">
                        <pre className="whitespace-pre-wrap text-sm">
                          {response.content}
                        </pre>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <Separator />

            {/* Input Area */}
            <div className="p-4">
              {selectedAction && (
                <div className="mb-3 p-2 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {selectedAction.icon}
                    <span className="text-sm font-medium">{selectedAction.name}</span>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getCategoryColor(selectedAction.category)}`}
                    >
                      {selectedAction.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedAction.description}
                  </p>
                </div>
              )}
              
              <div className="flex gap-2">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="AI asistanınıza ne yardım etmesini istiyorsunuz?"
                  className="min-h-[80px] resize-none"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || isLoading}
                  className="self-end"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                Ctrl/Cmd + Enter ile gönder • {prompt.length} karakter
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AICommandCenter;
export { AICommandCenter };