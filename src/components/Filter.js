import React from "react";
import { useDataContext } from "../context/dataContext/dataContext";
const RadioButton = ({ id, label, value, onChange,checked }) => {
  return (
    <>
      <input
        type="radio"
        id={id}
        name={label}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={label}>{value}</label>
    </>
  );
};
const Checkbox = ({ id, name, value, checked, onChange }) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{name}</label>
    </>
  );
};
export default function Filter(props) {
  const {
    isDrawer,
    onCloseClicked,
    onPriceFilterClick,
    onCategoryFilterChanged,
    onSortFilterChange,
    onRatingFilterChange,
    onClearFilters
  } = props;
  const { state } = useDataContext();
  const { filters } = state;
  const { priceFilter, categoryFilter, sortByFilter,ratings } = filters;
  return (
    <div>
      {isDrawer && (
        <button
          className="`borderless-btn fs-30 drawer-close-btn"
          id="close-filter-menu"
          onClick={onCloseClicked}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      )}
      <button className="borderless-btn bold text-left text-underline primary-txt" onClick={onClearFilters}>
        Clear All
      </button>
      <form>
        <section id="price">
          <h6>Price</h6>
          <ul className="price-list">
            {priceFilter.map((item) => (
              <li className="no-bullets-li" key={item.id}>
                <Checkbox
                  name={item.label}
                  id={item.id}
                  checked={item.checked}
                  value={item.label}
                  onChange={onPriceFilterClick(item)}
                />
              </li>
            ))}
          </ul>
        </section>
        <section id="category">
          <h6>Category</h6>
          <ul className="category-list">
            {categoryFilter.map((item) => (
              <li className="no-bullets-li" key={item.id}>
                <Checkbox
                  name={`${item.label
                    .charAt(0)
                    .toUpperCase()}${item.label.slice(1)}`}
                  id={item.id}
                  checked={item.checked}
                  value={item.label}
                  onChange={onCategoryFilterChanged(item)}
                />
              </li>
            ))}
          </ul>
        </section>
        <section id="ratings">
          <h6>Ratings</h6>
          <ul className="rating-list">
            {ratings.map((item) => (
              <li className="no-bullets-li" key={item.id}>
                <RadioButton
                  id={item.id}
                  label={item.label}
                  value={`${item.value}⭐`}
                  onChange={onRatingFilterChange(item)}
                  checked={item.checked}
                />
              </li>
            ))}
          </ul>
        </section>
        <section id="sort-by">
          <h6>Sort by</h6>
          <ul className="sort-by-list">
            {sortByFilter.map((item) => (
              <li className="no-bullets-li" key={item.id}>
                <RadioButton
                  id={item.id}
                  label={item.label}
                  value={item.value}
                  onChange={onSortFilterChange(item)}
                  checked={item.checked}
                />
              </li>
            ))}
          </ul>
        </section>
        
      </form>
    </div>
  );
}
