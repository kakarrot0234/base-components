import * as React from "react";
import { BaseHOC } from "../components/BaseHOC";
import { IBaseProps } from "../../interfaces/IBaseProps";
import { SampleModal1 } from "../components/SampleModal1";
import { SampleModal2 } from "../components/SampleModal2";
import { useMainContext } from "../../hooks/useMainContext";
import { DataStoreContext } from "../../contexts/DataStoreContext";

export interface IHomeProps extends IBaseProps {}
const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const [mainStore] = useMainContext(DataStoreContext);

  return (
    <div>
      <button
        onClick={async () => {
          await props.openModal!(<SampleModal1 {...props}></SampleModal1>, {
            title: "Title",
            okText: "Ok",
            cancelText: "Cancel",
            onOk: async () => {
              props.closeModal!();
            },
            onCancel: async () => {
              props.closeModal!();
            }
          });
        }}>
        Open Modal (without context)
      </button>
      <button
        onClick={async () => {
          await props.openModal!(<SampleModal2 {...props}></SampleModal2>, {
            title: "Title",
            okText: "Ok",
            cancelText: "Cancel",
            onOk: async () => {
              props.closeModal!();
            },
            onCancel: async () => {
              props.closeModal!();
            }
          });
        }}>
        Open Modal (with context)
      </button>
      <div>Counter: {mainStore.counter || 0}</div>
    </div>
  );
};

export default BaseHOC(Home, {
  mainContext: DataStoreContext,
  mainContextInit: {
    store: {},
    setStore: () => {}
  }
});
