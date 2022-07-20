import { authConstants } from "../constants";

const initialState = {}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case authConstants.AUTH:
            return Object.assign({}, state, action.payload);
        case authConstants.COMPLETE_PROFILE:
            return Object.assign({}, state, { ...state, user: action.payload });
        default:
            return state;
    }
}