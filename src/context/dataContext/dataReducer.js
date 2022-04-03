import { actionTypes } from "./actionTypes";

export const dataReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.fetchData:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.fetchSuccess:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.fetchFailed:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.setProductData:
      return {
        ...state,
        productData: [...action.payload],
      };
    case actionTypes.setCartData:
      return {
        ...state,
        cartData: action.payload,
      };
    case actionTypes.setWishlistData:
      return {
        ...state,
        wishlistData: action.payload,
      };
    case actionTypes.setFilters:
      return {
        ...state,
        filters: action.payload,
      };
    case actionTypes.clearFilters:
      return {
        ...state,
        filters: action.payload,
      };
    case actionTypes.setSearchParam:
      return {
        ...state,
        searchParam: action.payload,
      };
    default:
      return state;
  }
};
