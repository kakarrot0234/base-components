import * as React from "react";
import { IAnotherDataStore } from "../interfaces/IAnotherDataStore";
import { IMainContext } from "../interfaces/IMainContext";

export const AnotherDataStoreContext = React.createContext<
  IMainContext<IAnotherDataStore>
>({ store: {}, setStore: () => {} });
