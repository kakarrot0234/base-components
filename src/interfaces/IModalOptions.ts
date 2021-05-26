import { ModalProps } from "antd/lib/modal";

export interface IModalOptions
  extends Omit<
    ModalProps,
    | "visible"
    | "confirmLoading"
    | "destroyOnClose"
    | "maskTransitionName"
    | "transitionName"
    | "getContainer"
    | "prefixCls"
    | "modalRender"
    | "focusTriggerAfterClose"
    | "afterClose"
    | "forceRender"
  > {
  onClosed?(): Promise<void>;
}
