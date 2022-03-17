import { createContext, useContext, useReducer } from "react";
import CartReducer from "./cartReducer";
import {actionTypes} from './actionTypes';

const CartContext = createContext();
const intitalState = {
  cartData: [],
};

const useCartContext = () => useContext(CartContext);

const useCart = () => {
  const [state, dispatch] = useReducer(CartReducer, intitalState);
  const addToCart = (payload) =>
    dispatch({ type: actionTypes.addItem, payload });
  const removeFromCart = (payload) =>
    dispatch({ type: actionTypes.removeItem, payload });
  const updateCart = (payload) =>
    dispatch({ type: actionTypes.updateCart, payload });

  return [state, addToCart, removeFromCart, updateCart];
};

const CartProvider = ({ children }) => {
  const [state, addToCart, removeFromCart, updateCart] = useCart();
  const value = { state, addToCart, removeFromCart, updateCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { useCartContext, CartProvider };
