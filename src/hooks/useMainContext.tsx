import * as React from "react";
import { MainContext } from "../contexts/MainContext";

export function useMainContext<T>(
  contextId?: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [mainStore, setMainStore] = React.useContext(MainContext);
  return [mainStore, setMainStore];
}
