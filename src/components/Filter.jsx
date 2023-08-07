import React, { useState } from "react";

function Filter({ handleSort, handleFilterByPrice, handleFilterByCategory }) {
  const [currentPrice, setCurrentPrice] = useState(5000);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setCurrentPrice(value);
    handleFilterByPrice(e);
  };
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Filters</h5>
        <form>
          <div className="mb-3">
            <label htmlFor="sortSelect" className="form-label">
              Sort By
            </label>
            <select
              className="form-select"
              id="sortSelect"
              onChange={handleSort}
            >
              <option value="default">All</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="priceRange" className="form-label">
              Price Range: Up to ${currentPrice}
            </label>
            <input
              type="range"
              className="form-range"
              id="priceRange"
              min="0"
              max="5000"
              step="10"
              value={currentPrice}
              onChange={handlePriceChange}
            />
            <div className="d-flex justify-content-between">
              <span>$0</span>
              <span>$5000</span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="categorySelect" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="categorySelect"
              onChange={handleFilterByCategory}
            >
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Filter;
