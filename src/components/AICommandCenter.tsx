import React, { useState, useRef, useEffect, startTransition } from 'react'
import { Send, Bot, User, Settings, History, Zap, Loader2, Mic, MicOff } from 'lucide-react'
import { toast } from 'sonner'
import { workflowEngine } from '@/lib/ai/workflowEngine'
import { getCommandSuggestions } from '@/lib/ai/commandProcessor'
import { enhancedNlpProcessor } from '@/lib/ai/enhancedNlpProcessor'
import { smartCommandProcessor } from '@/lib/ai/smartCommandProcessor'
import type { ActionContext } from '@/lib/ai/actions'
import type { CommandResult } from '@/lib/ai/commandProcessor'
import { AISettingsModal } from './modals/AISettingsModal'
import { AIHistoryModal } from './modals/AIHistoryModal'

// Web Speech API type declarations
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

interface Message {
  id: string
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
  data?: unknown
  suggestions?: string[]
}

type Props = {
  isOpen: boolean
  onClose: () => void
  context: ActionContext
  userId?: string
}

export default function AICommandCenter({ isOpen, onClose, context, userId }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Merhaba! 👋 Size nasıl yardımcı olabilirim? Tüm modülleri kontrol edebilir, raporlar oluşturabilir ve otomatik işlemler yapabilirim.',
      timestamp: new Date(),
      suggestions: [
        'Hak sahibi listele',
        'Yeni bağış ekle: 1000 TL',
        'Bu ay bağış raporu al',
        'Toplantı oluştur: Yönetim toplantısı',
        'Görevlerimi göster'
      ]
    }
  ])
  
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [nlpAnalysis, setNlpAnalysis] = useState<any>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (input.trim()) {
      const newSuggestions = getCommandSuggestions(input)
      
      // Gelişmiş NLP analizi
      const nlpResult = enhancedNlpProcessor.process(input)
      setNlpAnalysis(nlpResult)
      
      startTransition(() => {
        setSuggestions(newSuggestions)
      })
    } else {
      startTransition(() => {
        setSuggestions([])
        setNlpAnalysis(null)
      })
    }
  }, [input])

  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'tr-TR'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        startTransition(() => {
          setInput(transcript)
          setIsListening(false)
        })
      }

      recognitionRef.current.onerror = () => {
        startTransition(() => {
          setIsListening(false)
        })
        toast.error('Ses tanıma hatası')
      }

      recognitionRef.current.onend = () => {
        startTransition(() => {
          setIsListening(false)
        })
      }
    }
  }, [])

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    startTransition(() => {
      setMessages(prev => [...prev, newMessage])
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const userCommand = input.trim()
    
    // Kullanıcı mesajını ekle
    addMessage({
      type: 'user',
      content: userCommand
    })

    // Komut geçmişine ekle
    startTransition(() => {
      setCommandHistory(prev => [userCommand, ...prev.slice(0, 19)]) // Son 20 komut
      setHistoryIndex(-1)
      setInput('')
      setIsProcessing(true)
    })

    try {
      // AI işlem başlangıcı mesajı
      addMessage({
        type: 'system',
        content: '🤖 Komutunuz işleniyor...'
      })

      // Komutu çalıştır
      const result: CommandResult = await workflowEngine.executeCommand(
        userCommand,
        context,
        userId
      )

      // Sistem mesajını kaldır ve sonucu ekle
      startTransition(() => {
        setMessages(prev => prev.slice(0, -1))
      })

      if (result.success) {
        addMessage({
          type: 'ai',
          content: `✅ ${result.message}`,
          data: result.data,
          suggestions: result.nextSteps
        })
        
        // Add to command history - handled by AIHistoryModal component

        // Ek bilgi varsa göster
        if (result.data) {
          if (Array.isArray(result.data)) {
            addMessage({
              type: 'system',
              content: `📊 ${result.data.length} kayıt bulundu`,
              data: result.data.slice(0, 5) // İlk 5'ini göster
            })
          } else if (typeof result.data === 'object') {
            addMessage({
              type: 'system',
              content: '📋 İşlem detayları:',
              data: result.data
            })
          }
        }
      } else {
        addMessage({
          type: 'ai',
          content: `❌ ${result.message}`,
          suggestions: result.suggestions
        })
      }

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
      startTransition(() => {
        setMessages(prev => prev.slice(0, -1))
      })
      addMessage({
        type: 'ai',
        content: `🚨 Beklenmeyen hata: ${errorMessage}`,
        suggestions: ['Lütfen komutu kontrol edip tekrar deneyin']
      })
    } finally {
      startTransition(() => {
        setIsProcessing(false)
      })
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    startTransition(() => {
      setInput(suggestion)
    })
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast.error('Ses tanıma desteklenmiyor')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
      toast.success('Dinliyorum... Konuşabilirsiniz')
    }
  }

  const renderMessage = (message: Message) => {
    const isUser = message.type === 'user'
    const isSystem = message.type === 'system'

    return (
      <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-blue-500' : isSystem ? 'bg-gray-500' : 'bg-green-500'
          }`}>
            {isUser ? <User className="w-4 h-4 text-white" /> : 
             isSystem ? <Zap className="w-4 h-4 text-white" /> : 
             <Bot className="w-4 h-4 text-white" />}
          </div>
          
          <div className={`rounded-lg p-3 ${
            isUser ? 'bg-blue-500 text-white' : 
            isSystem ? 'bg-gray-100 text-gray-700' : 
            'bg-gray-100 text-gray-700'
          }`}>
            <div className="whitespace-pre-wrap">{message.content}</div>
            
            {message.data ? (
              <div className="mt-2 p-2 bg-white bg-opacity-20 rounded text-xs">
                {Array.isArray(message.data) ? (
                  <div>
                    {(message.data as unknown[]).map((item, index) => (
                      <div key={index} className="mb-1">
                        {typeof item === 'object' && item !== null ? JSON.stringify(item, null, 2) : String(item)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <pre>{JSON.stringify(message.data, null, 2)}</pre>
                )}
              </div>
            ) : null}
            
            {/* Öneriler */}
            {message.suggestions && message.suggestions.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="text-xs opacity-75">Öneriler:</div>
                {message.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left p-1 text-xs bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            {/* NLP Analysis Display */}
            {nlpAnalysis && message.type === 'user' && (
              <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                <div className="text-xs text-blue-700 font-medium mb-1">AI Analizi:</div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>
                    <span className="font-medium">Intent:</span> {nlpAnalysis.intent.primary} 
                    <span className="text-blue-600"> ({Math.round(nlpAnalysis.intent.confidence * 100)}%)</span>
                  </div>
                  <div>
                    <span className="font-medium">Sentiment:</span> 
                    <span className={`${
                      nlpAnalysis.sentiment.label === 'positive' ? 'text-green-600' :
                      nlpAnalysis.sentiment.label === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {nlpAnalysis.sentiment.label === 'positive' ? 'Pozitif' :
                       nlpAnalysis.sentiment.label === 'negative' ? 'Negatif' : 'Nötr'}
                    </span>
                  </div>
                  {nlpAnalysis.entities.length > 0 && (
                    <div className="col-span-2">
                      <span className="font-medium">Entities:</span> 
                      {nlpAnalysis.entities.map((entity: any, index: number) => (
                        <span key={index} className="ml-1 px-1 py-0.5 bg-blue-100 rounded text-xs">
                          {entity.type}: {entity.value}
                        </span>
                      ))}
                    </div>
                  )}
                  {nlpAnalysis.context.urgency !== 'low' && (
                    <div className="col-span-2">
                      <span className="font-medium">Urgency:</span> 
                      <span className={`ml-1 px-1 py-0.5 rounded text-xs ${
                        nlpAnalysis.context.urgency === 'high' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {nlpAnalysis.context.urgency === 'high' ? 'Yüksek' : 'Orta'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="text-xs opacity-50 mt-1">
              {(message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp)).toLocaleTimeString('tr-TR')}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-500" />
            <h2 className="text-lg font-semibold">AI Komut Merkezi</h2>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Aktif
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Ayarlar"
            >
              <Settings className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setShowHistory(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Komut Geçmişi"
            >
              <History className="w-4 h-4" />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(renderMessage)}
          
          {isProcessing && (
            <div className="flex justify-start mb-4">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>İşleniyor...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-2">Öneriler:</div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Komutunuzu yazın... (örn: 'Hak sahibi listele', 'Yeni bağış ekle: 1000 TL')"
                disabled={isProcessing}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              
              {/* Voice Input Button */}
              {recognitionRef.current && (
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${
                    isListening ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title={isListening ? 'Dinlemeyi durdur' : 'Sesli komut'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}
            </div>
            
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>

          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => handleSuggestionClick('Sistem durumu göster')}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
            >
              📊 Sistem Durumu
            </button>
            <button
              onClick={() => handleSuggestionClick('Bu ay raporu al')}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
            >
              📈 Aylık Rapor
            </button>
            <button
              onClick={() => handleSuggestionClick('Bekleyen görevler')}
              className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors"
            >
              ⏰ Bekleyen Görevler
            </button>
            <button
              onClick={() => handleSuggestionClick('Yardım')}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors"
            >
              ❓ Yardım
            </button>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <AISettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
      
      <AIHistoryModal 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)}
        onSelectCommand={(command) => setInput(command)}
      />
    </div>
  )
}
