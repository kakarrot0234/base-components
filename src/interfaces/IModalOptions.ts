import { ModalProps } from "antd/lib/modal";

export interface IModalOptions
  extends Pick<
    ModalProps,
    "title" | "cancelText" | "okText" | "okType" | "closeIcon" | "closable"
  > {}
