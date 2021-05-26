import * as React from "react";

export function useRefObject<T>(state: T) {
  const refState = React.useRef<T | null>(null);

  React.useEffect(() => {
    refState.current = state;
  });

  return refState;
}
