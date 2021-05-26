import * as React from "react";
import { BaseHOC } from "../components/BaseHOC";
import { IBaseProps } from "../../interfaces/IBaseProps";
import { IVeriDeposu } from "../../interfaces/IVeriDeposu";
import { SampleModal } from "../components/SampleModal";
import { useMainContext } from "../../hooks/useMainContext";

export interface IHomeProps extends IBaseProps {}
const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const [veriDeposu] = useMainContext<IVeriDeposu>();

  return (
    <div>
      <button
        onClick={async () => {
          await props.openModal!(<SampleModal {...props}></SampleModal>, {
            title: "Heello",
            okText: "Tamam",
            cancelText: "Vazgeç",
            onOk: async () => {
              props.closeModal!();
            },
            onCancel: async () => {
              props.closeModal!();
            }
          });
        }}>
        Open Modal
      </button>
      <div>Counter: {veriDeposu.counter}</div>
    </div>
  );
};

export default BaseHOC(Home, {
  mainContextInit: { counter: 1 } as IVeriDeposu
});
