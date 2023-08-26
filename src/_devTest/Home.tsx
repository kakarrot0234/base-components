import * as React from "react";
import { BaseHOC } from "../views/components/BaseHOC";
import { IBaseProps } from "../interfaces/IBaseProps";
import { SampleModal1 } from "./SampleModal1";
import { SampleModal2 } from "./SampleModal2";
import { useMainContext } from "../hooks/useMainContext";
import { DataStoreContext } from "./DataStoreContext";
import { AutoCompleteInput } from "../views/components/AutoCompleteInput";

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
            },
          });
        }}
      >
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
            },
          });
        }}
      >
        Open Modal (with context)
      </button>
      <div>Counter: {mainStore.counter || 0}</div>
      <div>
        <AutoCompleteInput
          minCharacterCountForSearch={1}
          onBeginSearch={async () => {
            return [
              {
                searchedText: "test",
                foundText: "Test 1",
                foundTextDetail: "Test 1 detail",
                foundTextMatchOrder: 1,
                foundTextMatches: [
                  { from: 0, to: 1 },
                  { from: 3, to: 5 },
                ],
              },
            ];
          }}
        ></AutoCompleteInput>
      </div>
    </div>
  );
};

export default BaseHOC(Home, {
  mainContext: DataStoreContext,
  mainContextInit: {
    store: {},
    setStore: () => {},
  },
});
