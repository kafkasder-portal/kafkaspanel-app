import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Play, Users, Target, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  steps?: OnboardingStep[];
  userId?: string;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Hoş Geldiniz!',
    description: 'NIS platformuna hoş geldiniz. Size kısa bir tur yapalım.',
    icon: <Users className="h-6 w-6" />,
    content: (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">NIS'e Hoş Geldiniz!</h3>
        <p className="text-muted-foreground mb-6">
          Bu kısa tur ile platformun temel özelliklerini keşfedeceksiniz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-muted/50 rounded-lg">
            <Target className="h-5 w-5 text-primary mb-2" />
            <div className="font-medium">Hedef Odaklı</div>
            <div className="text-muted-foreground">Amaçlarınıza ulaşın</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <Zap className="h-5 w-5 text-primary mb-2" />
            <div className="font-medium">Hızlı & Etkili</div>
            <div className="text-muted-foreground">Verimli çalışın</div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <Users className="h-5 w-5 text-primary mb-2" />
            <div className="font-medium">İş Birliği</div>
            <div className="text-muted-foreground">Takım halinde çalışın</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'navigation',
    title: 'Navigasyon',
    description: 'Ana menü ve navigasyon özelliklerini keşfedin.',
    icon: <Target className="h-6 w-6" />,
    content: (
      <div className="py-6">
        <h3 className="text-lg font-semibold mb-4">Navigasyon Rehberi</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">1</span>
            </div>
            <div>
              <div className="font-medium">Ana Menü</div>
              <div className="text-sm text-muted-foreground">
                Sol taraftaki menüden tüm modüllere erişebilirsiniz.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">2</span>
            </div>
            <div>
              <div className="font-medium">Arama</div>
              <div className="text-sm text-muted-foreground">
                Ctrl+K ile hızlı arama yapabilirsiniz.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">3</span>
            </div>
            <div>
              <div className="font-medium">Bildirimler</div>
              <div className="text-sm text-muted-foreground">
                Sağ üst köşeden bildirimlerinizi takip edin.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'features',
    title: 'Temel Özellikler',
    description: 'Platformun ana özelliklerini öğrenin.',
    icon: <Zap className="h-6 w-6" />,
    content: (
      <div className="py-6">
        <h3 className="text-lg font-semibold mb-4">Ana Özellikler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="font-medium mb-2">📊 Dashboard</div>
            <div className="text-sm text-muted-foreground">
              Genel durumunuzu ve istatistiklerinizi görüntüleyin.
            </div>
          </Card>
          <Card className="p-4">
            <div className="font-medium mb-2">💰 Bağışlar</div>
            <div className="text-sm text-muted-foreground">
              Bağış süreçlerinizi yönetin ve takip edin.
            </div>
          </Card>
          <Card className="p-4">
            <div className="font-medium mb-2">🎓 Burslar</div>
            <div className="text-sm text-muted-foreground">
              Burs başvurularını değerlendirin ve yönetin.
            </div>
          </Card>
          <Card className="p-4">
            <div className="font-medium mb-2">📝 Görevler</div>
            <div className="text-sm text-muted-foreground">
              Görevlerinizi organize edin ve takip edin.
            </div>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 'complete',
    title: 'Tamamlandı!',
    description: 'Artık platformu kullanmaya hazırsınız.',
    icon: <Check className="h-6 w-6" />,
    content: (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Harika! Hazırsınız</h3>
        <p className="text-muted-foreground mb-6">
          Onboarding turu tamamlandı. Artık platformu kullanmaya başlayabilirsiniz.
        </p>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-sm font-medium mb-2">💡 İpucu</div>
          <div className="text-sm text-muted-foreground">
            Herhangi bir sorunuz olursa, yardım menüsünden destek alabilirsiniz.
          </div>
        </div>
      </div>
    )
  }
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  steps = defaultSteps,
  userId
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setCompletedSteps(new Set());
    }
  }, [isOpen]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    onComplete();
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {currentStepData.icon}
              <div>
                <h2 className="text-lg font-semibold">{currentStepData.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {currentStepData.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                Atla
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>İlerleme</span>
              <span>{currentStep + 1} / {steps.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Steps Sidebar */}
          <div className="w-64 border-r p-4">
            <h3 className="text-sm font-medium mb-3">Adımlar</h3>
            <div className="space-y-2">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.has(index);
                const isCurrent = index === currentStep;
                const isAccessible = index <= currentStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => isAccessible && handleStepClick(index)}
                    disabled={!isAccessible}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      isCurrent
                        ? 'bg-primary/10 border border-primary/20'
                        : isCompleted
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                        : isAccessible
                        ? 'hover:bg-muted/50'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isCurrent
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-7">
                      {step.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {currentStepData.content}
            
            {currentStepData.action && (
              <div className="mt-6">
                <Button
                  onClick={currentStepData.action.onClick}
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {currentStepData.action.label}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Önceki
            </Button>
            
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-primary'
                      : completedSteps.has(index)
                      ? 'bg-green-500'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            <Button onClick={handleNext}>
              {isLastStep ? (
                <>
                  Tamamla
                  <Check className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Sonraki
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingModal;