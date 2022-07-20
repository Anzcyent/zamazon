import { categoryConstants, alertConstants } from "../constants";
import { getRequest } from "../../utils/request";

export const get_categories = () => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        const res = await getRequest("category");

        dispatch({ type: categoryConstants.GET_CATEGORIES, payload: res.data.categories });

        dispatch({type: alertConstants.CLEAR});
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}