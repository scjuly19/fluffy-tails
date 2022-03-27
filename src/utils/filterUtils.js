import { pricefilterTypes } from "../constants/filters";

const updatedFilters = (filters, selectedFilter, isCategory) => {
  const updatedFilter = filters.map((item) => {
    if (item.id === selectedFilter.id) {
      item.checked = !item.checked;
    } else {
      if (!isCategory) {
        item.checked = false;
      }
    }
    return item;
  });
  return updatedFilter;
};
const handlePriceFilter = (data, priceRange) => {
  switch (priceRange) {
    case pricefilterTypes.Upto399:
      return data.filter((item) => item.price >= 199 && item.price <= 399);
    case pricefilterTypes.Upto599:
      return data.filter((item) => item.price >= 399 && item.price <= 599);
    case pricefilterTypes.Above599:
      return data.filter((item) => item.price > 599);
    default:
      return data;
  }
};
const handleCategoryFilter = (data, categories) =>
  data.filter((item) => categories.includes(item.category));

const handleSortByFilter = (data, sortBy) => {
  switch (sortBy) {
    case "lowToHigh":
      return data.sort((a, b) => a.price - b.price);
    case "highToLow":
      return data.sort((a, b) => b.price - a.price);
    default:
      return data;
  }
};
const handleRatingFilter = (data, selectedRating) => {
  return data.filter((item) => item.rating === parseInt(selectedRating));
};
export {
  handlePriceFilter,
  updatedFilters,
  handleCategoryFilter,
  handleSortByFilter,
  handleRatingFilter,
};
