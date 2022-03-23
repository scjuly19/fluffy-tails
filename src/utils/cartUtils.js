import { actionTypes } from "../context/dataContext/actionTypes";
import { addToCart, deleteFromCart, quantityUpdate } from "../network";

const addToCartHandler = async (dispatch, product, token) => {
  dispatch({ type: actionTypes.fetchData });
  try {
    const { data } = await addToCart(product, token);
    dispatch({ type: actionTypes.setCartData, payload: data.cart });
    dispatch({ type: actionTypes.fetchSuccess });
  } catch (error) {
    dispatch({ type: actionTypes.fetchFailed });
  }
};
const quantityUpdateHandler = async (dispatch, productId, token, actionType) => {
  dispatch({ type: actionTypes.fetchData });
  try {
    const { data } = await quantityUpdate(productId, token, actionType);
    dispatch({ type: actionTypes.setCartData, payload: data.cart });
    dispatch({ type: actionTypes.fetchSuccess });
  } catch (error) {
    dispatch({ type: actionTypes.fetchFailed });
  }
};
const removeItemHandler=async(dispatch,productId,token)=>{
  dispatch({ type: actionTypes.fetchData });
  try {
    const { data } = await deleteFromCart(productId, token);
    dispatch({ type: actionTypes.setCartData, payload: data.cart });
    dispatch({ type: actionTypes.fetchSuccess });
  } catch (error) {
    dispatch({ type: actionTypes.fetchFailed });
  }
}
export { addToCartHandler, quantityUpdateHandler,removeItemHandler };
