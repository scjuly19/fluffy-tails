import axios from "axios";
import { ENDPOINTS } from "./urls";
const { GET_ALL_PRODUCTS, GET_CART_ITEMS } = ENDPOINTS;
const getProducts = async () => axios.get(GET_ALL_PRODUCTS);
const getCart = async (encodedToken) =>
  axios.get(GET_CART_ITEMS, {
    headers: {
      authorization: encodedToken,
    },
  });
const addToCart = async (product, encodedToken) =>
  axios.post(
    GET_CART_ITEMS,
    { product },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
const quantityUpdate = async (productId, encodedToken,actionType) =>{
  let url=GET_CART_ITEMS + "/" + productId
  return axios.post(
    url,
    {
      action: {
        type: actionType,
      },
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
  }
const deleteFromCart=async(productId,encodedToken)=>{
  let url=GET_CART_ITEMS + "/" + productId;
  return axios.delete(url,{
    headers: {
      authorization: encodedToken,
    }
  })
}
export { getProducts, getCart, addToCart, quantityUpdate,deleteFromCart };
