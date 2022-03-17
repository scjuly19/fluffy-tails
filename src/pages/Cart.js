import React from "react";
import "../styles/cart.css";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cartContext/cartContext";

const CartRow = ({
  price,
  productName,
  quantity,
  image,
  id,
  onIncrementClick,
  onDecrementClick,
  onRemoveClick
}) => {
  const totalPrice = quantity * price;
  const incrementQuantity = () => onIncrementClick(id);
  const decrementQuantity = () => onDecrementClick(id);
  const removeItem=()=>onRemoveClick(id);
  return (
    <div className="flex cart-item-wrapper ">
      <div>
        <img src={image} className="small-img" />
      </div>
      <div className="px-8 wrap flex-1">
        <p className="text-center uppercase">{productName}</p>
      </div>
      <div className="flex ml-16 item-details flex-2">
        <div className="flx-1 text-center">
          <p>{`Rs.${price}/-`}</p>
        </div>
        <div className="flex justify-center align-items-center column ml-16 cart-item-quantity">
          <div className="flex justify-center align-items-center">
            <button className="cart-quantity-btn" onClick={decrementQuantity}>
              <i className="fa fa-minus"></i>
            </button>
            <p className="bold">{quantity}</p>
            <button className="cart-quantity-btn" onClick={incrementQuantity}>
              <i className="fa fa-plus"></i>
            </button>
          </div>
          <button className="text-center borderless-btn text-underline uppercase" onClick={removeItem}>
            Remove
          </button>
        </div>
        <div className="flx-1 text-right item-total ">
          <p>{`Rs.${totalPrice}/-`}</p>
        </div>
      </div>
    </div>
  );
};

const CartHeader = () => {
  return (
    <div className="flex cart-header">
      <div className="flx-1"></div>
      <div className="flx-1"></div>
      <div className="flex flx-1 justify-between align-end">
        <div>
          <p className="uppercase">Price</p>
        </div>
        <div>
          <p className="uppercase">Quantity</p>
        </div>
        <div>
          <p className="uppercase">Total</p>
        </div>
      </div>
    </div>
  );
};
const CartTotal = ({ cartTotal }) => {
  return (
    <div className="align-end flex column mt-16 flex cart-total-wrapper">
      <p className="m-0 uppercase">Total</p>
      <p className="m-0 bold fs-30">{`Rs.${cartTotal}/-`}</p>
      <p>Shipping & taxes calculated at checkout</p>
      <div className="flex align-items-center cart-total-actions">
        <Link to="/products" className="text-underline">
          CONTINUE SHOPPING
        </Link>
        <button className="btn primary-btn uppercase ml-8">Checkout</button>
      </div>
    </div>
  );
};
export default function Cart() {
  const { state, removeFromCart, updateCart } = useCartContext();
  const { cartData } = state;
  const cartTotal = cartData.reduce((acc, item) => acc + (item.price*item.quantity), 0);
  const handleDecrement = (selectedItemId) => {
    let updatedCartData = cartData.map((item) => {
      if (item.id === selectedItemId && item.quantity>1) {
        item.quantity -= 1;
      }
      return item;
    });
    updateCart(updatedCartData);
  };
  const handleIncrement = (selectedItemId) => {
    const updatedCartData = cartData.map((item) => {
      if (item.id === selectedItemId) {
        item.quantity += 1;
      }
      return item;
    });
    updateCart(updatedCartData);
  };
  const handleRemoveItem=(selectedItemId)=>removeFromCart(selectedItemId)
  return (
    <main>
      <div className="content-wrapper column">
        {cartData.length > 0 && (
          <h3 className="text-center">
            My Cart <span className="light-txt">{`(${cartData.length})`}</span>
          </h3>
        )}
        {cartData.length > 0 ? (
          <section id="cart" className="cart-wrapper">
            <CartHeader />
            {cartData.map((item) => (
              <CartRow
                {...item}
                key={item.id}
                onDecrementClick={handleDecrement}
                onIncrementClick={handleIncrement}
                onRemoveClick={handleRemoveItem}
              />
            ))}
            <CartTotal cartTotal={cartTotal} />
          </section>
        ) : (
          <div className="flex-center column mt-16">
            <img src="images/empty-cart.png" alt="empty cart" loading="lazy" />
            <h4>Hey, it feels so light!</h4>
            <p>Let's add some items in your cart.</p>
            <Link className="btn outline-btn ml-8 uppercase" to="/products">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
