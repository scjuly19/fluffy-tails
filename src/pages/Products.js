import React from "react";
import "../styles/products.css";
import Card from "../components/Card";

import { useDataContext } from "../context/dataContext/dataContext";
import { addToCartHandler } from "../utils/cartUtils";
import { useAuthContext } from "../context/authContext/authContext";
import { actionTypes } from "../context/dataContext/actionTypes";

export function Products() {
  const { state, dispatch } = useDataContext();
  const { token } = useAuthContext();
  const { productData } = state;
  const handleAddToCart = (selectedItem) => {
    return () => {
      const { _id, productName, price, image } = selectedItem;
      const addItemObj = {
        _id,
        productName,
        price,
        image
      };
      addToCartHandler(dispatch, addItemObj, token);
      let newData = productData.map((item) => {
        if (item._id === selectedItem._id) {
          item.addedToCart = true;
        } else {
          item.addedToCart = false;
        }
        return item;
      });
      dispatch({ type: actionTypes.setProductData, payload: newData });
    };
  };
  const handleAddWishlist = (selectedItem) => {
    return () => {};
  };
  return (
    <main>
      <button
        className="borderless-btn uppercase bold btn hide filter-btn primary-txt"
        id="open-filter-menu"
      >
        Filters
      </button>
      <div className="drawer-container hide" id="filter-menu">
        <div className="drawer-wrapper">
          <div className="drawer" id="filter-drawer">
            <button
              className="`borderless-btn fs-30 drawer-close-btn"
              id="close-filter-menu"
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <button className="borderless-btn bold text-left">Clear All</button>
            <section id="price">
              <h6>Price</h6>
              <ul className="price-list">
                <li className="no-bullets-li">
                  <input
                    type="checkbox"
                    id="price1"
                    name="price1"
                    value="Rs.199 to Rs.299"
                  />
                  <label htmlFor="price1">Rs.199 to Rs.399</label>
                </li>
                <li className="no-bullets-li mt-8">
                  <input
                    type="checkbox"
                    id="price2"
                    name="price2"
                    value="Rs.399 to Rs.599"
                  />
                  <label htmlFor="price2">Rs.399 to Rs.599</label>
                </li>
                <li className="no-bullets-li mt-8">
                  <input
                    type="checkbox"
                    id="price3"
                    name="price3"
                    value="Above Rs.599"
                  />
                  <label htmlFor="price3">Above Rs. 599</label>
                </li>
              </ul>
            </section>
            <section id="category">
              <h6>Category</h6>
              <ul className="category-list">
                <li className="no-bullets-li">
                  <input
                    type="checkbox"
                    id="category1"
                    name="category1"
                    value="Food"
                  />
                  <label htmlFor="category1">Food</label>
                </li>
                <li className="no-bullets-li mt-8">
                  <input
                    type="checkbox"
                    id="category2"
                    name="category2"
                    value="Clothes"
                  />
                  <label htmlFor="category2">Clothes</label>
                </li>
                <li className="no-bullets-li mt-8">
                  <input
                    type="checkbox"
                    id="category3"
                    name="category3"
                    value="Toys"
                  />
                  <label htmlFor="category3">Toys</label>
                </li>
              </ul>
            </section>
            <section id="sort-by">
              <h6>Sort by</h6>
              <ul className="sort-by-list">
                <li className="no-bullets-li">
                  <input
                    type="checkbox"
                    id="lowToHigh"
                    name="lowToHigh"
                    value="lowToHigh"
                  />
                  <label htmlFor="lowToHigh">Price- Low to High</label>
                </li>
                <li className="no-bullets-li mt-8">
                  <input
                    type="checkbox"
                    id="highToLow"
                    name="highToLow"
                    value="highToLow"
                  />
                  <label htmlFor="highToLow">Price- High to Low</label>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <nav className="side-nav-container">
          <button className="borderless-btn bold  text-underline clear-btn primary-txt">
            Clear All
          </button>
          <section id="price">
            <h6>Price</h6>
            <ul className="price-list">
              <li className="no-bullets-li">
                <input
                  type="checkbox"
                  id="price1"
                  name="price1"
                  value="Rs.199 to Rs.299"
                />
                <label htmlFor="price1">Rs.199 to Rs.399</label>
              </li>
              <li className="no-bullets-li mt-8">
                <input
                  type="checkbox"
                  id="price2"
                  name="price2"
                  value="Rs.399 to Rs.599"
                />
                <label htmlFor="price2">Rs.399 to Rs.599</label>
              </li>
              <li className="no-bullets-li mt-8">
                <input
                  type="checkbox"
                  id="price3"
                  name="price3"
                  value="Above Rs.599"
                />
                <label htmlFor="price3">Above Rs. 599</label>
              </li>
            </ul>
          </section>
          <section id="category">
            <h6>Category</h6>
            <ul className="category-list">
              <li className="no-bullets-li">
                <input
                  type="checkbox"
                  id="category1"
                  name="category1"
                  value="Food"
                />
                <label htmlFor="category1">Food</label>
              </li>
              <li className="no-bullets-li mt-8">
                <input
                  type="checkbox"
                  id="category2"
                  name="category2"
                  value="Clothes"
                />
                <label htmlFor="category2">Clothes</label>
              </li>
              <li className="no-bullets-li mt-8">
                <input
                  type="checkbox"
                  id="category3"
                  name="category3"
                  value="Toys"
                />
                <label htmlFor="category3">Toys</label>
              </li>
            </ul>
          </section>
          <section id="sort-by">
            <h6>Sort by</h6>
            <ul className="sort-by-list">
              <li className="no-bullets-li">
                <input
                  type="checkbox"
                  id="lowToHigh"
                  name="lowToHigh"
                  value="lowToHigh"
                />
                <label htmlFor="lowToHigh">Price- Low to High</label>
              </li>
              <li className="no-bullets-li mt-8">
                <input
                  type="checkbox"
                  id="highToLow"
                  name="highToLow"
                  value="highToLow"
                />
                <label htmlFor="highToLow">Price- High to Low</label>
              </li>
            </ul>
          </section>
        </nav>
        <section
          id="products"
          className="products-list product-content-wrapper"
        >
          {productData.map((item) => (
            <Card
              item={item}
              key={item._id}
              onAddToCartClick={handleAddToCart(item)}
              // onWishlistClick={handleAddWishlist(item)}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
