import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import productsData from "@/data/products.json";

function ProductDetails() {
  const router = useRouter();
  const { user } = useUser();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);

  const product = productsData.find((product) => product.id.toString() === id);

  const [mainImage, setMainImage] = useState(product ? product.images[0] : "");

  const recommendedProducts = product
    ? productsData.filter((p) => p.id !== product.id).slice(0, 3)
    : null;

  useEffect(() => {
    setMainImage(product && product.images[0]);
  }, [product]);

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
          productId: product.id,
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
                <p class="rating">
                  Rating:
                  <span class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
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
