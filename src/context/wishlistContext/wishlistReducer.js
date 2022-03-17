import { actionTypes } from "./actionTypes";

const WishlistReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.addItem:
      return {
        ...state,
        wishlistData: [...state.wishlistData, action.payload],
      };
    case actionTypes.removeItem:
      return {
        ...state,
        wishlistData: state.wishlistData.filter((item) => item.id !== action.payload),
      };
    case actionTypes.updateData:
      return { ...state, wishlistData: action.payload };
    default:
      return state;
  }
};
export default WishlistReducer;