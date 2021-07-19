import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./Home";
import Shop from "./Shop";
import NavigationBar from "./NavigationBar";
import Product from "./Product";
import Footer from './Footer';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,useParams} from "react-router-dom";
export default function Master() {
  return (
    <Router>
        <NavigationBar/>
        <Switch>
          <Route path="/book/:id" children={<Product />} />
          <Route exact path="/about"><About />
          </Route>

          <Route exact path="/cart"><Cart /></Route>

          <Route exact path="/shop"><Shop /></Route>

          <Route exact path="/"><Home /></Route>
        </Switch>
        <Footer />
    </Router>
  );
}

function Cart() {
  return <h2>Cart</h2>;
}


ReactDOM.render(<Master />, document.getElementById('root'));
