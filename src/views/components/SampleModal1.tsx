import { DataStoreContext } from "../../contexts/DataStoreContext";
import { useMainContext } from "../../hooks/useMainContext";
import { IBaseProps } from "../../interfaces/IBaseProps";
import { BaseHOC } from "./BaseHOC";

const SampleModal1Temp = (props: Partial<IBaseProps>) => {
  const [veriDeposu, setVeriDeposu] = useMainContext(DataStoreContext);
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
export const SampleModal1 = BaseHOC(SampleModal1Temp);
