import { Dispatch } from "redux";
import { getAPI, patchAPI } from "../../helpers/FetchData";
import { checkImage, imageUpload } from "../../helpers/ImageUpload";
import { checkPassword } from "../../helpers/Valid";
import { IAuth } from "../../interfaces/interfaces";
import { ALERT, IAlertType } from "../types/alertType";
import { AUTH, IAuthType } from "../types/authType";
import { GET_OTHER_INFO, IGetOtherInfoType } from "../types/profileType";

export const updateUser =
  (avatar: File, name: string, auth: IAuth) =>
  async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    if (!auth.access_token || !auth.user) return;
    let url = "";
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      if (avatar) {
        const check = checkImage(avatar);
        if (check) {
          return dispatch({ type: ALERT, payload: { errors: check } });
        }
        const photo = await imageUpload(avatar);
        url = photo.url;
      }
      dispatch({
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user,
            avatar: url ? url : auth.user.avatar,
            name: name ? name : auth.user.name,
          },
        },
      });
      const res: any = await patchAPI(
        "user",
        {
          avatar: url ? url : auth.user.avatar,
          name: name ? name : auth.user.name,
        },
        auth.access_token
      );
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };

export const resetPassword =
  (password: string, cf_password: string, token: string) =>
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    const msg = checkPassword(password, cf_password);
    if (msg) return dispatch({ type: ALERT, payload: { errors: msg } });
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await patchAPI("reset_password", { password }, token);
      dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
export const getOtherInfo =
  (id: string) => async (dispatch: Dispatch<IAlertType | IGetOtherInfoType>) => {
    try {
      dispatch({ type: ALERT, payload: { loading: true } });
      const res: any = await getAPI(`user/${id}`);
      dispatch({ type: GET_OTHER_INFO, payload: res.data });
      dispatch({ type: ALERT, payload: {} });
    } catch (error: any) {
      dispatch({ type: ALERT, payload: { errors: error.response.data.msg } });
    }
  };
