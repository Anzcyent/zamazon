import { commentConstants } from "../constants";

const initialState = {
    comments: []
}

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case commentConstants.CREATE_COMMENT:
            return Object.assign({}, state, { ...state, comments: [...state.comments, action.payload] });
        case commentConstants.GET_COMMENTS:
            return Object.assign({}, state, { ...state, comments: action.payload });
        case commentConstants.DELETE_COMMENT:
            return Object.assign({}, state, { ...state, comments: state.comments.filter(c => c._id !== action.payload._id) });
        default:
            return state;
    }
}