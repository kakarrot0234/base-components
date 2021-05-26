import * as React from "react";
import "../../assets/BaseHOC.css";
import { Modal } from "antd";
import { IModalOptions } from "../../interfaces/IModalOptions";
import { useRefObject } from "../../hooks/useRefObject";
import { IBaseProps } from "../../interfaces/IBaseProps";
import { MainContext } from "../../contexts/MainContext";

interface IBaseState {
  openedModals?: {
    content?: any;
    modalOptions?: IModalOptions;
  }[];
}
export function BaseHOC<P>(
  WrappedComponent: React.FunctionComponent<P & IBaseProps>,
  config?: {
    mainContextInit?: any;
  }
) {
  const HocComponent = (props: React.PropsWithChildren<P> & IBaseProps) => {
    const [state, setState] = React.useState<IBaseState>({});
    const [mainContextValue, setMainContextValue] = React.useState<any>(
      (config || {}).mainContextInit || {}
    );

    const openModal = useRefObject(
      async (content: any, modalOptions?: IModalOptions) => {
        return new Promise<void>((resolve, reject) => {
          try {
            const openedModal = {
              content,
              modalOptions,
              onClosed: () => {
                resolve();
              }
            } as Required<IBaseState>["openedModals"][0];
            const openedModals = [...(state.openedModals || []), openedModal];
            setState((previousState) => {
              return {
                ...previousState,
                openedModals
              };
            });
          } catch (error) {
            reject(error);
          }
        });
      }
    );
    const closeModal = useRefObject(async () => {
      const openedModals = [...(state.openedModals || [])];
      if (openedModals.length > 0) {
        const openedModal = openedModals[openedModals.length - 1];
        if ((openedModal.modalOptions || {}).onClosed) {
          await openedModal.modalOptions!.onClosed!();
        }
        openedModals.pop();
        setState((previousState) => {
          return {
            ...previousState,
            openedModals
          };
        });
      }
    });
    function mainComponents() {
      return (
        <div>
          {(state.openedModals || []).map((o, i) => {
            return (
              <Modal key={i} {...(o.modalOptions || {})} visible={true}>
                {o.content}
              </Modal>
            );
          })}
          <WrappedComponent
            {...props}
            openModal={async (content, modalOptions) => {
              await openModal.current!(content, modalOptions);
            }}
            closeModal={async () => {
              closeModal.current!();
            }}></WrappedComponent>
        </div>
      );
    }
    if ((config || {}).mainContextInit) {
      return (
        <MainContext.Provider value={[mainContextValue, setMainContextValue]}>
          {mainComponents()}
        </MainContext.Provider>
      );
    }
    return mainComponents();
  };
  return HocComponent;
}
