import React, { useState, useEffect } from "react";
import "../styles/products.css";
import Card from "../components/Card";

import { useDataContext } from "../context/dataContext/dataContext";
import { useAuthContext } from "../context/authContext/authContext";
import { addToCartClickHandler } from "../utils/cartUtils";
import {
  addToWishlistClickHandler,
  removeFromWishlistClickHandler,
} from "../utils/wishlistUtils";
import Filter from "../components/Filter";
import useFilter from "../hooks/useFilter";
import {
  priceFilter,
  categoryFilter,
  sortByFilter,
  ratings,
} from "../constants/filters";
import { actionTypes } from "../context/dataContext/actionTypes";

export function Products() {
  const { state, dispatch } = useDataContext();
  const { token } = useAuthContext();
  const { productData } = state;
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const {
    data,
    priceFilterChanged,
    categoryFilterChanged,
    sortByFilterChanged,
    ratingFilterChanged,
    clearFilterHandler
  } = useFilter();
  const handleAddToCart = (selectedItem) => {
    return () => {
      addToCartClickHandler(selectedItem, dispatch, token, productData);
    };
  };
  const handleAddWishlist = (selectedItem) => {
    return () => {
      if (
        selectedItem.hasOwnProperty("addedToWishlist") &&
        selectedItem.addedToWishlist
      ) {
        removeFromWishlistClickHandler(
          selectedItem._id,
          token,
          productData,
          dispatch
        );
      } else {
        addToWishlistClickHandler(selectedItem, dispatch, token, productData);
      }
    };
  };
  const toggleDrawer = () => setDrawerVisible(!isDrawerVisible);
  const handlePriceFilter = (selectedItem) => {
    return () => priceFilterChanged(selectedItem);
  };
  const handleCategoryFilter = (selectedItem) => {
    return () => categoryFilterChanged(selectedItem);
  };
  const handleSortFilter = (selectedItem) => {
    return () => {
      sortByFilterChanged(selectedItem);
    };
  };
  const handleRatingFilter = (selectedItem) => {
    return () => {
      ratingFilterChanged(selectedItem);
    };
  };
  const handleClearFilters = () => {
    clearFilterHandler()
  };
  const showData = data.length > 0;
  return (
    <main>
      <button
        className="borderless-btn uppercase bold btn hide filter-btn primary-txt"
        id="open-filter-menu"
        onClick={toggleDrawer}
      >
        Filters
      </button>
      <div
        className={`drawer-container ${isDrawerVisible ? "show" : "hide"}`}
        id="filter-menu"
      >
        <div className="drawer-wrapper">
          <div className="drawer" id="filter-drawer">
            <Filter
              isDrawer
              onCloseClicked={toggleDrawer}
              onPriceFilterClick={handlePriceFilter}
              onCategoryFilterChanged={handleCategoryFilter}
              onSortFilterChange={handleSortFilter}
              onRatingFilterChange={handleRatingFilter}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <nav className="side-nav-container">
          <Filter
            onPriceFilterClick={handlePriceFilter}
            onCategoryFilterChanged={handleCategoryFilter}
            onSortFilterChange={handleSortFilter}
            onRatingFilterChange={handleRatingFilter}
            onClearFilters={handleClearFilters}
          />
        </nav>
        {showData ? (
          <section
            id="products"
            className="products-list product-content-wrapper"
          >
            {data.map((item) => (
              <Card
                item={item}
                key={item._id}
                onAddToCartClick={handleAddToCart(item)}
                onWishlistClick={handleAddWishlist(item)}
              />
            ))}
          </section>
        ) : (
          <div className="no-data-wrapper mt-16">
            <div>
              <img src="images/no-data.png" />
              <p className="text-center bold">Sorry! No records found</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
