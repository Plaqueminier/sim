const PATTERNS = [7, 6, 5, 4, 3, 2, 1, 0];

interface RuleVisualizationProps {
  rule: number;
  colorAlive: string;
  colorDead: string;
}

export function RuleVisualization({
  rule,
  colorAlive,
  colorDead,
}: RuleVisualizationProps) {
  return (
    <div className="p-3 bg-surface-1 rounded-lg">
      <div className="flex gap-3 flex-wrap items-center">
        <span className="text-sm text-muted-foreground font-mono">
          Rule {rule}:
        </span>
        {PATTERNS.map((i) => {
          const pattern = i.toString(2).padStart(3, "0");
          const output = (rule >> i) & 1;
          return (
            <div key={i} className="flex items-center gap-1">
              <div className="flex gap-px">
                {pattern.split("").map((bit, idx) => (
                  <div
                    key={idx}
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: bit === "1" ? colorAlive : colorDead,
                      border: "1px solid #374151",
                    }}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-xs">→</span>
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: output === 1 ? colorAlive : colorDead,
                  border: "1px solid #374151",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
