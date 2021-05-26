import * as React from "react";

export const MainContext = React.createContext<
  [any, React.Dispatch<React.SetStateAction<any>>]
>([{}, null]);
