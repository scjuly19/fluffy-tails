import { actionTypes } from "./actionTypes";

const CartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.addItem:
      return {
        ...state,
        cartData: [...state.cartData, action.payload],
      };
    case actionTypes.removeItem:
      return {
        ...state,
        cartData: state.cartData.filter((item) => item.id != action.payload),
      };
    case actionTypes.updateCart:
      return {
        ...state,
        cartData: action.payload
      };
    default:
      return state;
  }
};
export default CartReducer;
