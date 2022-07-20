import { productConstants, alertConstants } from "../constants";
import { getRequest, postRequest, putRequest, deleteRequest } from "../../utils/request";

export const get_products = () => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        const res = await getRequest("product");

        dispatch({ type: productConstants.GET_PRODUCTS, payload: res.data.products });

        dispatch({ type: alertConstants.CLEAR });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const get_products_by_category_name = (category) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        const res = await getRequest(`product/${category}`);

        dispatch({ type: productConstants.GET_PRODUCTS_BY_CATEGORY_NAME, payload: res.data.products });

        dispatch({ type: alertConstants.CLEAR });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const get_product = (id) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.PAGELOADING });

        const res = await getRequest(`product/get_product/${id}`);

        dispatch({ type: productConstants.GET_PRODUCT, payload: res.data.product });

        dispatch({ type: alertConstants.PAGELOADING_OFF });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const get_random_product = (id, category) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        const res = await getRequest(`product/get_random_product/${id}?category=${category}`);

        dispatch({ type: productConstants.GET_RANDOM_PRODUCT, payload: res.data.product });

        dispatch({ type: alertConstants.CLEAR });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const get_other_products = (id) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        const res = await getRequest(`product/get_other_products/${id}`);

        dispatch({ type: productConstants.GET_OTHER_PRODUCTS, payload: res.data.filtered_products });

        dispatch({ type: alertConstants.CLEAR });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const increase_view_count = (id, token) => async (dispatch) => {
    await postRequest(`product/increase_view_count/${id}`, null, token);
}

export const create_product = (data, token, navigate) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.PAGELOADING });

        const res = await postRequest(`product/create_product`, data, token);

        dispatch({ type: productConstants.CREATE_PRODUCT, payload: res.data.product });

        dispatch({ type: alertConstants.PAGELOADING_OFF });

        navigate(`/product/${res.data.product._id}`);

        window.location.reload();
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const rate_product = (id, data, token) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.LOADING });

        const res = await postRequest(`product/rate_product/${id}`, data, token);

        dispatch({ type: productConstants.GET_PRODUCT, payload: res.data.product })

        dispatch({ type: alertConstants.CLEAR });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const edit_product = (id, data, token) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.PAGELOADING });

        const res = await putRequest(`product/edit_product/${id}`, data, token);

        dispatch(get_product(id));

        dispatch({ type: alertConstants.PAGELOADING_OFF });

        return res;
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const delete_product = (id, token) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.PAGELOADING });

        const res = await deleteRequest(`product/delete_product/${id}`, token);

        dispatch(get_products());

        dispatch({ type: alertConstants.PAGELOADING_OFF });

        window.location.reload();
        
        return res;
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
} 