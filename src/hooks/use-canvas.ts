import { useRef, useEffect } from 'react';

export function useCanvas(
	draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
	deps: unknown[],
) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		draw(ctx, canvas.width, canvas.height);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return canvasRef;
}
