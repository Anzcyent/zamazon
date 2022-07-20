import { commentConstants, alertConstants } from "../constants";
import { postRequest, getRequest, deleteRequest, putRequest } from "../../utils/request";

export const create_comment = (id, data, token) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        const res = await postRequest(`comment/create_comment/${id}`, data, token);

        dispatch({ type: commentConstants.CREATE_COMMENT, payload: res.data.comment });

        dispatch(get_comments(id));

        dispatch({ type: alertConstants.CLEAR });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const get_comments = (id) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        const res = await getRequest(`comment/comments/${id}`);

        dispatch({ type: commentConstants.GET_COMMENTS, payload: res.data.comments });

        dispatch({ type: alertConstants.CLEAR });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const delete_comment = (id, token) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        const res = await deleteRequest(`comment/delete_comment/${id}`, token);

        dispatch({ type: commentConstants.DELETE_COMMENT, payload: res.data.comment });

        dispatch({ type: alertConstants.CLEAR });

    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const edit_comment = (id, data, token, product_id) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        // eslint-disable-next-line
        const res = await putRequest(`comment/edit_comment/${id}`, data, token);

        dispatch(get_comments(product_id));

        dispatch({ type: alertConstants.CLEAR });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}