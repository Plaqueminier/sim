import type { ReactNode } from 'react';

interface CAControlsProps {
  rule: number;
  onRuleChange: (rule: number) => void;
  initialState: 'single' | 'random';
  onInitialStateChange: (state: 'single' | 'random') => void;
  colorAlive: string;
  onColorAliveChange: (color: string) => void;
  colorDead: string;
  onColorDeadChange: (color: string) => void;
  width: number;
  onWidthChange: (width: number) => void;
  generations: number;
  onGenerationsChange: (generations: number) => void;
  animationSpeed: number;
  onAnimationSpeedChange: (speed: number) => void;
  isAnimating: boolean;
  onToggleAnimation: () => void;
  onRegenerate: () => void;
}

const PRESET_RULES = [
  { num: 30, name: 'Chaos' },
  { num: 90, name: 'Sierpiński' },
  { num: 110, name: 'Turing' },
  { num: 184, name: 'Traffic' },
  { num: 45, name: 'Fractal' },
  { num: 126, name: 'Complex' },
];

export default function CAControls({
  rule,
  onRuleChange,
  initialState,
  onInitialStateChange,
  colorAlive,
  onColorAliveChange,
  colorDead,
  onColorDeadChange,
  width,
  onWidthChange,
  generations,
  onGenerationsChange,
  animationSpeed,
  onAnimationSpeedChange,
  isAnimating,
  onToggleAnimation,
  onRegenerate,
}: CAControlsProps): ReactNode {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Rule (0-255)</label>
          <input
            type="number"
            min="0"
            max="255"
            value={rule}
            onChange={(e) =>
              onRuleChange(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))
            }
            className="w-24 px-3 py-2 bg-gray-800 rounded border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Presets</label>
          <div className="flex gap-2 flex-wrap">
            {PRESET_RULES.map((preset) => (
              <button
                key={preset.num}
                onClick={() => onRuleChange(preset.num)}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  rule === preset.num ? 'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {preset.num}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 items-end">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Initial</label>
          <div className="flex gap-2">
            <button
              onClick={() => onInitialStateChange('single')}
              className={`px-3 py-1.5 rounded text-sm ${
                initialState === 'single' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              Single
            </button>
            <button
              onClick={() => onInitialStateChange('random')}
              className={`px-3 py-1.5 rounded text-sm ${
                initialState === 'random' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              Random
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Alive</label>
          <input
            type="color"
            value={colorAlive}
            onChange={(e) => onColorAliveChange(e.target.value)}
            className="w-12 h-9 rounded cursor-pointer bg-transparent border-0"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Dead</label>
          <input
            type="color"
            value={colorDead}
            onChange={(e) => onColorDeadChange(e.target.value)}
            className="w-12 h-9 rounded cursor-pointer bg-transparent border-0"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Width: {width}</label>
          <input
            type="range"
            min="51"
            max="401"
            step="2"
            value={width}
            onChange={(e) => onWidthChange(parseInt(e.target.value))}
            className="w-28 accent-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Gens: {generations}</label>
          <input
            type="range"
            min="50"
            max="300"
            value={generations}
            onChange={(e) => onGenerationsChange(parseInt(e.target.value))}
            className="w-28 accent-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Speed</label>
          <input
            type="range"
            min="1"
            max="100"
            value={animationSpeed}
            onChange={(e) => onAnimationSpeedChange(parseInt(e.target.value))}
            className="w-20 accent-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onToggleAnimation}
          className={`px-4 py-2 rounded font-medium ${
            isAnimating ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isAnimating ? 'Stop' : '▶ Animate'}
        </button>
        <button
          onClick={onRegenerate}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium"
        >
          {initialState === 'random' ? 'Randomize' : 'Regenerate'}
        </button>
      </div>
    </div>
  );
}
