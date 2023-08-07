import React, { useState, useEffect } from "react";
import productsData from "@/data/products.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
    if (router.query.search) {
      const term = router.query.search.toLowerCase();
      const searchedProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
      setFilteredProducts(searchedProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [router.query.search, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleSort = (e) => {
    setCurrentPage(1);
    const value = e.target.value;
    let sortedProducts = [...products];
    if (value === "priceAsc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "priceDesc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const handleFilterByPrice = (e) => {
    setCurrentPage(1);
    const value = parseInt(e.target.value, 10);
    const pricedProducts = products.filter((product) => product.price <= value);
    setFilteredProducts(pricedProducts);
  };

  const handleFilterByCategory = (e) => {
    setCurrentPage(1);
    const value = e.target.value;
    if (value === "all") {
      setFilteredProducts(products);
    } else {
      const categorizedProducts = products.filter(
        (product) => product.category === value
      );
      setFilteredProducts(categorizedProducts);
    }
  };

  return (
    <div>
      <Navbar />
      <main>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-3">
              <Filter
                handleSort={handleSort}
                handleFilterByPrice={handleFilterByPrice}
                handleFilterByCategory={handleFilterByCategory}
              />
            </div>
            <div className="col-md-9">
              <ProductList products={currentProducts} />
              <Pagination
                totalProducts={filteredProducts.length}
                productsPerPage={productsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;