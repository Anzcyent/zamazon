import { alertConstants } from "../constants";

const initialState = {
    loading: false,
    pageLoading: false,
    success: null,
    error: null
};

export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case alertConstants.LOADING:
            return Object.assign({}, state, { ...state, loading: true, pageLoading: false });
        case alertConstants.PAGELOADING:
            return Object.assign({}, state, { ...state, pageLoading: true, loading: false });
        case alertConstants.PAGELOADING_OFF:
            return Object.assign({}, state, { ...state, pageLoading: false, loading: false });
        case alertConstants.SUCCESS:
            return Object.assign({}, state, { ...state, success: action.payload, loading: false, pageLoading: false });
        case alertConstants.ERROR:
            return Object.assign({}, state, { ...state, error: action.payload, loading: false, pageLoading: false });
        case alertConstants.CLEAR:
            return Object.assign({}, state, { ...state, loading: false, pageLoading: false, success: null, error: null });
        default:
            return state;
    }
}