/**
 * Animation Hook
 * TypeScript best practices ile animasyon hook'u
 */

import { useRef, useCallback, useEffect, useState } from 'react';
import { 
  animationLibrary, 
  ANIMATIONS,
  type AnimationConfig,
  type SpringConfig
} from '@/lib/animations/animationLibrary';

interface AnimationState {
  readonly isAnimating: boolean;
  readonly currentAnimation: Animation | null;
}

interface AnimationActions {
  readonly animate: (
    animationName: keyof typeof ANIMATIONS,
    config?: Partial<AnimationConfig>
  ) => Promise<void>;
  readonly animateCustom: (
    keyframes: Keyframe[],
    config?: AnimationConfig
  ) => Promise<void>;
  readonly spring: (
    from: Record<string, string | number>,
    to: Record<string, string | number>,
    config?: SpringConfig
  ) => Promise<void>;
  readonly cancel: () => void;
}

export function useAnimation<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T>,
  AnimationState & AnimationActions
] {
  const elementRef = useRef<T>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<Animation | null>(null);

  // Animate with predefined animation
  const animate = useCallback(async (
    animationName: keyof typeof ANIMATIONS,
    config?: Partial<AnimationConfig>
  ): Promise<void> => {
    if (!elementRef.current) return;

    const animation = animationLibrary.animate(
      elementRef.current,
      animationName,
      config
    );

    if (animation) {
      setIsAnimating(true);
      setCurrentAnimation(animation);

      try {
        await animation.finished;
      } finally {
        setIsAnimating(false);
        setCurrentAnimation(null);
      }
    }
  }, []);

  // Animate with custom keyframes
  const animateCustom = useCallback(async (
    keyframes: Keyframe[],
    config?: AnimationConfig
  ): Promise<void> => {
    if (!elementRef.current) return;

    const animation = animationLibrary.animateCustom(
      elementRef.current,
      keyframes,
      config
    );

    if (animation) {
      setIsAnimating(true);
      setCurrentAnimation(animation);

      try {
        await animation.finished;
      } finally {
        setIsAnimating(false);
        setCurrentAnimation(null);
      }
    }
  }, []);

  // Spring animation
  const spring = useCallback(async (
    from: Record<string, string | number>,
    to: Record<string, string | number>,
    config?: SpringConfig
  ): Promise<void> => {
    if (!elementRef.current) return;

    const animation = animationLibrary.spring(
      elementRef.current,
      from,
      to,
      config
    );

    if (animation) {
      setIsAnimating(true);
      setCurrentAnimation(animation);

      try {
        await animation.finished;
      } finally {
        setIsAnimating(false);
        setCurrentAnimation(null);
      }
    }
  }, []);

  // Cancel animation
  const cancel = useCallback(() => {
    if (elementRef.current) {
      animationLibrary.cancelAnimation(elementRef.current);
      setIsAnimating(false);
      setCurrentAnimation(null);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (elementRef.current) {
        animationLibrary.cancelAnimation(elementRef.current);
      }
    };
  }, []);

  return [
    elementRef,
    {
      isAnimating,
      currentAnimation,
      animate,
      animateCustom,
      spring,
      cancel
    }
  ];
}

// Hook for entrance animations
export function useEntranceAnimation<T extends HTMLElement = HTMLDivElement>(
  animationName: keyof typeof ANIMATIONS = 'fadeIn',
  config?: Partial<AnimationConfig>
) {
  const [ref, { animate }] = useAnimation<T>();

  useEffect(() => {
    animate(animationName, config);
  }, [animate, animationName, config]);

  return ref;
}

// Hook for exit animations
export function useExitAnimation<T extends HTMLElement = HTMLDivElement>(
  onExit: () => void,
  animationName: keyof typeof ANIMATIONS = 'fadeOut',
  config?: Partial<AnimationConfig>
) {
  const [ref, { animate }] = useAnimation<T>();

  const handleExit = useCallback(async () => {
    await animate(animationName, config);
    onExit();
  }, [animate, animationName, config, onExit]);

  return [ref, handleExit] as const;
}

// Hook for hover animations
export function useHoverAnimation<T extends HTMLElement = HTMLDivElement>(
  enterAnimation: keyof typeof ANIMATIONS = 'scaleIn',
  exitAnimation: keyof typeof ANIMATIONS = 'scaleOut',
  config?: Partial<AnimationConfig>
) {
  const [ref, { animate, cancel }] = useAnimation<T>();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    animate(enterAnimation, config);
  }, [animate, enterAnimation, config]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    animate(exitAnimation, config);
  }, [animate, exitAnimation, config]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      cancel();
    };
  }, [ref, handleMouseEnter, handleMouseLeave, cancel]);

  return [ref, isHovered] as const;
}

// Hook for scroll-triggered animations
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  animationName: keyof typeof ANIMATIONS = 'fadeIn',
  config?: Partial<AnimationConfig>,
  threshold = 0.1
) {
  const [ref, { animate }] = useAnimation<T>();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animate(animationName, config);
            setHasAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, animate, animationName, config, threshold, hasAnimated]);

  return ref;
}

// Hook for stagger animations
export function useStaggerAnimation(
  staggerDelay = 50,
  animationName: keyof typeof ANIMATIONS = 'fadeIn',
  config?: Partial<AnimationConfig>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateChildren = useCallback(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.children;
    if (children.length === 0) return;

    setIsAnimating(true);
    const animations = animationLibrary.stagger(
      Array.from(children),
      animationName,
      staggerDelay,
      config
    );

    Promise.all(animations.map(a => a.finished)).then(() => {
      setIsAnimating(false);
    });
  }, [animationName, staggerDelay, config]);

  useEffect(() => {
    animateChildren();
  }, [animateChildren]);

  return [containerRef, isAnimating] as const;
}
