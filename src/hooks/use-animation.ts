import { useState, useRef, useCallback, useEffect } from "react";

export interface AnimationControls {
  currentStep: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  reset: () => void;
  setStep: (step: number) => void;
}

export function useAnimation(
  totalSteps: number,
  durationMs: number,
): AnimationControls {
  const [currentStep, setCurrentStep] = useState(totalSteps);
  const [isPlaying, setIsPlaying] = useState(false);
  const rafId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    startTime.current = null;
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    stop();
    setIsPlaying(true);
    setCurrentStep(0);
    startTime.current = null;

    const animate = (now: number) => {
      if (startTime.current === null) startTime.current = now;
      const elapsed = now - startTime.current;
      const progress = Math.min(1, elapsed / durationMs);
      const step = Math.round(progress * totalSteps);
      setCurrentStep(step);

      if (progress >= 1) {
        setCurrentStep(totalSteps);
        setIsPlaying(false);
        rafId.current = null;
        return;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);
  }, [totalSteps, durationMs, stop]);

  const pause = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setCurrentStep(totalSteps);
  }, [stop, totalSteps]);

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return {
    currentStep,
    isPlaying,
    play,
    pause,
    reset,
    setStep: setCurrentStep,
  };
}
