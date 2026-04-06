import { useReducer, useCallback } from "react";

type Action<S> =
  | { type: "update"; patch: Partial<S> }
  | { type: "reset"; state: S };

function reducer<S>(state: S, action: Action<S>): S {
  switch (action.type) {
    case "update":
      return { ...state, ...action.patch };
    case "reset":
      return action.state;
  }
}

export function useSimulationState<S>(initialState: S) {
  const [state, dispatch] = useReducer(reducer<S>, initialState);

  const update = useCallback(
    (patch: Partial<S>) => dispatch({ type: "update", patch }),
    [],
  );

  const reset = useCallback(
    (s?: S) => dispatch({ type: "reset", state: s ?? initialState }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return [state, update, reset] as const;
}
