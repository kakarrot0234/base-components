import * as React from "react";
import { BaseHOC } from "../views/components/BaseHOC";
import { IBaseProps } from "../interfaces/IBaseProps";
import { SampleModal1 } from "./testForBaseHOC/SampleModal1";
import { SampleModal2 } from "./testForBaseHOC/SampleModal2";
import { useMainContext } from "../hooks/useMainContext";
import { DataStoreContext } from "./testForBaseHOC/DataStoreContext";
import { AutoCompleteInput } from "../views/components/AutoCompleteInput";
import { LockerTester } from "./testForLocker/LockerTester";

export interface IAppProps extends IBaseProps {}
const App: React.FunctionComponent<IAppProps> = (props) => {
  enum EnumTestItemKey {
    baseHOC = "BaseHOC",
    autoCompleteInput = "AutoCompleteInput",
    locker = "Locker",
  }
  const [m_TestItemKey, setTestItemKey] = React.useState<EnumTestItemKey>();
  const [m_MainStore] = useMainContext(DataStoreContext);
  const [m_AllTextForSearch] = React.useState<
    {
      text?: string;
      detail?: string;
    }[]
  >([
    { text: "Ahmet", detail: "Baba" },
    { text: "Fatma", detail: "Anne" },
    { text: "Melis", detail: "Melek" },
  ]);

  return (
    <div>
      <select
        onChange={(params) => {
          setTestItemKey(params.currentTarget.value as EnumTestItemKey);
        }}
      >
        <option value={EnumTestItemKey.baseHOC}>BaseHOC</option>
        <option value={EnumTestItemKey.autoCompleteInput}>
          AutoCompleteInput
        </option>
        <option value={EnumTestItemKey.locker}>Locker</option>
      </select>
      {m_TestItemKey === EnumTestItemKey.baseHOC ? (
        <>
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
          <div>Counter: {m_MainStore.counter || 0}</div>
        </>
      ) : (
        <></>
      )}
      {m_TestItemKey === EnumTestItemKey.autoCompleteInput ? (
        <div>
          <AutoCompleteInput
            minCharacterCountForSearch={1}
            searchForOnlyLastText={true}
            onBeginSearch={async (allText, lastText) => {
              const searchResults: {
                searchedText?: string | undefined;
                foundText?: string | undefined;
                foundTextDetail?: string | undefined;
                foundTextMatchOrder?: number | undefined;
                foundTextMatches?:
                  | {
                      from?: number;
                      to?: number;
                    }[]
                  | undefined;
              }[] = [];
              for (const textForSearch of m_AllTextForSearch) {
                const regex = new RegExp(
                  (lastText || "")
                    .split("")
                    .map((char) => `${char}?`)
                    .join(""),
                  "i",
                );
                const regexMatch = regex.exec(textForSearch.text || "");
                if (regexMatch && regexMatch[0].length > 0) {
                  searchResults.push({
                    searchedText: lastText,
                    foundText: textForSearch.text,
                    foundTextDetail: textForSearch.detail,
                    foundTextMatchOrder:
                      (textForSearch.text || "").length - regexMatch[0].length,
                    foundTextMatches: [
                      {
                        from: regexMatch.index,
                        to: regexMatch.index + regexMatch[0].length - 1,
                      },
                    ],
                  });
                }
              }
              return searchResults;
            }}
          ></AutoCompleteInput>
        </div>
      ) : (
        <></>
      )}
      {m_TestItemKey === EnumTestItemKey.locker ? (
        <div>
          <LockerTester></LockerTester>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BaseHOC(App, {
  mainContext: DataStoreContext,
  mainContextInit: {
    store: {},
    setStore: () => {},
  },
});
