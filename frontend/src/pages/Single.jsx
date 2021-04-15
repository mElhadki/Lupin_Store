import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/singleProduct.css";
import "../styles/nav.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../store/actions";
function Single() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [nameProduct, setNameProduct] = useState("");
  const [price, setPrice] = useState("");
  const [qte, setQte] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:8080/products/one/${id}`).then((response) => {
      setNameProduct(response.data.productName);
      setPrice(response.data.price);
      setQte(response.data.qte);
      setDescription(response.data.description);
      setImage(response.data.image);
    });
  }, []);

  function addToCart() {
    let valued = document.getElementById("d").value;

    let data = {
      idProduct: id,
      qte: valued,
    };
    axios
      .post("http://localhost:8080/cart/add", data, {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      })
      .then((response) => {
        if (response.data.error !== undefined) {
          response.data.error.forEach((element) => {
            toast.error(element, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        }
        else{
          toast.success(response.data.notif, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          dispatch(addToCartAction());
        }
      })
      .catch((err) => console.error(err));
  }

  const [valueInput, setValueInput] = useState(1);

  return (
    <div>
      <ToastContainer />
      <div className="product_details">
        <div className="container">
          <div className="row details_row">
            <div className="col-lg-6">
              <div className="details_image">
                <div className="details_image_large">
                  <img src={`http://localhost:8080/${image}`} alt="" />
                  <div className="product_extra product_new">
                    <span href="categories.html">New</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="details_content">
                <div className="details_name">{nameProduct}</div>
                <div className="details_price">{price} $</div>

                <div className="in_stock_container">
                  <div className="availability">Availability:</div>
                  <span>In Stock</span>
                </div>
                <div className="details_text">
                  <p>Quantity</p>
                  <p>
                    <b>{qte} units</b>
                  </p>
                </div>

                <div className="product_quantity_container">
                  <div className="btn-spn btn-spn-sm input-group">
                    <span className="input-group-btn">
                      <button
                        className="btn btn-secondary btn-spn-down"
                        type="button"
                        style={{
                          background: "#eac7cc",
                          border: "none",
                        }}
                        onClick={() => {
                          if (valueInput > 1) {
                            setValueInput(valueInput - 1);
                          }
                        }}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                    </span>
                    <input
                      type="number"
                      id="d"
                      readOnly
                      value={valueInput}
                      className="btn-spn-input form-control text-center"
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-secondary btn-spn-up"
                        type="button"
                        style={{
                          background: "#eac7cc",
                          border: "none",
                        }}
                        onClick={() => {
                          //   if (valueInput < qte) {
                          setValueInput(valueInput + 1);
                          //   }
                        }}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </span>
                  </div>

                  <br />
                  <button onClick={addToCart}>Add to cart</button>
                </div>

                <div className="details_share">
                  <span>Share:</span>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-pinterest" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row description_row">
            <div className="col">
              <div className="description_title_container">
                <div className="description_title">Description</div>
              </div>
              <div className="description_text">
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single;
