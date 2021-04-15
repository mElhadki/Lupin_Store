import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Checkout.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import StripeCheckout from "react-stripe-checkout";

function Checkout() {
  const [dataCart, setDataCart] = useState([]);
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => setToggled(!isToggled);
  function payment() {}
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
      <div className="checkout">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="billing checkout_section">
                <div className="section_title">Billing Address</div>
                <div className="section_subtitle">Enter your address info</div>
                <div className="checkout_form_container">
                  <form
                    method="post"
                    id="payment-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      payment();
                      document.getElementById("ccpurchase").disabled = true;
                    }}
                  >
                    <div className="row">
                      <div className="col-xl-6">
                        <label>First Name*</label>
                        <input
                          type="text"
                          id="checkout_name"
                          className="checkout_input"
                          required="required"
                        />
                      </div>

                      <div className="col-xl-6 last_name_col">
                        <label>Last Name*</label>
                        <input
                          type="text"
                          id="checkout_last_name"
                          className="checkout_input"
                          required="required"
                        />
                      </div>
                    </div>
                    <div id="Adress">
                      <label>Adress*</label>
                      <input
                        type="text"
                        id="checkout_company"
                        className="checkout_input"
                      />
                    </div>

                    <div style={{ width: "100%" }}>
                      <label>Zipcode*</label>
                      <input
                        type="text"
                        id="checkout_zipcode"
                        className="checkout_input"
                        required="required"
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <label>City/Town*</label>
                      <select
                        name="checkout_city"
                        id="checkout_city"
                        className="dropdown_item_select checkout_input"
                        require="required"
                      >
                        <option></option>
                        <option>City</option>
                        <option>City</option>
                        <option>City</option>
                        <option>City</option>
                      </select>
                    </div>

                    <div style={{ width: "100%" }}>
                      <label>Phone no*</label>
                      <input
                        type="phone"
                        id="checkout_phone"
                        className="checkout_input"
                        required="required"
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <label>Email Address*</label>
                      <input
                        type="phone"
                        id="checkout_email"
                        className="checkout_input"
                        required="required"
                      />
                    </div>
                 
                  </form>
                </div>
				<StripeCheckout
                      stripeKey="pk_test_51GxrgnJjT1M3ZAOSLSz7QMUEmhim5MKh9xcwOdQDwmZgMRZeefa7rkvolkuCidgx2wtmWAYeN3tI46FUt3xWIRfO00hb1onjbQ"
                      name="Bijoutrie lupin
                      "
                      billingAddress
					  shippingAddress
                    />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="order checkout_section">
                <div className="section_title">Your order</div>
                <div className="section_subtitle">Order details</div>

                <div className="order_list_container">
                  <div className="order_list_bar d-flex flex-row align-items-center justify-content-start">
                    <div className="order_list_title">Product</div>
                    <div className="order_list_value ml-auto">Total</div>
                  </div>
                  <ul className="order_list">
                    {dataCart.map((element) => (
                      <li className="d-flex flex-row align-items-center justify-content-start">
                        <div className="order_list_title">
                          {element.idProduct.productName} X <b>{element.qte}</b>
                        </div>
                        <div className="order_list_value ml-auto">
                          $
                          {parseInt(element.qte) *
                            parseInt(element.idProduct.price)}
                        </div>
                      </li>
                    ))}

                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="order_list_title">Subtotal</div>
                      <div className="order_list_value ml-auto">${price}</div>
                    </li>
                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="order_list_title">Shipping</div>
                      <div className="order_list_value ml-auto">Free</div>
                    </li>
                    <li className="d-flex flex-row align-items-center justify-content-start">
                      <div className="order_list_title">Total</div>
                      <div className="order_list_value ml-auto">${price}</div>
                    </li>
                  </ul>
                </div>

                <div className="payment">
                  <div className="payment_options">
                    <Toggle
                      id="biscuit-status"
                      defaultChecked={true}
                      onChange={toggleTrueFalse}
                    />
                    {isToggled ? (
                      <label className="payment_option clearfix">
                        Cach on delivery
                      </label>
                    ) : (
                      <label className="payment_option clearfix">
                        Credit card
                      </label>
                    )}
                  </div>
                </div>
                <div className="button order_button">
                  <input
                    type="submit"
                    form="payment-form"
                    value="Place Order"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
