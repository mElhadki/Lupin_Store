import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const [dataCart, setDataCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:8080/cart/", {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      });

      setDataCart([...res.data]);
    };
    fetchProducts();
  }, []);
  let price = 0;
  dataCart.forEach((element) => {
    price = price + parseInt(element.qte) * parseInt(element.idProduct.price);
  });
  return (
    <div>
      <div class="cart_info">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="cart_info_columns clearfix">
                <div class="cart_info_col cart_info_col_product">Product</div>
                <div class="cart_info_col cart_info_col_price">Price</div>
                <div class="cart_info_col cart_info_col_price">Quantity</div>
              </div>
            </div>
          </div>
          <div class="row cart_items_row" id="rowcart">
            <div class="col">
              {dataCart.map((resData) => (
                <div
                  key={resData._id}
                  class="cart_item d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start"
                >
                  <div class="cart_item_product d-flex flex-row align-items-center justify-content-start">
                    <div class="cart_item_image">
                      <div>
                        <img
                          src={`http://localhost:8080/${resData.idProduct.image}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="cart_item_name_container">
                      <div class="cart_item_name">
                        <a href="#">{resData.idProduct.productName}</a>
                      </div>
                    </div>
                  </div>

                  <div class="cart_item_price">{resData.idProduct.price} $</div>
                  <div class="cart_item_price">{resData.qte} unite</div>
                </div>
              ))}
            </div>
            <div class="row row_cart_buttons">
              <div class="col">
                <div class="cart_buttons d-flex flex-lg-row flex-column align-items-start justify-content-start">
                  <div class="button continue_shopping_button">
                    <a>Continue shopping</a>
                  </div>
                  <div class="cart_buttons_right ml-lg-auto">
                    <div class="button clear_cart_button">
                      <a>Clear cart</a>
                    </div>
                    <div class="button update_cart_button">
                      <a>Update cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row row_extra">
              <div class="col-lg-6 offset-lg-2">
                <div class="cart_total">
                  <div class="section_title">Cart total</div>
                  <div class="section_subtitle">Final info</div>
                  <div class="cart_total_container">
                    <ul>
                      <li class="d-flex flex-row align-items-center justify-content-start">
                        <div class="cart_total_title">Subtotal</div>
                        <div class="cart_total_value ml-auto">$ {price}</div>
                      </li>
                      <li class="d-flex flex-row align-items-center justify-content-start">
                        <div class="cart_total_title">Shipping</div>
                        <div class="cart_total_value ml-auto">Free</div>
                      </li>
                      <li class="d-flex flex-row align-items-center justify-content-start">
                        <div class="cart_total_title">Total</div>
                        <div class="cart_total_value ml-auto">$ {price}</div>
                      </li>
                    </ul>
                  </div>
                  <div class="button checkout_button">
                    <Link to="/Checkout">Proceed to checkout</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
