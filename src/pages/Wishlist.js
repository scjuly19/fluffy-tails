import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/wishlist.css";
import Card from "../components/Card";
import { useWishlistContext } from "../context/wishlistContext/wishlistContext";
import { useCartContext } from "../context/cartContext/cartContext";
export default function Wishlist() {
  const {state,removeFromWishlist}=useWishlistContext();
  const {wishlistData}=state;

  const { addToCart } = useCartContext();
  const[data,setData]=useState(wishlistData)

  const handleAddToCart = (selectedItem) => {
    return () => {
      const newData = wishlistData.map((item) => {
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
  const handleRemoveWishlist=selectedItemId=>{
return ()=>{
  removeFromWishlist(selectedItemId)
}
  }
  return (
    <main>
      <div className="content-wrapper column">
        {data.length>0&&<h3 className="text-center">
          My Wishlist <span className="light-txt">{`(${wishlistData.length})`}</span>
        </h3>}
        {data.length>0?
        <section id="wishlist" className="wishlist-wrapper">
        {data.map(item=><Card item={item} key={item.id} isWishlist={true} onWishlistClick={handleRemoveWishlist(item.id)}               onAddToCartClick={handleAddToCart(item)}
/>)}
        </section>
        :
        <div className="flex-center column mt-16">
            <img src="images/wishlist_empty.png" alt="empty wishlist" loading="lazy" />
            <h4>Oops! Your wishlist is empty</h4>
            <p>Start wishlisting your favorites right now!</p>
            <Link className="btn outline-btn ml-8 uppercase" to="/products">
              Start Wishlisting
            </Link>
          </div>
}
      </div>
    </main>
  );
}
