import * as React from "react";
import { IMainContext } from "../interfaces/IMainContext";
import { IDataStore } from "../interfaces/IDataStore";

export const DataStoreContext = React.createContext<IMainContext<IDataStore>>({
  store: {},
  setStore: () => {}
});
