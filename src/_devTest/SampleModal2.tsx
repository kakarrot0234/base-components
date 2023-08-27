import { DataStoreContext } from "./DataStoreContext";
import { AnotherDataStoreContext } from "./AnotherDataStoreContext";
import { useMainContext } from "../hooks/useMainContext";
import { IBaseProps } from "../interfaces/IBaseProps";
import { BaseHOC } from "../views/components/BaseHOC";

const SampleModal2Temp = (props: Partial<IBaseProps>) => {
  const [selfDataStore, setSelfDataStore] = useMainContext(
    AnotherDataStoreContext,
  );
  const [mainDataStore, setMainDataStore] = useMainContext(DataStoreContext);
  return (
    <div>
      <div>Self Counter: {selfDataStore.counter || 0}</div>
      <button
        onClick={() => {
          setSelfDataStore((previousState) => {
            return {
              ...previousState,
              counter: (previousState.counter || 0) + 1,
            };
          });
        }}
      >
        Add + 1
      </button>
      <div>Main Counter: {mainDataStore.counter || 0}</div>
      <button
        onClick={() => {
          setMainDataStore((previousState) => {
            return {
              ...previousState,
              counter: (previousState.counter || 0) + 1,
            };
          });
        }}
      >
        Add + 1
      </button>
    </div>
  );
};
export const SampleModal2 = BaseHOC(SampleModal2Temp, {
  mainContext: AnotherDataStoreContext,
  mainContextInit: {
    store: {},
    setStore: () => {},
  },
});
