import React, { useState,useEffect } from "react";
import Card from "../components/Card";
import { useDataContext } from "../context/dataContext/dataContext";



export  function Home() {
  const {state}=useDataContext();
  const {productData}=state;
  const bestsellers = productData.slice(-5);

  const handleAddToCart = (selectedItem) => {
    return () => {
      const newData = data.map((item) => {
        if (item.id === selectedItem.id) {
          item.addedToCart = true;
        } else {
          item.addedToCart = false;
        }
        return item;
      });
      setData(newData);
      addToCart({ ...selectedItem, quantity: 1 });
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
            key={item.id}
            // onAddToCartClick={handleAddToCart(item)}
            // onWishlistClick={handleAddWishlist(item)}
          />
        ))}
      </section>
    </main>
  );
}
