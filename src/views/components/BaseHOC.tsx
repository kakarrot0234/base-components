import * as React from "react";
import "../../assets/BaseHOC.css";
import { Modal } from "antd";
import { IModalOptions } from "../../interfaces/IModalOptions";

export interface IBaseProps {
  openModal?(content: any, modalOptions?: IModalOptions): void;
  openModalAsync?(content: any, modalOptions?: IModalOptions): Promise<void>;
  closeModal?(): void;
}
export interface IBaseState {
  openedModals?: {
    content?: any;
    modalOptions?: IModalOptions;
    onClosed?(): void;
  }[];
}
export function BaseHOC<P>(
  WrappedComponent: React.FunctionComponent<P & IBaseProps>
) {
  const hocComponent = (props: React.PropsWithChildren<P> & IBaseProps) => {
    const [state, setState] = React.useState<IBaseState>({});

    function openModal(content: any, modalOptions?: IModalOptions) {
      console.log("tetiklendi.");
      const openedModal = {
        content,
        modalOptions
      } as Required<IBaseState>["openedModals"][0];
      const openedModals = [...(state.openedModals || []), openedModal];
      setState((previousState) => {
        return {
          ...previousState,
          openedModals
        };
      });
    }
    async function openModalAsync(content: any, modalOptions?: IModalOptions) {
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
          reject();
        }
      });
    }
    function closeModal() {
      const openedModals = [...(state.openedModals || [])];
      const openedModal = openedModals.pop();
      if ((openedModal || {}).onClosed) {
        openedModal!.onClosed!();
      }
      setState((previousState) => {
        return {
          ...previousState,
          openedModals
        };
      });
    }

    return (
      <WrappedComponent
        {...props}
        openModal={(modal, modalOptions) => {
          openModal(modal, modalOptions);
        }}
        openModalAsync={async (content, modalOptions) => {
          await openModalAsync(content, modalOptions);
        }}
        closeModal={() => {
          closeModal();
        }}
      >
        {props.children}
        <div>ol</div>
        <Modal visible={true}>Hello</Modal>
        {(state.openedModals || []).map((o, i) => {
          return (
            <Modal
              key={i}
              {...o}
              visible={true}
              onCancel={() => {
                closeModal();
              }}
            >
              {o.content}
            </Modal>
          );
        })}
      </WrappedComponent>
    );
  };
  return hocComponent;
}
