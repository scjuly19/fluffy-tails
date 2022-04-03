import React from "react";
import { Link } from "react-router-dom";

import "../styles/wishlist.css";
import Card from "../components/Card";
import { useDataContext } from "../context/dataContext/dataContext";
import { useAuthContext } from "../context/authContext/authContext";
import { addToCartClickHandler } from "../utils/cartUtils";
import { actionTypes } from "../context/dataContext/actionTypes";
import { removeFromWishlistClickHandler } from "../utils/wishlistUtils";


export function Wishlist() {
  const { state, dispatch } = useDataContext();
  const { token } = useAuthContext();
  const { wishlistData, productData } = state;
  const handleAddToCart = (selectedItem) => {
    return () => {
      addToCartClickHandler(selectedItem, dispatch, token, productData);
      const updatedWishlistData = wishlistData.map((item) => {
        if (item._id === selectedItem._id) {
          item.addedToCart = true;
        } else {
          item.addedToCart = false;
        }
        return item;
      });
      dispatch({
        type: actionTypes.setWishlistData,
        payload: updatedWishlistData,
      });
    };
  };
  const handleRemoveWishlist = (selectedItemId) => {
    return () => {
      removeFromWishlistClickHandler(
        selectedItemId,
        token,
        productData,
        dispatch
      );
    };
  };
  return (
    <main>
      <div className="content-wrapper column">
        {wishlistData.length > 0 && (
          <h3 className="text-center">
            My Wishlist{" "}
            <span className="light-txt">{`(${wishlistData.length})`}</span>
          </h3>
        )}
        {wishlistData.length > 0 ? (
          <section id="wishlist" className="wishlist-wrapper">
            {wishlistData.map((item) => (
              <Card
                item={item}
                key={item._id}
                isWishlist={true}
                onWishlistClick={handleRemoveWishlist(item._id)}
                onAddToCartClick={handleAddToCart(item)}
              />
            ))}
          </section>
        ) : (
          <div className="flex-center column mt-16">
            <img
              src="images/wishlist_empty.png"
              alt="empty wishlist"
              loading="lazy"
            />
            <h4>Oops! Your wishlist is empty</h4>
            <p>Start wishlisting your favorites right now!</p>
            <Link className="btn outline-btn ml-8 uppercase" to="/products">
              Start Wishlisting
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
