import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductscategories,
} from "../../features/productSlice";
import Loading from "../Loading";
import { addToCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
const ProductList = () => {
  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector(
    (state) => state.products
  );
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("all");

  const productsPerPage = 5;
  // Fetch products when page or productsPerPage changes
  useEffect(() => {
    dispatch(
      fetchProducts({
        productsPerPage,
        currentPage,
        filterName,
        selectedCategory,
      })
    );
  }, [dispatch, currentPage, productsPerPage, filterName, selectedCategory]);
  useEffect(() => {
    dispatch(fetchProductscategories({}));
  }, [dispatch]);

  if (error) {
    return (
      <div className="text-center text-xl text-red-500">Error: {error}</div>
    );
  }
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  // Pagination logic
  const currentProducts = products.products || [];
  const totalPages = Math.ceil(products.total / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (e) => {
    const selectedSlug = e.target.value;
    setSelectedCategory(selectedSlug);
  };
  // Function to generate pagination pages with ellipses
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const range = 2; // Number of pages to show before and after the current page
    let startPage = Math.max(1, currentPage - range);
    let endPage = Math.min(totalPages, currentPage + range);

    // Add first page and ellipses if needed
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    // Add the range of pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add last page and ellipses if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };
  console.log("categories", categories);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center">Product</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={() => navigate("/cart")}
                  className="relative bg-blue-500 text-white py-2 px-8 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 flex items-center"
                >
                  {/* Cart Item Count Badge */}
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {items.length}
                    </span>
                  )}
                  <FaShoppingCart size={20} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <input
          type="text"
          placeholder="Search by name"
          value={filterName}
          onChange={(e) => {
            setFilterName(e.target.value);
            setSelectedCategory("all");
          }}
          className="border p-2 rounded w-full md:w-1/2 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <div className="w-full max-w-sm mx-auto">
          <label
            htmlFor="category-selector"
            className="block text-gray-700 font-medium mb-2"
          >
            Select a Category
          </label>
          <select
            id="category-selector"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Choose a category
            </option>
            <option key={"all"} value={"all"}>
              {"All"}
            </option>

            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!loading ? (
        <>
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentProducts?.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-56 object-contain rounded-lg mb-6"
                  />
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                    New
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-blue-600">
                    ${product.price}
                  </p>
                  <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2 flex-wrap">
            {/* Previous Button */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="my-2">
              {/* Page Number Buttons */}
              {generatePageNumbers().map((pageNumber, index) => {
                if (pageNumber === "...") {
                  return (
                    <span key={index} className="px-4 py-2 text-gray-700">
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={pageNumber}
                    className={`px-4 py-2 mx-1 rounded-lg ${
                      currentPage === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } hover:bg-blue-400`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            {/* Next Button */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProductList;
