import { cartConstants } from "../constants";

const initialState = {
    cart: []
}


export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case cartConstants.ADD_TO_CART:
            const existingItem = state.cart.find(c => c._id === action.payload._id);

            if (existingItem) {
                const newCart = state.cart.map(c => {
                    if (c._id === action.payload._id) {
                        return Object.assign({}, existingItem, { quantity: existingItem.quantity + action.payload.quantity });
                    }
                    return c;
                });

                localStorage.setItem("cart", JSON.stringify(newCart));

                return Object.assign({}, state, { ...state, cart: newCart });
            }

            return Object.assign({}, state, { ...state, cart: [...state.cart, action.payload] });

        case cartConstants.REMOVE_FROM_CART:
            return Object.assign({}, state, { ...state, cart: state.cart.filter(c => c._id !== action.payload._id) });
        case cartConstants.REMOVE_ALL_FROM_CART:
            return Object.assign({}, state, { ...state, cart: [] });
        case cartConstants.GET_CART_FROM_STORAGE:
            const storage_cart = JSON.parse(localStorage.getItem("cart"));

            if (storage_cart.length > 0) {
                return Object.assign({}, state, { ...state, cart: [...storage_cart] })
            } else {
                return state;
            }
        default:
            return state;
    }
}

