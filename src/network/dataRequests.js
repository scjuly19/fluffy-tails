import axios from "axios";
import { ENDPOINTS } from "./urls";
const { GET_ALL_PRODUCTS, GET_CART_ITEMS, GET_WISHLIST_ITEMS } = ENDPOINTS;
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
const quantityUpdate = async (productId, encodedToken, actionType) => {
  const url = `${GET_CART_ITEMS}/${productId}`;
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
};
const deleteFromCart = async (productId, encodedToken) => {
  const url = `${GET_CART_ITEMS}/${productId}`;
  return axios.delete(url, {
    headers: {
      authorization: encodedToken,
    },
  });
};

const getWishlist = async (encodedToken) => {
  return axios.get(GET_WISHLIST_ITEMS, {
    headers: {
      authorization: encodedToken,
    },
  });
};

const addToWishlist = async (product, encodedToken) => {
  return axios.post(
    GET_WISHLIST_ITEMS,
    { product },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
};

const removeFromWishlist = async (productId, encodedToken) => {
  const url = `${GET_WISHLIST_ITEMS}/${productId}`;
  return axios.delete(url, {
    headers: {
      authorization: encodedToken,
    },
  });
};
export {
  getProducts,
  getCart,
  addToCart,
  quantityUpdate,
  deleteFromCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
