import { orderConstants } from "../constants";

const initialState = {
    orders: []
}

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case orderConstants.GET_ORDERS:
            return Object.assign({}, state, { ...state, orders: action.payload });

        default:
            return state;
    }
} 