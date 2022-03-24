import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getProducts, getCart } from "../../network";
import { useAuthContext } from "../authContext/authContext";
import { actionTypes } from "./actionTypes";
import { dataReducer } from "./dataReducer";
export const INITIAL_STATE = {
  productData: [],
  cartData: []
};

const DataContext = createContext();
const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE);
  const { token } = useAuthContext();
  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: actionTypes.fetchData });
      try {
        const { data } = await getProducts();
        if (token) {
          const { data: cartData } = await getCart(token);
          dispatch({
            type: actionTypes.setCartData,
            payload: cartData.cart,
          });
        }
        if (!didCancel) {
          dispatch({ type: actionTypes.fetchSuccess });
          dispatch({
            type: actionTypes.setProductData,
            payload: data.products,
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: actionTypes.fetchFailed, payload: error });
        }
      }
    };
    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  const providerValue = { state, dispatch };
  return (
    <DataContext.Provider value={providerValue}>
      {children}
    </DataContext.Provider>
  );
};
export { useDataContext, DataProvider };
