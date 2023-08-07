import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import productsData from "@/data/products.json";
import paymentMethods from "@/data/paymentMethods.json";
import axios from "axios";
import Image from "next/image";

import { useUser } from "@/contexts/UserContext";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchCartItems() {
      if (user && user.id) {
        try {
          const res = await axios.get(`/api/cart?userId=${user.id}`);
          setCartItems(res.data);
        } catch (error) {
          console.error("Error fetching cart:", error.message);
        }
      }
    }

    fetchCartItems();
  }, [user]);

  const getProductDetails = (cartID) => {
    return productsData.find((product) => product.id === cartID) || null;
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const productDetails = getProductDetails(item.cartID);
    if (productDetails && productDetails.price) {
      return sum + productDetails.price * item.quantity;
    }
    return sum;
  }, 0);

  const removeFromCart = async (productId) => {
    setCartItems(cartItems.filter((item) => item.cartID !== productId));

    try {
      axios.put(`/api/cart`, {
        userId: user.id,
        productId,
        action: "remove",
      });
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
    }
  };

  const increaseQuantity = async (productId) => {
    let newQuantity = 0;
    const updatedCartItems = cartItems.map((item) => {
      if (item.cartID === productId) {
        newQuantity = item.quantity + 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);

    try {
      axios.put(`/api/cart`, {
        userId: user.id,
        productId,
        action: "increase",
      });
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
    }
  };

  const decreaseQuantity = async (productId) => {
    let newQuantity = 0;
    const updatedCartItems = cartItems.map((item) => {
      if (item.cartID === productId && item.quantity > 1) {
        newQuantity = item.quantity - 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);

    try {
      axios.put(`/api/cart`, {
        userId: user.id,
        productId,
        action: "decrease",
      });
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginBottom: "10vh" }}>
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <span
                className="material-icons"
                style={{ fontSize: "50px", color: "#aaa" }}
              >
                shopping_cart
              </span>
              <p>
                Your cart is empty. <a href="/home">Shop now</a> to add items to
                your cart.
              </p>
            </div>
          ) : (
            <>
              {cartItems.map((item, index) => {
                const productDetails = getProductDetails(item.cartID);
                return (
                  <div className="cart-item" key={index}>
                    <div className="item-image">
                      <Image
                        src={productDetails?.images[0]}
                        alt={productDetails?.name}
                        width={500}
                        height={500}
                      />
                    </div>
                    <div className="item-details">
                      <h3>{productDetails?.title}</h3>
                      <p className="price">${productDetails?.price}</p>
                      <div className="item-quantity">
                        <button
                          className="minus btn"
                          onClick={() => decreaseQuantity(item.cartID)}
                        >
                          -
                        </button>
                        <input type="number" value={item.quantity} readOnly />
                        <button
                          className="plus btn"
                          onClick={() => increaseQuantity(item.cartID)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="item-remove">
                      <button
                        className="btn btn-remove"
                        onClick={() => removeFromCart(item.cartID)}
                      >
                        <span className="material-icons"> delete_outline </span>
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="cart-total">
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
              </div>

              <div className="payment-methods">
                <h3>Choose Payment Method:</h3>
                {paymentMethods.map((method) => (
                  <div className="payment-method" key={method.id}>
                    <input
                      type="radio"
                      name="payment"
                      id={`payment-${method.id}`}
                      value={method.id}
                    />
                    <Image
                      src={method.icon}
                      alt={method.name}
                      width={100}
                      height={100}
                    />
                    <label htmlFor={`payment-${method.id}`}>
                      {method.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="cart-actions">
                <button className="btn btn-primary">Checkout</button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
