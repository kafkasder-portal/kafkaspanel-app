/**
 * Swipe Gestures Hook
 * TypeScript best practices ile swipe gesture detection
 */

import { useRef, useCallback } from 'react';

interface SwipeOptions {
  readonly onSwipeLeft?: () => void;
  readonly onSwipeRight?: () => void;
  readonly onSwipeUp?: () => void;
  readonly onSwipeDown?: () => void;
  readonly threshold?: number;
  readonly onSwipeStart?: () => void;
  readonly onSwipeEnd?: () => void;
}

interface TouchPosition {
  readonly x: number;
  readonly y: number;
}

export function useSwipeGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  onSwipeStart,
  onSwipeEnd
}: SwipeOptions) {
  const touchStart = useRef<TouchPosition | null>(null);
  const touchEnd = useRef<TouchPosition | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
    onSwipeStart?.();
  }, [onSwipeStart]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;

    const distanceX = touchStart.current.x - touchEnd.current.x;
    const distanceY = touchStart.current.y - touchEnd.current.y;
    const isLeftSwipe = distanceX > threshold;
    const isRightSwipe = distanceX < -threshold;
    const isUpSwipe = distanceY > threshold;
    const isDownSwipe = distanceY < -threshold;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
    if (isUpSwipe && onSwipeUp) {
      onSwipeUp();
    }
    if (isDownSwipe && onSwipeDown) {
      onSwipeDown();
    }

    onSwipeEnd?.();
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold, onSwipeEnd]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } as const;
}