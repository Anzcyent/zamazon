import { userConstants } from "../constants";

const initialState = {
    users: [],
    current_user: {}
}

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.GET_USER:
            return Object.assign({}, state, { ...state, current_user: action.payload });
        default:
            return state;
    }
}