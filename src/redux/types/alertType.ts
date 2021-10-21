import { IAlert } from "../../interfaces/interfaces";

export const ALERT = "ALERT";

export interface IAlertType {
  type: typeof ALERT;
  payload: IAlert;
}
