import { ModalProps } from "antd/lib/modal";

export interface IModalOptions
  extends Omit<
    ModalProps,
    | "visible"
    | "confirmLoading"
    | "forceRender"
    | "destroyOnClose"
    | "maskTransitionName"
    | "transitionName"
    | "getContainer"
    | "prefixCls"
    | "modalRender"
    | "focusTriggerAfterClose"
    | "onOk"
    | "onCancel"
    | "afterClose"
  > {
  isValid?(): Promise<boolean>;
  onOk?(): Promise<void>;
  onCancel?(): Promise<void>;
  onClosing?(): Promise<{ cancel?: boolean }>;
  onClosed?(): Promise<void>;
}
