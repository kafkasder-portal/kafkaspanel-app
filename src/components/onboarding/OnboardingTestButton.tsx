import React from 'react';
import { Play, RotateCcw, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { useOnboarding } from '../../hooks/useOnboarding';

interface OnboardingTestButtonProps {
  variant?: 'default' | 'card' | 'minimal';
  showStatus?: boolean;
  className?: string;
}

export const OnboardingTestButton: React.FC<OnboardingTestButtonProps> = ({
  variant = 'default',
  showStatus = true,
  className = ''
}) => {
  const {
    isOnboardingCompleted,
    startOnboarding,
    resetOnboarding,
    onboardingProgress
  } = useOnboarding();

  const handleStartOnboarding = () => {
    startOnboarding();
  };

  const handleResetOnboarding = () => {
    resetOnboarding();
  };

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleStartOnboarding}
          className="h-8"
        >
          <Play className="h-3 w-3 mr-1" />
          Tur
        </Button>
        {isOnboardingCompleted && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetOnboarding}
            className="h-8"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Onboarding</span>
          </div>
          {showStatus && (
            <Badge 
              variant={isOnboardingCompleted ? 'default' : 'secondary'}
              className="text-xs"
            >
              {isOnboardingCompleted ? 'Tamamlandı' : 'Beklemede'}
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {isOnboardingCompleted 
            ? 'Onboarding turunu tekrar başlatabilirsiniz.'
            : 'Platformu tanımak için onboarding turunu başlatın.'
          }
        </p>
        
        {showStatus && onboardingProgress && (
          <>
            <div className="text-xs text-muted-foreground mb-2">
              İlerleme: {onboardingProgress.completedSteps}/{onboardingProgress.totalSteps}
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mb-4">
              <div 
                className="bg-primary h-1.5 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(onboardingProgress.completedSteps / onboardingProgress.totalSteps) * 100}%` 
                }}
              />
            </div>
          </>
        )}
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleStartOnboarding}
            size="sm"
            className="flex-1"
          >
            <Play className="h-3 w-3 mr-2" />
            {isOnboardingCompleted ? 'Tekrar Başlat' : 'Tur Başlat'}
          </Button>
          
          {isOnboardingCompleted && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetOnboarding}
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          )}
        </div>
      </Card>
    );
  }

  // Default variant
  return (
    <div className={`space-y-2 ${className}`}>
      {showStatus && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Onboarding Durumu</span>
          <Badge 
            variant={isOnboardingCompleted ? 'default' : 'secondary'}
            className="text-xs"
          >
            {isOnboardingCompleted ? 'Tamamlandı' : 'Beklemede'}
          </Badge>
        </div>
      )}
      
      {showStatus && onboardingProgress && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>İlerleme</span>
            <span>{onboardingProgress.completedSteps}/{onboardingProgress.totalSteps}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${(onboardingProgress.completedSteps / onboardingProgress.totalSteps) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
      
      <Separator className="my-3" />
      
      <div className="flex items-center gap-2">
        <Button
          onClick={handleStartOnboarding}
          size="sm"
          className="flex-1"
        >
          <Play className="h-4 w-4 mr-2" />
          {isOnboardingCompleted ? 'Onboarding Tekrar Başlat' : 'Onboarding Başlat'}
        </Button>
        
        {isOnboardingCompleted && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetOnboarding}
            title="Onboarding'i sıfırla"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground">
        {isOnboardingCompleted 
          ? 'Onboarding turu tamamlandı. İstediğiniz zaman tekrar başlatabilirsiniz.'
          : 'Platformun temel özelliklerini öğrenmek için onboarding turunu başlatın.'
        }
      </p>
    </div>
  );
};

export default OnboardingTestButton;