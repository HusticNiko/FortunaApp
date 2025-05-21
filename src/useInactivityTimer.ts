// src/useInactivityTimer.ts
import { useEffect, useRef } from 'react';
import { GestureResponderEvent } from 'react-native';

type Timer = ReturnType<typeof setTimeout> | null;
type Handlers = {
  onTouchStart: (e: GestureResponderEvent) => void;
  onTouchMove: (e: GestureResponderEvent) => void;
};

/**
 * Returns touch‐event handlers that reset the inactivity timers.
 * onWarn fires after `warnDelay`, onTimeout after `timeoutDelay`.
 */
export default function useInactivityTimer(
  onWarn: () => void,
  onTimeout: () => void,
  warnDelay = 240_000,
  timeoutDelay = 300_000
): Handlers {
  const warnRef = useRef<Timer>(null);
  const timeoutRef = useRef<Timer>(null);

  const resetTimers = () => {
    if (warnRef.current) clearTimeout(warnRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    warnRef.current = setTimeout(onWarn, warnDelay);
    timeoutRef.current = setTimeout(onTimeout, timeoutDelay);
  };

  useEffect(() => {
    // kick off on mount
    resetTimers();
    return () => {
      if (warnRef.current) clearTimeout(warnRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // these handlers will be spread onto your root View
  return {
    onTouchStart: () => resetTimers(),
    onTouchMove: () => resetTimers(),
  };
}
