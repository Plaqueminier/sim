import type { ReactNode } from 'react';

interface RuleVisualizationProps {
  rule: number;
  colorAlive: string;
  colorDead: string;
}

export default function RuleVisualization({
  rule,
  colorAlive,
  colorDead,
}: RuleVisualizationProps): ReactNode {
  return (
    <div className="p-3 bg-gray-800 rounded-lg">
      <div className="flex gap-3 flex-wrap items-center">
        <span className="text-sm text-gray-400">Rule {rule}:</span>
        {[7, 6, 5, 4, 3, 2, 1, 0].map((i) => {
          const pattern = i.toString(2).padStart(3, '0');
          const output = (rule >> i) & 1;
          return (
            <div key={i} className="flex items-center gap-1">
              <div className="flex gap-px">
                {pattern.split('').map((bit, idx) => (
                  <div
                    key={idx}
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: bit === '1' ? colorAlive : colorDead,
                      border: '1px solid #374151',
                    }}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-xs">→</span>
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: output === 1 ? colorAlive : colorDead,
                  border: '1px solid #374151',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
