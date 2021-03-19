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
          }}
        >
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
            title: "Heello"
          });
        }}
      >
        Open Modal
      </button>
      <button
        onClick={() => {
          props.closeModal!();
        }}
      >
        Close Modal
      </button>
    </div>
  );
};

export default BaseHOC(Home);
