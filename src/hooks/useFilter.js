import React, { useState, useEffect } from "react";
import { actionTypes } from "../context/dataContext/actionTypes";
import { useDataContext } from "../context/dataContext/dataContext";
import {
  handlePriceFilter,
  updatedFilters,
  handleCategoryFilter,
  handleSortByFilter,
  handleRatingFilter,
} from "../utils/filterUtils";

export default function useFilter() {
  const { state, dispatch } = useDataContext();
  const { productData, filters,searchParam } = state;
  const { priceFilter, categoryFilter, sortByFilter, ratings } = filters;
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(productData);
  }, [productData]);
  useEffect(() => {
    applyFilters();
  }, [priceFilter, categoryFilter, sortByFilter, ratings, searchParam]);

  //Price Filter
  const priceFilterChanged = (selectedItem) => {
    let updatedPriceFilter = updatedFilters(priceFilter, selectedItem);
    dispatch({
      type: actionTypes.setFilters,
      payload: { ...filters, priceFilter: updatedPriceFilter },
    });
  };

  //Category Filter
  const categoryFilterChanged = (selectedItem) => {
    const updatedCategoryFilter = updatedFilters(
      categoryFilter,
      selectedItem,
      true
    );
    dispatch({
      type: actionTypes.setFilters,
      payload: { ...filters, categoryFilter: updatedCategoryFilter },
    });
  };
  //Sort by Price Filter
  const sortByFilterChanged = (selectedItem) => {
    const updatedSortByFilters = updatedFilters(sortByFilter, selectedItem);
    dispatch({
      type: actionTypes.setFilters,
      payload: { ...filters, sortByFilter: updatedSortByFilters },
    });
  };
  //Ratings Filter
  const ratingFilterChanged = (selectedItem) => {
    const updatedRatingFilter = updatedFilters(ratings, selectedItem);
    dispatch({
      type: actionTypes.setFilters,
      payload: { ...filters, ratings: updatedRatingFilter },
    });
  };
  const filterArray = (array) => {
    return array.filter((item) => item.checked).map((item) => item.label);
  };
  const applyFilters = () => {
    let updatedList = [...productData];
    const priceRangeSelected = filterArray(priceFilter);
    const categorySelected = filterArray(categoryFilter);
    const sortByFilterSelected = filterArray(sortByFilter);
    const ratingSelected = filterArray(ratings);
    if (searchParam) {
      updatedList = updatedList.filter(
        (item) =>
          item.productName
            .toLowerCase()
            .search(searchParam.toLowerCase().trim()) !== -1
      );
    }
    if (categorySelected.length) {
      updatedList = handleCategoryFilter(updatedList, categorySelected);
    }
    if (sortByFilterSelected.length) {
      updatedList = handleSortByFilter(updatedList, sortByFilterSelected[0]);
    }
    if (ratingSelected.length) {
      updatedList = handleRatingFilter(updatedList, ratingSelected[0]);
    }
    if (priceRangeSelected.length) {
      updatedList = handlePriceFilter(updatedList, priceRangeSelected[0]);
    }
    setData(updatedList);
  };
  const clearFilterHandler = () => {
    let clearedFilters = {};
    for (let key in filters) {
      clearedFilters[key] = filters[key].map((item) => {
        item.checked = false;
        return item;
      });
    }
    dispatch({ type: actionTypes.clearFilters, payload: clearedFilters });
  };
  return {
    data,
    priceFilterChanged,
    categoryFilterChanged,
    sortByFilterChanged,
    ratingFilterChanged,
    clearFilterHandler,
  };
}
