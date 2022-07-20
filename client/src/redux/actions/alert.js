import { alertConstants } from "../constants";

export const toastAction = (msg) => (dispatch) => {
    try {
        dispatch({ type: alertConstants.ALERT, payload: msg });
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}