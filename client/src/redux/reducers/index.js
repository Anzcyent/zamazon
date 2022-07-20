import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import category from "./category";
import product from "./product";
import cart from "./cart";
import comment from "./comment";
import user from "./user";
import order from "./order";
import search from "./search";

const rootReducer = combineReducers({
    auth,
    alert,
    category,
    product,
    cart,
    comment,
    user,
    order,
    search
});

export default rootReducer;