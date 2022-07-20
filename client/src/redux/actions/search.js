import { searchConstants, alertConstants } from "../constants";
import { getRequest } from "../../utils/request";

export const search = (value) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        const res = await getRequest(`search?value=${value}`);

        dispatch({ type: searchConstants.SEARCH, payload: res.data.results });

        dispatch({ type: alertConstants.CLEAR });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.message });
        throw new Error(err);
    }
}