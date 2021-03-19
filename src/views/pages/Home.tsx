import * as React from "react";
import { BaseHOC, IBaseProps } from "../components/BaseHOC";

export interface IHomeProps extends IBaseProps {}
const Home: React.FunctionComponent<IHomeProps> = (props) => {
  function com() {
    return (
      <div>
        <div>Hello</div>
        <button
          onClick={() => {
            props.closeModal!();
          }}>
          Kapat
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          props.openModal!(com(), {
            title: "Heello",
            okText: "Tamam",
            cancelText: "Vazgeç",
            onOk: async () => {
              props.closeModal!();
            }
          });
        }}>
        Open Modal
      </button>
    </div>
  );
};

export default BaseHOC(Home);
