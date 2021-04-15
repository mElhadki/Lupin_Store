import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from './pages/Home.jsx';
import Auth from "./pages/Auth.jsx";
import Footer from "./components/Footer.jsx";
import Store from "../src/pages/Store.jsx";
import Single from "../src/pages/Single.jsx";
import Cart from "../src/pages/Cart.jsx";
import Checkout from "../src/pages/checkout";
import Thank from "../src/pages/Thank";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
function App() {

  return (
    
    <Router>
      <div className="App">
       <Navbar />
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Auth" component={Auth} />
          <Route exact path="/Store" component={Store} />
          <Route exact path="/Single/:id" component={Single} />
          <Route exact path="/Cart" component={Cart} />
          <Route exact path="/Checkout" component={Checkout} />
          <Route exact path="/Thank" component={Thank} />
          <Redirect from="/" to="/Home" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
