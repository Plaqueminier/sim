import { useMemo, useCallback } from "react";
import { SimulationPage } from "@/components/simulation";
import { PlaybackBar, StatDisplay } from "@/components/controls";
import { useAnimation } from "@/hooks/use-animation";
import { useSimulationState } from "@/hooks/use-simulation-state";
import { generateGrid } from "@/engines/elementary-ca";
import { defaultEffectsConfig } from "./effects/types";
import { Controls } from "./controls";
import { EffectsPanel } from "./effects-panel";
import { RuleVisualization } from "./rule-visualization";
import { CACanvas } from "./ca-canvas";

const CELL_SIZE = 3;
const BASE_DURATION_MS = 5000;

function computeMaxWidth(): number {
  if (typeof window === "undefined") return 201;
  const w = Math.floor(window.innerWidth / CELL_SIZE);
  return w % 2 === 0 ? w - 1 : w;
}

const initialMaxWidth = computeMaxWidth();

export function ElementaryCA() {
  const [state, update] = useSimulationState({
    rule: 30,
    width: initialMaxWidth,
    maxWidth: initialMaxWidth,
    generations: 150,
    colorAlive: "#ffffff",
    colorDead: "#0a0a0a",
    initialState: "single" as "single" | "random",
    effectsConfig: defaultEffectsConfig(),
    seed: 0,
    speed: 1,
  });

  const grid = useMemo(
    () => generateGrid(state.rule, state.width, state.generations, state.initialState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.rule, state.width, state.generations, state.initialState, state.seed],
  );

  const anim = useAnimation(state.generations, BASE_DURATION_MS / state.speed);

  const handlePlay = useCallback(() => {
    update({ seed: state.seed + 1 });
    anim.play();
  }, [anim, state.seed, update]);

  const handleReset = useCallback(() => {
    anim.reset();
  }, [anim]);

  const handleFitWidth = useCallback(() => {
    const mw = computeMaxWidth();
    update({ maxWidth: mw, width: mw });
  }, [update]);

  const aliveCount = useMemo(() => {
    let count = 0;
    for (const row of grid) {
      for (const cell of row) {
        if (cell === 1) count++;
      }
    }
    return count;
  }, [grid]);

  const totalCells = state.width * state.generations;
  const alivePercent = totalCells > 0 ? ((aliveCount / totalCells) * 100).toFixed(1) : "0";

  return (
    <SimulationPage
      title="Elementary Cellular Automata"
      description="Explore Wolfram's 256 rules of 1D binary cellular automata"
      accent="var(--sim-ca)"
      playback={
        <PlaybackBar
          isPlaying={anim.isPlaying}
          onPlay={handlePlay}
          onPause={anim.pause}
          onReset={handleReset}
          speed={state.speed}
          onSpeedChange={(speed) => update({ speed })}
        />
      }
      controls={
        <>
          <Controls
            state={state}
            update={update}
            onFitWidth={handleFitWidth}
          />
          <div className="my-4">
            <EffectsPanel
              config={state.effectsConfig}
              onChange={(effectsConfig) => update({ effectsConfig })}
            />
          </div>
          <div className="my-4">
            <RuleVisualization
              rule={state.rule}
              colorAlive={state.colorAlive}
              colorDead={state.colorDead}
            />
          </div>
        </>
      }
      stats={
        <StatDisplay
          stats={[
            { label: "Rule", value: state.rule },
            { label: "Width", value: state.width },
            { label: "Generations", value: state.generations },
            { label: "Alive", value: `${alivePercent}%` },
          ]}
        />
      }
      canvas={
        <CACanvas
          width={state.width}
          generations={state.generations}
          cellSize={CELL_SIZE}
          colorAlive={state.colorAlive}
          colorDead={state.colorDead}
          grid={grid}
          visibleRows={anim.currentStep}
          effectsConfig={state.effectsConfig}
          isAnimating={anim.isPlaying}
        />
      }
    />
  );
}
