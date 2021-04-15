import React from "react";
import { Link } from "react-router-dom";
const ProductList = ({ productList }) => {
  return (
    <div className="product">
      <div className="product_image">
        <img src={`http://localhost:8080/${productList.image}`} alt="" />
      </div>
      <div className="product_content">
        <div className="product_title">
          <Link to={`/Single/${productList._id}`}>{productList.productName}</Link>
        </div>
        <div className="product_price">{productList.price} $</div>
      </div>
    </div>
  );
};
export default ProductList;
