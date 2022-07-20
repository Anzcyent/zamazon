import { searchConstants } from "../constants";

const initialState = {
    results: []
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case searchConstants.SEARCH:

            return Object.assign({}, state, { ...state, results: action.payload });

        default:
            return state;
    }
}