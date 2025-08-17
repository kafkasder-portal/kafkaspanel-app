/**
 * Animation Library
 * TypeScript best practices ile animasyon kütüphanesi
 */

// Types
export interface AnimationConfig {
  readonly duration?: number;
  readonly delay?: number;
  readonly easing?: string;
  readonly fill?: 'forwards' | 'backwards' | 'both' | 'none';
  readonly iterations?: number;
}

export interface SpringConfig {
  readonly stiffness?: number;
  readonly damping?: number;
  readonly mass?: number;
}

// Easing functions
export const EASINGS = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
  easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
} as const;

// Predefined animations
export const ANIMATIONS = {
  // Fade animations
  fadeIn: {
    keyframes: [
      { opacity: 0 },
      { opacity: 1 }
    ],
    config: {
      duration: 300,
      easing: EASINGS.easeOut,
      fill: 'forwards' as const
    }
  },
  
  fadeOut: {
    keyframes: [
      { opacity: 1 },
      { opacity: 0 }
    ],
    config: {
      duration: 300,
      easing: EASINGS.easeIn,
      fill: 'forwards' as const
    }
  },

  // Slide animations
  slideInLeft: {
    keyframes: [
      { transform: 'translateX(-100%)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ],
    config: {
      duration: 400,
      easing: EASINGS.easeOutCubic,
      fill: 'forwards' as const
    }
  },

  slideInRight: {
    keyframes: [
      { transform: 'translateX(100%)', opacity: 0 },
      { transform: 'translateX(0)', opacity: 1 }
    ],
    config: {
      duration: 400,
      easing: EASINGS.easeOutCubic,
      fill: 'forwards' as const
    }
  },

  slideInUp: {
    keyframes: [
      { transform: 'translateY(100%)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ],
    config: {
      duration: 400,
      easing: EASINGS.easeOutCubic,
      fill: 'forwards' as const
    }
  },

  slideInDown: {
    keyframes: [
      { transform: 'translateY(-100%)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ],
    config: {
      duration: 400,
      easing: EASINGS.easeOutCubic,
      fill: 'forwards' as const
    }
  },

  // Scale animations
  scaleIn: {
    keyframes: [
      { transform: 'scale(0)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 }
    ],
    config: {
      duration: 300,
      easing: EASINGS.easeOutBack,
      fill: 'forwards' as const
    }
  },

  scaleOut: {
    keyframes: [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0)', opacity: 0 }
    ],
    config: {
      duration: 300,
      easing: EASINGS.easeInBack,
      fill: 'forwards' as const
    }
  },

  // Bounce animations
  bounce: {
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-30px)' },
      { transform: 'translateY(0)' },
      { transform: 'translateY(-15px)' },
      { transform: 'translateY(0)' }
    ],
    config: {
      duration: 600,
      easing: EASINGS.easeOutCubic,
      iterations: 1
    }
  },

  // Shake animation
  shake: {
    keyframes: [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(0)' }
    ],
    config: {
      duration: 500,
      easing: EASINGS.linear,
      iterations: 1
    }
  },

  // Pulse animation
  pulse: {
    keyframes: [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ],
    config: {
      duration: 1000,
      easing: EASINGS.easeInOut,
      iterations: Infinity
    }
  },

  // Rotate animations
  rotateIn: {
    keyframes: [
      { transform: 'rotate(-180deg) scale(0)', opacity: 0 },
      { transform: 'rotate(0) scale(1)', opacity: 1 }
    ],
    config: {
      duration: 500,
      easing: EASINGS.easeOutCubic,
      fill: 'forwards' as const
    }
  },

  // Flip animations
  flipInX: {
    keyframes: [
      { transform: 'rotateX(-90deg)', opacity: 0 },
      { transform: 'rotateX(0)', opacity: 1 }
    ],
    config: {
      duration: 400,
      easing: EASINGS.easeOutCubic,
      fill: 'forwards' as const
    }
  },

  flipInY: {
    keyframes: [
      { transform: 'rotateY(-90deg)', opacity: 0 },
      { transform: 'rotateY(0)', opacity: 1 }
    ],
    config: {
      duration: 400,
      easing: EASINGS.easeOutCubic,
      fill: 'forwards' as const
    }
  }
} as const;

export class AnimationLibrary {
  private static instance: AnimationLibrary;
  private reducedMotion = false;
  private runningAnimations = new Map<Element, Animation>();

  private constructor() {
    this.checkReducedMotion();
  }

  static getInstance(): AnimationLibrary {
    if (!AnimationLibrary.instance) {
      AnimationLibrary.instance = new AnimationLibrary();
    }
    return AnimationLibrary.instance;
  }

  /**
   * Animate an element with predefined animation
   */
  animate(
    element: Element,
    animationName: keyof typeof ANIMATIONS,
    customConfig?: Partial<AnimationConfig>
  ): Animation | null {
    if (this.reducedMotion) {
      return null;
    }

    const animation = ANIMATIONS[animationName];
    const config = { ...animation.config, ...customConfig };

    return this.animateCustom(element, [...animation.keyframes], config);
  }

  /**
   * Animate with custom keyframes
   */
  animateCustom(
    element: Element,
    keyframes: Keyframe[],
    config: AnimationConfig = {}
  ): Animation | null {
    if (this.reducedMotion && config.duration !== 0) {
      return null;
    }

    // Cancel existing animation
    this.cancelAnimation(element);

    const animation = element.animate(keyframes, {
      duration: config.duration ?? 300,
      delay: config.delay ?? 0,
      easing: config.easing ?? EASINGS.easeInOut,
      fill: config.fill ?? 'none',
      iterations: config.iterations ?? 1
    });

    this.runningAnimations.set(element, animation);

    animation.onfinish = () => {
      this.runningAnimations.delete(element);
    };

    animation.oncancel = () => {
      this.runningAnimations.delete(element);
    };

    return animation;
  }

  /**
   * Spring animation
   */
  spring(
    element: Element,
    from: Record<string, string | number>,
    to: Record<string, string | number>,
    config: SpringConfig = {}
  ): Animation | null {
    const springConfig: AnimationConfig = {
      duration: this.calculateSpringDuration(config),
      easing: EASINGS.spring,
      fill: 'forwards'
    };

    return this.animateCustom(element, [from, to], springConfig);
  }

  /**
   * Stagger animation for multiple elements
   */
  stagger(
    elements: Element[] | NodeListOf<Element>,
    animationName: keyof typeof ANIMATIONS,
    staggerDelay = 50,
    customConfig?: Partial<AnimationConfig>
  ): Animation[] {
    const animations: Animation[] = [];
    const elementArray = Array.from(elements);

    elementArray.forEach((element, index) => {
      const config = {
        ...customConfig,
        delay: (customConfig?.delay ?? 0) + index * staggerDelay
      };

      const animation = this.animate(element, animationName, config);
      if (animation) {
        animations.push(animation);
      }
    });

    return animations;
  }

  /**
   * Chain animations
   */
  async chain(
    element: Element,
    animations: Array<{
      name: keyof typeof ANIMATIONS;
      config?: Partial<AnimationConfig>;
    }>
  ): Promise<void> {
    for (const { name, config } of animations) {
      const animation = this.animate(element, name, config);
      if (animation) {
        await animation.finished;
      }
    }
  }

  /**
   * Parallel animations
   */
  parallel(
    animations: Array<{
      element: Element;
      name: keyof typeof ANIMATIONS;
      config?: Partial<AnimationConfig>;
    }>
  ): Animation[] {
    return animations
      .map(({ element, name, config }) => this.animate(element, name, config))
      .filter((animation): animation is Animation => animation !== null);
  }

  /**
   * Cancel animation
   */
  cancelAnimation(element: Element): void {
    const animation = this.runningAnimations.get(element);
    if (animation) {
      animation.cancel();
      this.runningAnimations.delete(element);
    }
  }

  /**
   * Cancel all animations
   */
  cancelAll(): void {
    this.runningAnimations.forEach(animation => animation.cancel());
    this.runningAnimations.clear();
  }

  /**
   * Set reduced motion preference
   */
  setReducedMotion(reduced: boolean): void {
    this.reducedMotion = reduced;
    if (reduced) {
      this.cancelAll();
    }
  }

  /**
   * Check system reduced motion preference
   */
  private checkReducedMotion(): void {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reducedMotion = mediaQuery.matches;

    mediaQuery.addEventListener('change', (e) => {
      this.setReducedMotion(e.matches);
    });
  }

  /**
   * Calculate spring duration based on config
   */
  private calculateSpringDuration(config: SpringConfig): number {
    const stiffness = config.stiffness ?? 100;
    const damping = config.damping ?? 10;
    const mass = config.mass ?? 1;

    // Simplified spring duration calculation
    const omega = Math.sqrt(stiffness / mass);
    const zeta = damping / (2 * Math.sqrt(stiffness * mass));
    
    if (zeta < 1) {
      // Underdamped
      return Math.min(2000, (4 / (omega * zeta)) * 1000);
    } else {
      // Overdamped or critically damped
      return Math.min(2000, (4 / omega) * 1000);
    }
  }

  /**
   * Create CSS animation
   */
  createCSSAnimation(
    name: string,
    keyframes: Keyframe[],
    duration = 300
  ): string {
    const keyframeRules = keyframes
      .map((frame, index) => {
        const percent = (index / (keyframes.length - 1)) * 100;
        const properties = Object.entries(frame)
          .map(([key, value]) => `${this.camelToKebab(key)}: ${value};`)
          .join(' ');
        return `${percent}% { ${properties} }`;
      })
      .join(' ');

    return `
      @keyframes ${name} {
        ${keyframeRules}
      }
      
      .animate-${name} {
        animation: ${name} ${duration}ms ${EASINGS.easeInOut} forwards;
      }
    `;
  }

  /**
   * Convert camelCase to kebab-case
   */
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}

// Singleton instance
export const animationLibrary = AnimationLibrary.getInstance();
