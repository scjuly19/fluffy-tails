import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Loader from "./loader";
import Mockman from "mockman-js";
import { Home, Cart, Wishlist, Products, Login, Signup } from "../pages/index";
import { useDataContext } from "../context/dataContext/dataContext";
import { RequireAuth } from "./RequireAuth";
import { useAuthContext } from "../context/authContext/authContext";
import useFilter from "../hooks/useFilter";
import { actionTypes } from "../context/dataContext/actionTypes";
export default function Header() {
  const { state: dataState, dispatch } = useDataContext();
  const { authed, loader } = useAuthContext();
  const { loading, cartData, wishlistData, searchParam } = dataState;
  const cartItemsCount = cartData.length > 0 ? cartData.length : null;
  const wishlistCount = wishlistData.length > 0 ? wishlistData.length : null;
  const handleSearchInput = (e) => {
    e.preventDefault();
    dispatch({ type: actionTypes.setSearchParam, payload: e.target.value });
  };
  return (
    <>
      {(loading || loader) && <Loader />}
      <Router>
        <header className="flex align-items-center header-wrapper">
          <div className="logo-wrapper">
            <Link to="/">Fluffy Tails</Link>
          </div>
          <nav className="nav-item-grp">
            <form className="navbar-search">
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchInput}
                value={searchParam}
              />
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

                  {wishlistCount && (
                    <span className="status-badge badge-wth-number round-badge">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>
              {!authed && (
                <li className="no-bullets-li nav-list-item">
                  <Link to="/login">
                    <i className="far fa-user"></i>
                  </Link>
                </li>
              )}
              <li className="no-bullets-li nav-list-item relative">
                <Link to="/cart">
                  <i className="fas fa-shopping-cart"></i>

                  {cartItemsCount && (
                    <span className="status-badge badge-wth-number round-badge">
                      {cartItemsCount}
                    </span>
                  )}
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
          <Route
            path="/wishlist"
            element={
              <RequireAuth>
                <Wishlist />
              </RequireAuth>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Home />} />
          <Route path="/mock" element={<Mockman />} />
        </Routes>
      </Router>
    </>
  );
}
