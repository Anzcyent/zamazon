import { authConstants, alertConstants } from "../constants";
import { getRequest, postRequest } from "../../utils/request";

export const register = (data, navigate) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.CLEAR });
        dispatch({ type: alertConstants.LOADING });

        const res = await postRequest("auth/register", data);

        dispatch({ type: authConstants.AUTH, payload: { user: res.data.user } });

        localStorage.setItem("auth", true);

        navigate("/");

        dispatch({ type: alertConstants.SUCCESS, payload: `Welcome to Zamazon ${res.data.user.full_name}` });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const refresh_token = () => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.PAGELOADING })

        const res = await getRequest("auth/refresh_token");

        dispatch({ type: authConstants.AUTH, payload: { access_token: res.data.access_token, user: res.data.user } });

        dispatch({ type: alertConstants.PAGELOADING_OFF })
    } catch (err) {
        localStorage.removeItem("auth");

        throw new Error(err);
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("auth");

        const res = await getRequest("auth/logout");

        window.location.reload();

        return res;
    } catch (err) {
        throw new Error(err);
    }
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: alertConstants.CLEAR });
        dispatch({ type: alertConstants.LOADING });

        const res = await postRequest("auth/login", data);

        dispatch({ type: authConstants.AUTH, payload: { user: res.data.user } });

        localStorage.setItem("auth", true);

        dispatch({ type: alertConstants.SUCCESS, payload: `Welcome again ${res.data.user.full_name}` });
    } catch (err) {
        dispatch({ type: alertConstants.ERROR, payload: err.response.data.msg });
        throw new Error(err);
    }
}

export const complete_profile = (data, token) => async (dispatch) => {
    dispatch({ type: alertConstants.PAGELOADING });

    const res = await postRequest("auth/complete_profile", data, token);

    dispatch({ type: authConstants.COMPLETE_PROFILE, payload: res.data.user });

    dispatch({ type: alertConstants.SUCCESS, payload: "Your profile has been completed."});
}