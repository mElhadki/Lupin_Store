import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";
import { useDispatch, useSelector } from "react-redux";
import { counterCart, logoutAction, resetAddToCartAction } from "../store/actions";
function Navbar() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.logged.logged);
  const counter = useSelector((state) => state.cart);
  const { list, loading } = counter;
  console.log();
  function logout() {
    dispatch(logoutAction());
    localStorage.clear();
    localStorage.removeItem("state");
  }

  useEffect(() => {
    if(isLogged || loading){
      dispatch(counterCart());
      dispatch(resetAddToCartAction());
    }
  
  }, [isLogged, loading])
    
  

  return (
    <div>
      <div className="navigation-wrap bg-light start-header start-style">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-md navbar-light">
                <Link className="navbar-brand" to="/">
                  <img src="../assets/img/Logo.png" alt="" />
                </Link>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto py-4 py-md-0">
                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4 active">
                      <Link className="nav-link" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                      <Link className="nav-link" to="/Store">
                        Store
                      </Link>
                    </li>

                    {isLogged ? (
                      <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        <span
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          My Account
                        </span>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/">
                            Orders
                          </Link>
                          <Link className="dropdown-item" to="/">
                            Account Details
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="/Home?logout=true"
                            onClick={logout}
                          >
                            Log Out
                          </Link>
                        </div>
                      </li>
                    ) : (
                      <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                        <Link className="nav-link" to="/Auth">
                          Account
                        </Link>
                      </li>
                    )}

                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                      <Link className="nav-link" to="/Cart">
                        <div className="cart-nav nav-item-link">
                          <span className="fa-shopping-cart"></span>
                          <span className="nav-cart-items">
                            {
                            (isLogged) ? (list.length) : (0)
                            }
                          </span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
