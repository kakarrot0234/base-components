import * as React from "react";

export interface IMainContext<T> {
  store: T;
  setStore: React.Dispatch<React.SetStateAction<T>>;
}
