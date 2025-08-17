import { useState, useCallback, useEffect } from 'react';
import { AIAction, AIActionContext, AIResponse } from '../components/AICommandCenter';

export interface UseAICommandCenterReturn {
  isOpen: boolean;
  openAI: (context?: AIActionContext) => void;
  closeAI: () => void;
  toggleAI: () => void;
  context: AIActionContext | undefined;
  setContext: (context: AIActionContext | undefined) => void;
  responses: AIResponse[];
  clearResponses: () => void;
  isLoading: boolean;
}

export const useAICommandCenter = (): UseAICommandCenterReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<AIActionContext | undefined>();
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const openAI = useCallback((newContext?: AIActionContext) => {
    if (newContext) {
      setContext(newContext);
    }
    setIsOpen(true);
  }, []);

  const closeAI = useCallback(() => {
    setIsOpen(false);
    // Context'i hemen temizleme, kullanıcı tekrar açabilir
  }, []);

  const toggleAI = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const clearResponses = useCallback(() => {
    setResponses([]);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + A ile AI Command Center'ı aç/kapat
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        toggleAI();
      }
      
      // Escape ile kapat
      if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        closeAI();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggleAI, closeAI]);

  return {
    isOpen,
    openAI,
    closeAI,
    toggleAI,
    context,
    setContext,
    responses,
    clearResponses,
    isLoading
  };
};

export default useAICommandCenter;