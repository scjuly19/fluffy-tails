import { actionTypes } from "./actionTypes";

export const dataReducer = ( state, action ) => {
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
        productData: action.payload,
      };
    default:
      return state;
  }
};