import "../styles/index.css";
import { Link } from "react-router-dom";
import icone1 from "../img/icon_1.svg";
import icone2 from "../img/icon_2.svg";
import icone3 from "../img/icon_3.svg";
import slide1 from "../img/slide1.png";
import slide2 from "../img/slide2.png";
import slide3 from "../img/slide3.png";
import lovering from "../img/lovering.jpg";
import banner from "../img/banner.jpg";
import Swal from 'sweetalert2';
import { useEffect } from "react";
function Home() {
  useEffect(() => {
    var urlString = window.location.search;
    var urlParam = new URLSearchParams(urlString);
    var login = urlParam.get('login');
    var alreadyLogin = urlParam.get('alreadyLogin');
    if(login === 'true'){
      Swal.fire(
        'You are logged in!',
        'clicke the button to continue!',
        'success'
      )
    }
    else if(alreadyLogin === 'true'){
      Swal.fire(
        'You are already logged!',
        'clicke the button to continue!',
        'error'
      )
    }
    
  })
  return (
    <div>
      <div
        id="myCarousel"
        className="carousel slide carousel-fade"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="mask flex-center">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-7 col-12 order-md-1 order-2">
                    <h4>
                      A new Online <br />
                      Shop experience.
                    </h4>
                    <p>
                    A high Jewelry collection of overwhelming beauty. 
                    It is a harmonious marriage of limitless imagination 
                    and precious gems carefully selected from all over the world.
                    </p>
                    <Link className="buy_now">BUY NOW</Link>
                  </div>
                  <div className="col-md-5 col-12 order-md-2 order-1">
                    <img src={slide1} className="mx-auto" alt="slide" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="mask flex-center">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-7 col-12 order-md-1 order-2">
                    <h4>
                      A new Online <br />
                      Shop experience.
                    </h4>
                    <p>
                    A high Jewelry collection of overwhelming beauty. 
                    It is a harmonious marriage of limitless imagination 
                    and precious gems carefully selected from all over the world.
                    </p>
                    <Link className="buy_now">BUY NOW</Link>
                  </div>
                  <div className="col-md-5 col-12 order-md-2 order-1">
                    <img src={slide2} className="mx-auto" alt="slide" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="mask flex-center">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-7 col-12 order-md-1 order-2">
                    <h4>
                      A new Online <br />
                      Shop experience.
                    </h4>
                    <p>
                    A high Jewelry collection of overwhelming beauty. 
                    It is a harmonious marriage of limitless imagination 
                    and precious gems carefully selected from all over the world.
                    </p>
                    <Link className="buy_now">BUY NOW</Link>
                  </div>
                  <div className="col-md-5 col-12 order-md-2 order-1">
                    <img src={slide3} className="mx-auto" alt="slide" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="avds">
        <div className="avds_container d-flex flex-lg-row flex-column align-items-start justify-content-between">
          <div className="avds_small">
            <div
              className="avds_background"
              style={{
                backgroundImage: `url(${lovering})`,
              }}
              
            >
              <div className="avds_small_inner">
                <div className="avds_small_content">
                  <div className="avds_title">Love & Engagement</div>
                  <div className="avds_link">
                    <Link>See More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="avds_large">
            <div
              className="avds_background"
              style={{ backgroundImage: `url(https://i.postimg.cc/YqrqVYF1/Capture-d-cran-2021-04-05-143711.jpg)` }}
            >
              <div className="avds_large_container">
                <div className="avds_large_content">
                  <div className="avds_title">Iconic  Bracelets</div>
                  <div className="avds_text">
                  Explore expressions of our signature Cable, a New York icon..
                  </div>
                  <div className="avds_link avds_link_large">
                    <Link>See More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="icon_boxes">
        <div className="container">
          <div className="row icon_box_row">
            <div className="col-lg-4 icon_box_col">
              <div className="icon_box">
                <div className="icon_box_image">
                  <img src={icone1} alt="" />
                </div>
                <div className="icon_box_title">Free Shipping Worldwide</div>
                <div className="icon_box_text">
                  <p>
                    We Offer Free Shipping Worldwide thefree shipping will be
                    noted on the product page
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 icon_box_col">
              <div className="icon_box">
                <div className="icon_box_image">
                  <img src={icone2} alt="" />
                </div>
                <div className="icon_box_title">Free Returns</div>
                <div className="icon_box_text">
                  <p>
                    Never settle for less – ship any purchase back for free.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 icon_box_col">
              <div className="icon_box">
                <div className="icon_box_image">
                  <img src={icone3} alt="" />
                </div>
                <div className="icon_box_title">24h Fast Support</div>
                <div className="icon_box_text">
                  <p>
                    we will be happy to advise you on all things connected to
                    our services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="avds_xl">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="avds_xl_container clearfix">
                <div
                  className="avds_xl_background"
                  style={{
                    backgroundImage: `url(${banner})`,
                    backgroundAttachment: "fixed",
                  }}
                ></div>
                <div className="avds_xl_content">
                  <div className="avds_title">Amazing jewelry</div>
                  <div className="avds_text">
                    we always provides high quality products and services via
                    our platform.
                  </div>
                  <div className="avds_link avds_xl_link">
                    <a href="categories.html">See More</a>
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

export default Home;
