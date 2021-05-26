import { AnotherDataStoreContext } from "../../contexts/AnotherDataStoreContext";
import { useMainContext } from "../../hooks/useMainContext";
import { IBaseProps } from "../../interfaces/IBaseProps";
import { BaseHOC } from "./BaseHOC";

const SampleModal2Temp = (props: Partial<IBaseProps>) => {
  const [veriDeposu, setVeriDeposu] = useMainContext(AnotherDataStoreContext);
  return (
    <div>
      <div>{veriDeposu.counter || 0}</div>
      <button
        onClick={() => {
          setVeriDeposu((previousState) => {
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
export const SampleModal2 = BaseHOC(SampleModal2Temp, {
  mainContext: AnotherDataStoreContext,
  mainContextInit: {
    store: {},
    setStore: () => {}
  }
});
