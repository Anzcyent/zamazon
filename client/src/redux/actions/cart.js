import { cartConstants, alertConstants } from "../constants"

const storage_control = () => {
  let cart;

  if (localStorage.getItem("cart") === null) {
    cart = [];
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  return cart;
}

export const add_to_cart = (product, quantity) => (dispatch) => {
  try {
    dispatch({ type: alertConstants.LOADING });

    let cart = storage_control();

    cart.push({ ...product, quantity });

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({ type: cartConstants.ADD_TO_CART, payload: { ...product, quantity } });

    dispatch({ type: alertConstants.SUCCESS, payload: `"${product.title.substring(0, 20)}..." has been added to cart.` });
  } catch (err) {
    throw new Error(err);
  }
}

export const remove_from_cart = (product) => (dispatch) => {
  try {
    dispatch({ type: alertConstants.LOADING });

    let cart = storage_control();

    const newCart = cart.filter(c => c._id !== product._id);

    localStorage.setItem("cart", JSON.stringify(newCart));

    dispatch({ type: cartConstants.REMOVE_FROM_CART, payload: product });

    dispatch({ type: alertConstants.SUCCESS, payload: `"${product.title.substring(0, 20)}" has been removed from cart.` });

  } catch (err) {
    throw new Error(err);
  }
}

export const remove_all_from_cart = () => (dispatch) => {
  try {
    localStorage.removeItem("cart");

    const cart = [];

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({ type: cartConstants.REMOVE_ALL_FROM_CART });
  } catch (err) {
    throw new Error(err);
  }
}

export const get_cart_from_storage = () => (dispatch) => {
  try {
    dispatch({ type: cartConstants.GET_CART_FROM_STORAGE });
  } catch (err) {
    throw new Error(err);
  }
}

