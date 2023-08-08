import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { useUser } from "../src/contexts/UserContext";

const ProductUploadPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("Electronics");
  const [productImages, setProductImages] = useState([]);
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [router, user]);

  const handleImageChange = (e) => {
    setProductImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("category", productCategory);
    productImages.forEach((img) => {
      formData.append("productImages", img);
    });

    try {
      const response = await fetch("/api/uploadProduct", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Product uploaded successfully!");
        router.push("/home");
      } else {
        console.log(result);
        setMessage(result.error || "Error uploading product.");
      }
    } catch (error) {
      setMessage("Error uploading product.");
    }
  };

  return (
    <div>
      <NavBar />

      <div className="container mt-5">
        <h2>Upload a Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Product Description:</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Product Price:</label>
            <input
              type="number"
              step="0.01"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Product Category:</label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="form-control"
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
            </select>
          </div>

          <div className="form-group">
            <label>Product Images (up to 5):</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="productImages"
                onChange={handleImageChange}
                multiple
                required
                accept="image/*"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Upload Product
          </button>
        </form>
        {message && <p className="mt-3">{message}</p>}
      </div>

      <Footer />
    </div>
  );
};

export default ProductUploadPage;
