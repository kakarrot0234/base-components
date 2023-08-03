import * as ReactDom from "react-dom";
import { App } from "./App";

ReactDom.render(<App></App>, document.getElementById("root"));

export * from "./hooks/useMainContext";
export * from "./hooks/useRefObject";
export * from "./interfaces/IDataStore";
export * from "./interfaces/IMainContext";
export * from "./interfaces/IModalOptions";
export * from "./interfaces/IBaseProps";
export * from "./views/components/BaseHOC";
