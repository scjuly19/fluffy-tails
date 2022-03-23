import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useAuthContext } from "../context/authContext/authContext";
import { useDataContext } from "../context/dataContext/dataContext";
import { addToCartClickHandler } from "../utils/cartUtils";

export function Home() {
  const { state, dispatch } = useDataContext();
  const { productData } = state;
  const bestsellers = productData.slice(-5);
  const { token } = useAuthContext();
  const handleAddToCart = (selectedItem) => {
    return () => {
      addToCartClickHandler(selectedItem,dispatch,token,productData)

    };
  };
  const handleAddWishlist = (selectedItem) => {
    return () => {
      const newData = PRODUCTS.map((item) => {
        if (item.id === selectedItem.id) {
          if (item.hasOwnProperty("addedToWishlist") && item.addedToWishlist) {
            item.addedToWishlist = false;
            removeFromWishlist(selectedItem.id);
          } else {
            item.addedToWishlist = true;
            addToWishlist(selectedItem);
          }
        }
        return item;
      });
      setData(newData.slice(-5));
    };
  };
  return (
    <main>
      <div className="hero-image-wrapper">
        <img
          src="images/hero.png"
          alt="banner"
          className="responsive-img"
          loading="lazy"
        />
      </div>
      <p className="text-center px-8">
        Give them all the love they deserve and pamper them with tasty treats.
        <span>😋</span>
      </p>
      <section id="products" className="products-list">
        {bestsellers.map((item) => (
          <Card
            item={item}
            key={item._id}
            onAddToCartClick={handleAddToCart(item)}
            // onWishlistClick={handleAddWishlist(item)}
          />
        ))}
      </section>
    </main>
  );
}
