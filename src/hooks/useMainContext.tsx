import * as React from "react";
import { IMainContext } from "../interfaces/IMainContext";

export function useMainContext<T>(
  context: React.Context<IMainContext<T>>,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { store, setStore } = React.useContext(context);
  return [store, setStore];
}
