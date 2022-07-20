import { userConstants, alertConstants } from "../constants";
import { getRequest, putRequest, postRequest } from "../../utils/request";

export const get_user = (id) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.PAGELOADING });

        const res = await getRequest(`user/get_user/${id}`);

        dispatch({ type: userConstants.GET_USER, payload: res.data.user });

        dispatch({ type: alertConstants.PAGELOADING_OFF });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const edit_profile = (data, token) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.PAGELOADING });

        const res = await putRequest("user/edit_profile", data, token);

        dispatch({ type: userConstants.GET_USER, payload: res.data.user });

        dispatch({ type: alertConstants.SUCCESS, payload: "Your profile has been updated." });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const purchase = (cart, token) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.PAGELOADING });

        const res = await postRequest("user/purchase", cart, token);

        dispatch({ type: alertConstants.PAGELOADING_OFF });

        return res;
    } catch (err) {
        throw new Error(err);
    }
}

export const read_notifications = (token) => async (dispatch) => {
    try {
        const res = await getRequest("user/read_notifications", token);

        return res;
    } catch (err) {
        throw new Error(err);
    }
}