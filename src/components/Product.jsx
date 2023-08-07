import Image from "next/image";
import React, { use } from "react";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";

const Product = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();

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

  return (
    <div className="col-md-6 col-lg-4 mt-5">
      <div className="product">
        <a
          href={`/product/${product.id}`}
          className="text-decoration-none text-black"
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            width={500}
            height={500}
          />
          <h3>{product.title}</h3>
          <p className="price">${product.price.toFixed(2)}</p>
        </a>
        <p className="description">{product.description}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
