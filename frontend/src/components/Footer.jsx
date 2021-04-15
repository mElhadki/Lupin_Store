import { Link } from "react-router-dom";
import "../styles/footer.css";
function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <div className="footer-widget">
                <h3>Stay in touch</h3>
                <div className="footer-widget-content">
                  <a
                    href="mailto:gitshopllc@gmail.com"
                    className="contact-link red"
                  >
                    Jewellery{" "}
                  </a>
                  <a href="tel:(0)5 24 256-789" className="contact-link">
                    (0)5 24 256-789
                  </a>
                  <div className="footer-social">
                    <ul>
                      <li>
                        <Link to="/">
                          <i className="fa fa-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-linkedin"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-youtube"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <i className="fa fa-rss"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="footer-widget">
                <h3>Links</h3>
                <div className="footer-widget-content">
                  <div className="media">
                    <div className="media-body">
                      <p>
                        <a href="index.php">Home </a>
                      </p>
                    </div>
                  </div>
                  <div className="media">
                    <div className="media-body">
                      <p>
                        <a href="OrdersHistory.php">My Account</a>
                      </p>
                    </div>
                  </div>
                  <div className="media">
                    <div className="media-body">
                      <p>
                        <a href="login-reg.php">Account</a>
                      </p>
                    </div>
                  </div>
                  <div className="media">
                    <div className="media-body">
                      <p>
                        <a href="cart2.php">Cart</a>
                      </p>
                    </div>
                  </div>
                  <div className="media">
                    <div className="media-body">
                      <p>
                        <a href="contactus.php">Contact</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="footer-widget">
                <h3>Other Business</h3>
                <div className="footer-widget-content">
                  <div className="media">
                    <div className="media-body">
                      <p>
                        <a href="FAQ.php">FAQ </a>
                      </p>
                    </div>
                  </div>
                  <div className="media">
                    <div className="media-body">
                      <p>
                        <a href="terms.php">terms and Condition</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
