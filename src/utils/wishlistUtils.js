import { actionTypes } from "../context/dataContext/actionTypes";
import { addToWishlist,removeFromWishlist } from "../network";

const addToWishlistHandler = async (dispatch, product, token) => {
  dispatch({ type: actionTypes.fetchData });
  try {
    const { data } = await addToWishlist(product, token);
    dispatch({ type: actionTypes.setWishlistData, payload: data.wishlist });
    dispatch({ type: actionTypes.fetchSuccess });
  } catch (error) {
    dispatch({ type: actionTypes.fetchFailed });
  }
};
const addToWishlistClickHandler = (
  selectedItem,
  dispatch,
  token,
  productData
) => {
  const { _id, productName, price, image } = selectedItem;
  const addItemObj = {
    _id,
    productName,
    price,
    image,
  };
  addToWishlistHandler(dispatch, addItemObj, token);
  const newData = productData.map((item) => {
    if (item._id === selectedItem._id) {
      item.addedToWishlist = true;
    }
    return item;
  });
  dispatch({ type: actionTypes.setProductData, payload: newData });
};
const removeFromWishlistHandler = async (dispatch, productId, token) => {
  dispatch({ type: actionTypes.fetchData });
  try {
    const { data } = await removeFromWishlist(productId, token);
    dispatch({ type: actionTypes.setWishlistData, payload: data.wishlist });
    dispatch({ type: actionTypes.fetchSuccess });
  } catch (error) {
    dispatch({ type: actionTypes.fetchFailed });
  }
};

const removeFromWishlistClickHandler = (id, token, productData, dispatch) => {
  removeFromWishlistHandler(dispatch, id, token);
  const newData = productData.map((item) => {
    if (item._id === id) {
      item.addedToWishlist = false;
    }
    return item;
  });
  dispatch({ type: actionTypes.setProductData, payload: newData });
};
export { addToWishlistClickHandler, removeFromWishlistClickHandler };
