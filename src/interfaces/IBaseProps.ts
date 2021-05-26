import { IModalOptions } from "./IModalOptions";

export interface IBaseProps {
  openModal?(content: any, modalOptions?: IModalOptions): Promise<void>;
  closeModal?(): Promise<void>;
}
