import { productConstants } from "../constants";

const initialState = {
    products: [],
    sortedProducts: [],
    product: {},
    randomProduct: {},
    otherProducts: []
}

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case productConstants.GET_PRODUCTS:
            return Object.assign({}, state, { ...state, products: action.payload });
        case productConstants.GET_PRODUCTS_BY_CATEGORY_NAME:
            return Object.assign({}, state, { ...state, sortedProducts: action.payload });
        case productConstants.GET_PRODUCT:
            return Object.assign({}, state, { ...state, product: action.payload });
        case productConstants.GET_RANDOM_PRODUCT:
            return Object.assign({}, state, { ...state, randomProduct: action.payload });
        case productConstants.GET_OTHER_PRODUCTS:
            return Object.assign({}, state, { ...state, otherProducts: action.payload });
        case productConstants.CREATE_PRODUCT:
            return Object.assign({}, state, { ...state, products: [...state.products, action.payload] });
        default:
            return state;
    }
}