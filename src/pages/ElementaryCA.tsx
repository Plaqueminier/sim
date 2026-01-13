import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useElementaryCA } from '../hooks/useElementaryCA';
import { CACanvas, type CACanvasRef } from '../components/elementary-ca/CACanvas';
import CAControls from '../components/elementary-ca/CAControls';
import RuleVisualization from '../components/elementary-ca/RuleVisualization';

const CELL_SIZE = 3;

export default function ElementaryCA(): ReactNode {
  const [rule, setRule] = useState(30);
  const [width, setWidth] = useState(201);
  const [generations, setGenerations] = useState(150);
  const [colorAlive, setColorAlive] = useState('#ffffff');
  const [colorDead, setColorDead] = useState('#0a0a0a');
  const [initialState, setInitialState] = useState<'single' | 'random'>('single');

  const config = {
    rule,
    width,
    generations,
    initialState,
    colorAlive,
    colorDead,
  };

  const {
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
  } = useElementaryCA(config);

  const canvasRef = useRef<CACanvasRef>(null);

  const drawRows = useCallback(
    (numRows: number) => {
      canvasRef.current?.drawRows(numRows, gridRef.current);
    },
    [canvasRef, gridRef]
  );

  const runAnimation = (): void => {
    generateGrid();
    setIsAnimating(true);
    let currentRow = 0;
    const speed = Math.max(1, 101 - animationSpeed);

    const animate = (): void => {
      currentRow += Math.ceil(generations / 100);
      if (currentRow >= generations) {
        currentRow = generations;
        drawRows(currentRow);
        setIsAnimating(false);
        return;
      }
      drawRows(currentRow);
      animationFrameRef.current = window.setTimeout(animate, speed);
    };
    animate();
  };

  const handleToggleAnimation = (): void => {
    if (isAnimating) {
      stopAnimation();
      drawRows(generations);
    } else {
      runAnimation();
    }
  };

  const handleRegenerate = (): void => {
    stopAnimation();
    regenerate();
  };

  useEffect(() => {
    stopAnimation();
    generateGrid();
    drawRows(generations);
  }, [rule, width, generations, initialState, seed, generateGrid, drawRows, stopAnimation]);

  useEffect(() => {
    if (!isAnimating) {
      drawRows(generations);
    }
  }, [colorAlive, colorDead, drawRows, generations, isAnimating]);

  useEffect(() => {
    return () => stopAnimation();
  }, [stopAnimation]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-gray-400 hover:text-white text-sm">
            ← Back to home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Elementary Cellular Automata</h1>
        <p className="text-gray-400 mb-8">
          Explore Wolfram's 256 rules of 1D binary cellular automata
        </p>

        <CAControls
          rule={rule}
          onRuleChange={setRule}
          initialState={initialState}
          onInitialStateChange={setInitialState}
          colorAlive={colorAlive}
          onColorAliveChange={setColorAlive}
          colorDead={colorDead}
          onColorDeadChange={setColorDead}
          width={width}
          onWidthChange={setWidth}
          generations={generations}
          onGenerationsChange={setGenerations}
          animationSpeed={animationSpeed}
          onAnimationSpeedChange={setAnimationSpeed}
          isAnimating={isAnimating}
          onToggleAnimation={handleToggleAnimation}
          onRegenerate={handleRegenerate}
        />

        <div className="my-6">
          <RuleVisualization rule={rule} colorAlive={colorAlive} colorDead={colorDead} />
        </div>

        <CACanvas
          ref={canvasRef}
          width={width}
          generations={generations}
          cellSize={CELL_SIZE}
          colorAlive={colorAlive}
          colorDead={colorDead}
        />
      </div>
    </div>
  );
}
