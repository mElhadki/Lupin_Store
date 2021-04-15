import {React , useState} from "react";
import { Link } from "react-router-dom";
import "../styles/Thank.css";
import "../styles/nav.css";
import NumericInput from 'react-numeric-input';



function Thank() {
  
  return (
    <div>

<div className="content">
  <div className="wrapper-1">
    <div className="wrapper-2">
      <h1>Thank you !</h1>
      <p>Thanks for subscribing to our news letter.  </p>
      <p>you should receive a confirmation email soon  </p>
      <button className="go-home">
      go home
      </button>
    </div>
    <div className="footer-like">
      <p>Thank You
      </p>
    </div>
</div>
</div>
    </div>
  );
}

export default Thank;
