// src/pages/Products.js

import React, { useState, useEffect } from "react";
import { getProducts, fetchCategories } from "../services/products";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useAuthStore } from "../store/useAuthStore";
import { Modal } from "../components/ui/Modal";
import Banner from "../components/ui/Banner";
import Footer from "../components/ui/Footer";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuthStore();
  const addItem = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          getProducts(),
          fetchCategories(),
        ]);
        setProducts(productData);
        setFilteredProducts(productData);
        setCategories(categoryData);
      } catch (err) {
        setError("Failed to load products or categories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      setIsLogin(true);
    } else {
      addItem(product);
      setIsModalOpen(false);
    }
  };

  const handleAddToWishlist = (product) => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      setIsLogin(false);
    } else {
      addToWishlist(product);
      setIsModalOpen(false);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCategorySelect = (category) => {
    if (category) {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSearch = (query) => {
    if (query) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen">
      <Banner />
      <div className="flex justify-center my-4">
        <select onChange={(e) => handleCategorySelect(e.target.value)} className="border p-2 rounded">
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => handleSearch(e.target.value)}
          className="border p-2 rounded ml-4"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.title}
              </h3>
              <p className="text-gray-600 mt-1">
                {product.description.substring(0, 50)}...
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <div className="flex space-x-2">
                  <button
                    className="bg-accent-color text-button-text-color px-2 py-1 rounded-md hover:bg-button-hover-color"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-secondary-color text-button-text-color px-2 py-1 rounded-md hover:bg-opacity-75"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToWishlist(product);
                    }}
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedProduct ? (
          <div className="p-4">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold">{selectedProduct.title}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-48 object-contain mt-4"
            />
            <p className="mt-2 text-sm">{selectedProduct.description}</p>
            <div className="mt-4 flex space-x-2">
              <button
                className="bg-accent-color text-button-text-color px-3 py-1 rounded-md hover:bg-button-hover-color"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add to Cart
              </button>
              <button
                className="bg-secondary-color text-button-text-color px-3 py-1 rounded-md hover:bg-opacity-75"
                onClick={() => handleAddToWishlist(selectedProduct)}
              >
                Wishlist
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-4">Authentication Required</h2>
            <p>Please login or register to add items to your cart or wishlist.</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-accent-color text-button-text-color px-4 py-2 rounded-md hover:bg-button-hover-color"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-secondary-color text-button-text-color px-4 py-2 rounded-md hover:bg-opacity-75"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </Modal>
      <Footer />
    </div>
  );
};