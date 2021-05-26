import * as React from "react";
import { useMainContext } from "../../hooks/useMainContext";
import { IBaseProps } from "../../interfaces/IBaseProps";
import { IVeriDeposu } from "../../interfaces/IVeriDeposu";

export function SampleModal(props: Partial<IBaseProps>) {
  const [veriDeposu, setVeriDeposu] = useMainContext<IVeriDeposu>();
  return (
    <div>
      <div>{veriDeposu.counter}</div>
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
}
