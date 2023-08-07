import React from "react";
import NavBar from "../src/components/Navbar";
import CustomCarousel from "../src/components/CustomCarousel";
import Product from "../src/components/Product";
import Footer from "../src/components/Footer";

import productsData from "../src/data/products.json";

const banners = [
  { image: "/img/banner/banner-1.jpg" },
  { image: "/img/banner/banner-2.jpg" },
  { image: "/img/banner/banner-3.jpg" },
  { image: "/img/banner/banner-4.jpg" },
  { image: "/img/banner/banner-5.jpg" },
];

export default function Home() {
  return (
    <div>
      <NavBar />
      <CustomCarousel banners={banners} />

      <div className="container products-container-home">
        <h2>Popular Products</h2>
        <div className="row">
          {productsData.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
