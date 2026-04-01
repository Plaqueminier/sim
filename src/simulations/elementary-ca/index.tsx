import { useState, useMemo, useCallback } from "react";
import { SimulationPage } from "@/components/simulation";
import { useAnimation } from "@/hooks/use-animation";
import { generateGrid } from "@/engines/elementary-ca";
import { defaultEffectsConfig } from "./effects/types";
import { Controls } from "./controls";
import { EffectsPanel } from "./effects-panel";
import { RuleVisualization } from "./rule-visualization";
import { CACanvas } from "./ca-canvas";

const CELL_SIZE = 3;

function computeMaxWidth(): number {
  if (typeof window === "undefined") return 201;
  const w = Math.floor(window.innerWidth / CELL_SIZE);
  return w % 2 === 0 ? w - 1 : w;
}

export function ElementaryCA() {
  const [maxWidth, setMaxWidth] = useState(computeMaxWidth);
  const [rule, setRule] = useState(30);
  const [width, setWidth] = useState(maxWidth);
  const [generations, setGenerations] = useState(150);
  const [colorAlive, setColorAlive] = useState("#ffffff");
  const [colorDead, setColorDead] = useState("#0a0a0a");
  const [initialState, setInitialState] = useState<"single" | "random">("single");
  const [animationDuration, setAnimationDuration] = useState(5);
  const [effectsConfig, setEffectsConfig] = useState(defaultEffectsConfig);
  const [fullscreen, setFullscreen] = useState(false);
  const [seed, setSeed] = useState(0);

  const grid = useMemo(
    () => generateGrid(rule, width, generations, initialState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rule, width, generations, initialState, seed],
  );

  const anim = useAnimation(generations, animationDuration * 1000);

  const handleToggleAnimation = useCallback(() => {
    if (anim.isPlaying) {
      anim.reset();
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    } else {
      setSeed((s) => s + 1);
      if (fullscreen) {
        document.getElementById("ca-canvas-wrapper")?.requestFullscreen().catch(() => {});
      }
      anim.play();
    }
  }, [anim, fullscreen]);

  const handleFitWidth = useCallback(() => {
    const mw = computeMaxWidth();
    setMaxWidth(mw);
    setWidth(mw);
  }, []);

  return (
    <SimulationPage
      title="Elementary Cellular Automata"
      description="Explore Wolfram's 256 rules of 1D binary cellular automata"
      controls={
        <>
          <Controls
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
            maxWidth={maxWidth}
            generations={generations}
            onGenerationsChange={setGenerations}
            animationDuration={animationDuration}
            onAnimationDurationChange={setAnimationDuration}
            isPlaying={anim.isPlaying}
            onToggleAnimation={handleToggleAnimation}
            fullscreen={fullscreen}
            onFullscreenChange={setFullscreen}
            onFitWidth={handleFitWidth}
          />
          <div className="my-4">
            <EffectsPanel config={effectsConfig} onChange={setEffectsConfig} />
          </div>
          <div className="my-6">
            <RuleVisualization rule={rule} colorAlive={colorAlive} colorDead={colorDead} />
          </div>
        </>
      }
      canvas={
        <CACanvas
          width={width}
          generations={generations}
          cellSize={CELL_SIZE}
          colorAlive={colorAlive}
          colorDead={colorDead}
          grid={grid}
          visibleRows={anim.currentStep}
          effectsConfig={effectsConfig}
          isAnimating={anim.isPlaying}
        />
      }
    />
  );
}
