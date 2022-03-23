import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getProducts } from "../../network";
import { actionTypes } from "./actionTypes";
import { dataReducer } from "./dataReducer";
export const INITIAL_STATE = {
  productData: [],
};
const DataContext = createContext();
const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE);
  useEffect(() => {
    const fetchData = async () => {
      let didCancel = false;

      dispatch({ type: actionTypes.fetchData });
      try {
        const { data } = await getProducts();
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
