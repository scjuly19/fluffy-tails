import React, { useState,useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useCartContext } from "../context/cartContext/cartContext";
import { useWishlistContext } from "../context/wishlistContext/wishlistContext";
import PRODUCTS from "../mock/products.json";

export default function Home() {
  const { addToCart } = useCartContext();
  const bestsellers = JSON.parse(JSON.stringify(PRODUCTS.slice(-5)));
  const [data, setData] = useState([...bestsellers]);
  const {addToWishlist,removeFromWishlist}=useWishlistContext();
useEffect(()=>{
  axios.get('/api/products')
  .then(function (response) {
    // handle success
    console.log(response)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

},[])
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
        {data.map((item) => (
          <Card
            item={item}
            key={item.id}
            onAddToCartClick={handleAddToCart(item)}
            onWishlistClick={handleAddWishlist(item)}
          />
        ))}
      </section>
    </main>
  );
}
