import React from "react";
import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div className="container products-container">
      <div className="row">
        {products &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
