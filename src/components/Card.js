import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  const { price, productName, image, addedToCart,addedToWishlist } = props.item;
  const { isWishlist, onAddToCartClick, onWishlistClick } = props;

  return (
    <div className="card card-vertical products-list-item">
      <div className="card-media">
        <img
          src={image}
          className="responsive-img"
          loading="lazy"
          alt={productName}
        />
      </div>
      <div className="card-description-wrapper">
        <div className="card-primary">
          <p className="uppercase">{productName}</p>
          <p className="card-primary-subtitle">{`Rs.${price}/-`}</p>
        </div>
        <div className="card-actions">
          {addedToCart?<Link
            className="btn 
               outline-btn
             uppercase"
            to="/cart"
          >
             Go to cart
          </Link>:<button
            className="btn 
               primary-btn
             uppercase"
            onClick={onAddToCartClick}
          >
             Add to cart
          </button>
}
        </div>
        <button
          className="borderless-btn ml-8 wishlist-btn"
          onClick={onWishlistClick}
        >
          {!isWishlist ? (
            addedToWishlist ? <i className="fa fa-heart fa-lg" aria-hidden="true"></i>
:            <i className="far fa-heart fa-lg"></i>
          
          ) : (
            <i className="fa fa-minus-square-o fa-lg"></i>
          )}
        </button>
      </div>
    </div>
  );
}
