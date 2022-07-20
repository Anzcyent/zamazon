import { orderConstants, alertConstants } from "../constants";
import { getRequest } from "../../utils/request";

export const get_orders = (token) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.PAGELOADING });

        const res = await getRequest("order/get_orders", token);

        dispatch({ type: orderConstants.GET_ORDERS, payload: res.data.orders });

        dispatch({ type: alertConstants.PAGELOADING_OFF });
    } catch (err) {
        throw new Error(err);
    }
} 