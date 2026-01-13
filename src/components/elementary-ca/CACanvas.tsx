import { useRef, forwardRef, useImperativeHandle } from 'react';

interface CACanvasProps {
  width: number;
  generations: number;
  cellSize: number;
  colorAlive: string;
  colorDead: string;
}

interface CACanvasRef {
  drawRows: (numRows: number, grid: number[][]) => void;
}

const CACanvas = forwardRef<CACanvasRef, CACanvasProps>(
  ({ width, generations, cellSize, colorAlive, colorDead }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawRows = (numRows: number, grid: number[][]): void => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = colorDead;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = colorAlive;

      for (let y = 0; y < Math.min(numRows, grid.length); y++) {
        const row = grid[y];
        for (let x = 0; x < row.length; x++) {
          if (row[x] === 1) {
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
        }
      }
    };

    useImperativeHandle(ref, () => ({
      drawRows,
    }));

    return (
      <div className="overflow-auto bg-gray-800 rounded-lg p-4" style={{ maxHeight: '450px' }}>
        <canvas
          ref={canvasRef}
          width={width * cellSize}
          height={generations * cellSize}
          className="mx-auto rounded"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    );
  }
);

CACanvas.displayName = 'CACanvas';

export { CACanvas };
export type { CACanvasRef };
