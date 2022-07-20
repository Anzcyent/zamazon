import { categoryConstants } from "../constants";

const initialState = {
    categories: []
}

export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case categoryConstants.GET_CATEGORIES:
            return Object.assign({}, state, { ...state, categories: action.payload });
        default:
            return state;
    }
}