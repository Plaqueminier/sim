import {
  useState,
  useRef,
  useCallback,
  type MutableRefObject,
  type Dispatch,
  type SetStateAction,
} from 'react';

export interface CAConfig {
  rule: number;
  width: number;
  generations: number;
  initialState: 'single' | 'random';
  colorAlive: string;
  colorDead: string;
}

interface UseElementaryCAReturn {
  gridRef: MutableRefObject<number[][]>;
  isAnimating: boolean;
  animationSpeed: number;
  seed: number;
  animationFrameRef: MutableRefObject<number>;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
  setAnimationSpeed: Dispatch<SetStateAction<number>>;
  generateGrid: () => number[][];
  stopAnimation: () => void;
  regenerate: () => void;
  getRuleLookup: (ruleNum: number) => Record<string, number>;
}

export function useElementaryCA(config: CAConfig): UseElementaryCAReturn {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [seed, setSeed] = useState(0);

  const gridRef = useRef<number[][]>([]);
  const animationFrameRef = useRef<number>(0);

  const getRuleLookup = useCallback((ruleNum: number): Record<string, number> => {
    const lookup: Record<string, number> = {};
    for (let i = 0; i < 8; i++) {
      const pattern = i.toString(2).padStart(3, '0');
      lookup[pattern] = (ruleNum >> i) & 1;
    }
    return lookup;
  }, []);

  const generateGrid = useCallback(() => {
    const { rule, width, generations, initialState } = config;
    const ruleLookup = getRuleLookup(rule);
    const firstRow = new Array(width).fill(0);

    if (initialState === 'single') {
      firstRow[Math.floor(width / 2)] = 1;
    } else {
      for (let i = 0; i < width; i++) {
        firstRow[i] = Math.random() < 0.5 ? 1 : 0;
      }
    }

    const grid: number[][] = [firstRow];
    for (let g = 1; g < generations; g++) {
      const prevRow = grid[g - 1];
      const newRow = new Array(width).fill(0);
      for (let i = 0; i < width; i++) {
        const left = prevRow[(i - 1 + width) % width];
        const center = prevRow[i];
        const right = prevRow[(i + 1) % width];
        const pattern = `${left}${center}${right}`;
        newRow[i] = ruleLookup[pattern];
      }
      grid.push(newRow);
    }

    gridRef.current = grid;
    return grid;
  }, [config, getRuleLookup]);

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      clearTimeout(animationFrameRef.current);
    }
    setIsAnimating(false);
  }, []);

  const regenerate = useCallback(() => {
    setSeed((s) => s + 1);
  }, []);

  return {
    gridRef,
    isAnimating,
    animationSpeed,
    seed,
    animationFrameRef,
    setIsAnimating,
    setAnimationSpeed,
    generateGrid,
    stopAnimation,
    regenerate,
    getRuleLookup,
  };
}
