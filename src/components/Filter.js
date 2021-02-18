import React from "react";
import "./Filter.css";

const Filter = (props) => {
  const { priceMin, setPriceMin, priceMax, setPriceMax, sort, setSort } = props;
  const handlePriceMin = (event) => {
    setPriceMin(event.target.value);
  };
  const handlePriceMax = (event) => {
    setPriceMax(event.target.value);
  };
  const handleSortPrice = (event) => {
    if (event.target.value === "Croissant") {
      setSort("price-asc");
    } else {
      setSort("price-desc");
    }
  };
  return (
    <div className="Filter_Wrapper">
      <div className="Price_Filters">
        <div className="PriceMin_Filter">
          <label htmlFor="priceMin">Prix Min</label>
          <input
            id="priceMin"
            className="priceMin"
            type="number"
            min="0"
            max="1000"
            value={priceMin}
            onChange={handlePriceMin}
          />
        </div>
        <div className="PriceMax_Filter">
          <label htmlFor="priceMax">Prix Max</label>
          <input
            id="priceMax"
            className="priceMax"
            type="number"
            min="0"
            max="1000"
            value={priceMax}
            onChange={handlePriceMax}
          />
        </div>
      </div>
      <div className="Sort_Filter">
        <label htmlFor="sortPrice"> Tri</label>
        <select id="sortPrice" onChange={handleSortPrice}>
          <option></option>
          <option>Croissant</option>
          <option>Décroissant</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
