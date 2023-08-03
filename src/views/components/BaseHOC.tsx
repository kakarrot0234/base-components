import * as React from "react";
import "../../assets/BaseHOC.css";
import { Modal } from "antd";
import { IModalOptions } from "../../interfaces/IModalOptions";
import { useRefObject } from "../../hooks/useRefObject";
import { IBaseProps } from "../../interfaces/IBaseProps";
import { IMainContext } from "../../interfaces/IMainContext";

export function BaseHOC<P>(
  WrappedComponent: React.FunctionComponent<P & IBaseProps>,
  config?: {
    mainContext?: React.Context<IMainContext<any>>;
    mainContextInit?: IMainContext<any>;
  }
) {
  const HocComponent = (props: React.PropsWithChildren<P> & IBaseProps) => {
    const [m_OpenedModals, setOpenedModals] = React.useState<
      {
        content?: any;
        modalOptions?: IModalOptions;
        asyncResolver?: () => void;
      }[]
    >([]);
    const [m_CreatedContexts, setCreatedContexts] = React.useState<{
      [contextId: string]: React.Context<any>;
    }>({});
    const [m_MainContextValue, setMainContextValue] = React.useState<any>(
      ((config || {}).mainContextInit || {}).store || {}
    );
    const refOpenedModals = useRefObject(m_OpenedModals);

    async function openModal(content: any, modalOptions?: IModalOptions) {
      return new Promise<void>((resolve, reject) => {
        try {
          const openedModal = {
            content,
            modalOptions,
            asyncResolver: resolve,
          } as (typeof m_OpenedModals)[0];
          const newOpenedModals = [
            ...(refOpenedModals.current || []),
            openedModal,
          ];
          setOpenedModals(newOpenedModals);
        } catch (error) {
          reject(error);
        }
      });
    }
    async function closeModal() {
      const newOpenedModals = [...(refOpenedModals.current || [])];
      if (newOpenedModals.length > 0) {
        const openedModal = newOpenedModals[newOpenedModals.length - 1];
        newOpenedModals.pop();
        if (openedModal.asyncResolver) {
          openedModal.asyncResolver();
        }
        setOpenedModals(newOpenedModals);
      }
    }

    function mainComponents() {
      return (
        <div>
          {m_OpenedModals.map((openedModal, index) => {
            return (
              <Modal
                key={index}
                {...(openedModal.modalOptions || {})}
                visible={true}
              >
                {openedModal.content}
              </Modal>
            );
          })}
          <WrappedComponent
            {...props}
            openModal={async (content, modalOptions) => {
              await openModal(content, modalOptions);
            }}
            closeModal={async () => {
              await closeModal();
            }}
          ></WrappedComponent>
        </div>
      );
    }
    if (config && config.mainContext) {
      return (
        <config.mainContext.Provider
          value={{ store: m_MainContextValue, setStore: setMainContextValue }}
        >
          {mainComponents()}
        </config.mainContext.Provider>
      );
    }
    return mainComponents();
  };
  return HocComponent;
}
