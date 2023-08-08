import React, { useState, useEffect } from "react";
import NavBar from "../src/components/Navbar";
import CustomCarousel from "../src/components/CustomCarousel";
import Product from "../src/components/Product";
import Footer from "../src/components/Footer";

const banners = [
  { image: "/img/banner/banner-1.jpg" },
  { image: "/img/banner/banner-2.jpg" },
  { image: "/img/banner/banner-3.jpg" },
  { image: "/img/banner/banner-4.jpg" },
  { image: "/img/banner/banner-5.jpg" },
];

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("There was an error fetching the products", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <NavBar />
      <CustomCarousel banners={banners} />

      <div className="container products-container-home">
        <h2>Popular Products</h2>
        <div className="row">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
