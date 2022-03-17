import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Signup from "../pages/Signup";
import Wishlist from "../pages/Wishlist";
import { useCartContext } from "../context/cartContext/cartContext";
import { useWishlistContext } from "../context/wishlistContext/wishlistContext";
import Mockman from 'mockman-js';
export default function Header() {
  const {state}=useCartContext();
  const {state:wishlistState}=useWishlistContext();
  const {cartData}=state;
  const{wishlistData}=wishlistState;
  const cartItemsCount=cartData.length;
  const wishlistItemsCount=wishlistData.length;
  return (
    <Router>
      <header className="flex align-items-center header-wrapper">
        <div className="logo-wrapper">
          <Link to="/">Fluffy Tails</Link>
        </div>
        <nav className="nav-item-grp">
          <form className="navbar-search">
            <input type="text" placeholder="Search..." />
            <button className="borderless-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>
          <ul className="nav-list">
            <li className="no-bullets-li nav-list-item  mobile-logo-wrapper hide">
              <Link to="/">Fluffy Tails</Link>
            </li>
            <li className="no-bullets-li nav-list-item">
              <Link to="/products">
                <i className="fas fa-store"></i>
              </Link>
            </li>
            <li className="no-bullets-li nav-list-item relative">
              <Link to="/wishlist">
                <i className="far fa-heart"></i>
                {wishlistItemsCount>0&&<span className="status-badge badge-wth-number round-badge">{wishlistItemsCount}</span>}

              </Link>
            </li>
            <li className="no-bullets-li nav-list-item">
              <Link to="/login">
                <i className="far fa-user"></i>
              </Link>
            </li>
            <li className="no-bullets-li nav-list-item relative">
              <Link to="/cart" >
                <i className="fas fa-shopping-cart"></i>
                {cartItemsCount>0&&<span className="status-badge badge-wth-number round-badge">{cartItemsCount}</span>}
              </Link>
            </li>
          </ul>
          <div className="drawer-container hide" id="cart-drawer-container">
            <div className="drawer-wrapper">
              <div className="drawer cart-drawer" id="cart-drawer">
                <button
                  className="`borderless-btn fs-30 cart-close-btn"
                  id="close-cart"
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Home />} />
        <Route path="/mock" element={<Mockman />} />

      </Routes>
    </Router>
  );
}
