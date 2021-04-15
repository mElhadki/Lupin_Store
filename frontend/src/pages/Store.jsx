import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/store.css";
import axios from "axios";
import "../styles/nav.css";
import Paginations from "../components/Pagination";
import ProductsList from "../components/ProductListChunk.jsx";
import { PRODUCTS_PER_PAGE } from "../constants/productList";

function Store() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:8080/products/");
      setProducts(res.data);
      setTotalPages(Math.ceil(res.data.length / PRODUCTS_PER_PAGE));
    };
    fetchProducts();
  }, []);
  const handleClick = (num) => {
    setPage(num);
   
  };
  return (
    <div>
      <div className="products">
        <div className="container">
          <div className="row"></div>
          <div className="row">
            <div className="col">
              <div className="product_grid">
                <ProductsList products={products} page={page} />
              </div>
              <Paginations totalPages={totalPages} handleClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
