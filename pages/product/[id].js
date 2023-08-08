import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import { useUser } from "../../src/contexts/UserContext";
import { useRouter } from "next/router";
import Navbar from "../../src/components/Navbar";
import Footer from "../../src/components/Footer";

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

function ProductDetails() {
  const router = useRouter();
  const { user } = useUser();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  const [mainImage, setMainImage] = useState();

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    async function fetchProductDetails() {
      if (!id) return;

      try {
        const response = await axios.get(`/api/products?id=${id}`);

        if (response.status === 200) {
          setProduct(response.data);
          setMainImage(response.data.images[0]); // Set the main image here directly
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("There was an error fetching the product details", error);
      }
    }

    async function fetchRecommendedProducts() {
      try {
        const allProductsResponse = await axios.get(`/api/products`);
        if (allProductsResponse.status === 200) {
          const otherProducts = allProductsResponse.data.filter(
            (prod) => prod.id !== id
          );
          const randomRecommended = otherProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          setRecommendedProducts(randomRecommended);
        } else {
          console.error("Failed to fetch recommended products");
        }
      } catch (error) {
        console.error(
          "There was an error fetching the recommended products",
          error
        );
      }
    }

    fetchProductDetails();
    fetchRecommendedProducts();
  }, [id]);

  const handleMouseEnter = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("You need to login to start shopping");
      router.push("/auth");
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId: product._id,
          quantity,
        }),
      });

      if (response.ok) {
        router.push("/cart");
      } else {
        alert("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-images">
                <div className="main-image">
                  <Image
                    src={mainImage} // Use state here
                    alt={product.title}
                    className="img-fluid"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="thumbnail-images">
                  {product.images.map((imgUrl, index) => (
                    <Image
                      key={index}
                      src={imgUrl}
                      alt={product.title}
                      className="img-fluid"
                      width={500}
                      height={500}
                      onMouseEnter={() => handleMouseEnter(imgUrl)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product-info">
                <h2>{product.title}</h2>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
                <p class="stock">Total Stock: 100</p>
                <p className="rating">
                  Rating:
                  <span className="stars">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarHalfIcon />
                  </span>
                </p>
              </div>
              <div className="product-buttons p-2">
                <div className="input-group number-of-items p-3">
                  <button
                    className="btn minus"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input type="number" min="1" max="100" value={quantity} />
                  <button
                    className="btn plus"
                    onClick={() => quantity < 100 && setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-primary add-to-cart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container accordion mt-5">
          <h2 className="mb-4">Similar Products</h2>
          <div className="row">
            {recommendedProducts.map((recommendedProduct) => (
              <div className="col-md-4" key={recommendedProduct.id}>
                <div className="product">
                  <Link
                    href={`/product/${recommendedProduct.id}`}
                    className="text-decoration-none text-black"
                  >
                    <>
                      <Image
                        src={recommendedProduct.images[0]}
                        alt={recommendedProduct.title}
                        className="img-fluid"
                        width={500}
                        height={500}
                      />
                      <h3>{recommendedProduct.title}</h3>
                      <p className="price">${recommendedProduct.price}</p>
                    </>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetails;
