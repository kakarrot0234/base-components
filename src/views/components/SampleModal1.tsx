import { DataStoreContext } from "../../contexts/DataStoreContext";
import { useMainContext } from "../../hooks/useMainContext";
import { IBaseProps } from "../../interfaces/IBaseProps";
import { BaseHOC } from "./BaseHOC";

const SampleModal1Temp = (props: Partial<IBaseProps>) => {
  const [mainStore, setMainStore] = useMainContext(DataStoreContext);
  return (
    <div>
      <div>{mainStore.counter || 0}</div>
      <button
        onClick={() => {
          setMainStore((previousState) => {
            return {
              ...previousState,
              counter: (previousState.counter || 0) + 1
            };
          });
        }}>
        Add + 1
      </button>
    </div>
  );
};
export const SampleModal1 = BaseHOC(SampleModal1Temp);
