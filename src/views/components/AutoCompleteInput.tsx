import "../../assets/AutoCompleteInput.css";
import * as React from "react";

export interface IAutoCompleteInputProps {
  minCharacterCountForSearch?: number;
  onBeginSearch?(allText?: string): Promise<
    {
      searchedText?: string;
      foundText?: string;
      foundTextDetail?: string;
      foundTextMatchOrder?: number;
      foundTextMatches?: {
        from?: number;
        to?: number;
      }[];
    }[]
  >;
}
export function AutoCompleteInput(props: IAutoCompleteInputProps) {
  const refAutoCompleteInput = React.useRef<HTMLInputElement>(null);
  const refSelectContainer = React.useRef<HTMLDivElement>(null);
  const [m_Canvas] = React.useState(document.createElement("canvas"));
  const [m_CanvasContext] = React.useState(m_Canvas.getContext("2d"));
  const [m_CarretPositionMatrics, setCarretPositionMatrics] =
    React.useState<TextMetrics>();
  const [m_SelectVisible, setSelectVisible] = React.useState(false);
  const [m_SearchResults, setSearchResults] = React.useState<
    Awaited<ReturnType<Required<IAutoCompleteInputProps>["onBeginSearch"]>>
  >([]);

  // changing of refSelectContainer.current.style.left
  React.useEffect(() => {
    if (refSelectContainer.current) {
      refSelectContainer.current.style.left = `${
        m_CarretPositionMatrics?.width || 0
      }px`;
    }
  }, [m_CarretPositionMatrics]);

  function getTextMetrics(text: string) {
    if (m_CanvasContext && refAutoCompleteInput.current) {
      const ruleExpressionInputStyle = window.getComputedStyle(
        refAutoCompleteInput.current
      );
      m_CanvasContext.font = ruleExpressionInputStyle.font;
      const textMetrics = m_CanvasContext.measureText(text);
      return textMetrics;
    }
  }
  function selectItem(
    item: Awaited<
      ReturnType<Required<IAutoCompleteInputProps>["onBeginSearch"]>
    >[0]
  ) {
    const compSelectItem: JSX.Element[] = [];
    if (item.foundTextMatches && item.foundTextMatches.length > 0) {
      let key = 1;
      if ((item.foundTextMatches[0].from || 0) > 0) {
        compSelectItem.push(
          <span key={`${key++}`}>
            {(item.searchedText || "").substring(
              0,
              item.foundTextMatches[0].from || 0
            )}
          </span>
        );
      }
      for (let i = 0; i < item.foundTextMatches.length; i++) {
        compSelectItem.push(
          <span key={`${key++}`}>
            <b>
              {(item.searchedText || "").substring(
                item.foundTextMatches[i].from || 0,
                (item.foundTextMatches[i].to || 0) + 1
              )}
            </b>
          </span>
        );
      }
      if (
        (item.foundTextMatches[item.foundTextMatches.length - 1].to || 0) <
        (item.searchedText || "").length - 1
      ) {
        compSelectItem.push(
          <span key={`${key++}`}>
            {(item.searchedText || "").substring(
              (item.foundTextMatches[item.foundTextMatches.length - 1].to ||
                0) + 1
            )}
          </span>
        );
      }
    }
    return compSelectItem;
  }
  return (
    <div className="root-auto-complete-input">
      <input
        ref={refAutoCompleteInput}
        className="rule-auto-complete-input"
        type="text"
        autoComplete="off"
        onChange={(params) => {
          params.persist();
          const allText = params.target.value;
          const allTextLength = allText.length;
          if (allTextLength >= (props.minCharacterCountForSearch || 3)) {
            if (props.onBeginSearch) {
              props.onBeginSearch(allText).then(
                (searchResult) => {
                  setSearchResults(
                    searchResult.sort((previous, next) => {
                      return (
                        (next.foundTextMatchOrder || 0) -
                        (previous.foundTextMatchOrder || 0)
                      );
                    })
                  );
                  setSelectVisible(searchResult.length > 0);
                  if (searchResult.length > 0) {
                    let carretPosition = 0;
                    if (refAutoCompleteInput.current) {
                      carretPosition =
                        refAutoCompleteInput.current.selectionStart || 0;
                    }
                    const carretPositionTextMetrics = getTextMetrics(
                      allText.substring(0, carretPosition + 1)
                    );
                    setCarretPositionMatrics(carretPositionTextMetrics);
                  }
                },
                (error) => {
                  console.error(error);
                }
              );
            } else {
              setSelectVisible(false);
            }
          } else {
            setSelectVisible(false);
          }
        }}
      ></input>
      <div
        ref={refSelectContainer}
        className={`container-select ${m_SelectVisible ? "" : "non-visible"}`}
      >
        {m_SearchResults.map((listItem, index) => {
          return (
            <div className="container-select-item" key={index.toString()}>
              <label>{selectItem(listItem)}</label>
            </div>
          );
        }) || <></>}
      </div>
    </div>
  );
}
