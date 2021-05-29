import * as React from "react";
import "../../assets/BaseHOC.css";
import { Modal } from "antd";
import { IModalOptions } from "../../interfaces/IModalOptions";
import { useRefObject } from "../../hooks/useRefObject";
import { IBaseProps } from "../../interfaces/IBaseProps";
import { IMainContext } from "../../interfaces/IMainContext";

interface IBaseState {
  openedModals?: {
    content?: any;
    modalOptions?: IModalOptions;
    asyncResolver?: () => void;
  }[];
  createdContexts?: { [contextId: string]: React.Context<any> };
}
export function BaseHOC<P>(
  WrappedComponent: React.FunctionComponent<P & IBaseProps>,
  config?: {
    mainContext?: React.Context<IMainContext<any>>;
    mainContextInit?: IMainContext<any>;
  }
) {
  const HocComponent = (props: React.PropsWithChildren<P> & IBaseProps) => {
    const [state, setState] = React.useState<IBaseState>({});
    const [mainContextValue, setMainContextValue] = React.useState<any>(
      ((config || {}).mainContextInit || {}).store || {}
    );
    const openModal = useRefObject(
      async (content: any, modalOptions?: IModalOptions) => {
        return new Promise<void>((resolve, reject) => {
          try {
            const openedModal = {
              content,
              modalOptions,
              asyncResolver: resolve
            } as Required<IBaseState>["openedModals"][0];
            const openedModals = [...(state.openedModals || []), openedModal];
            setState((previousState) => {
              return {
                ...previousState,
                openedModals,
                openModalResolve: resolve
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
        openedModals.pop();
        setState((previousState) => {
          return {
            ...previousState,
            openedModals
          };
        });
        if (openedModal.asyncResolver) {
          openedModal.asyncResolver();
        }
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
            }}
          ></WrappedComponent>
        </div>
      );
    }
    if (config && config.mainContext) {
      return (
        <config.mainContext.Provider
          value={{ store: mainContextValue, setStore: setMainContextValue }}
        >
          {mainComponents()}
        </config.mainContext.Provider>
      );
    }
    return mainComponents();
  };
  return HocComponent;
}
