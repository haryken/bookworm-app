import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Home from "../Home";
import Shop from "../Shop";
import NavigationBar from "../NavigationBar";
import Product from "../Product";
import Footer from '../Footer';
import About from '../About';
import Cart from '../Cart';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
export class Master extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart'))!==null?JSON.parse(localStorage.getItem('cart')):[],
    cartCount: localStorage.getItem('cart_count')!==null?parseInt(localStorage.getItem('cart_count')):0,
    navActive: '/'
  }
  componentDidMount(){
    console.log(this.state.navActive)
  }
  handleUpdateCartCount = ()=> {
    localStorage.setItem('cart_count',localStorage.getItem('cart')!==null?JSON.parse(localStorage.getItem('cart')).length:0);
    this.setState({cartCount: localStorage.getItem('cart_count')!==null?parseInt(localStorage.getItem('cart_count')):0})
  }
  handleActive = (cur) => {
    this.setState({
      navActive: cur
    },()=>{
      console.log(cur)
    })
  }
  render(){
    return (
      <Router>
          <NavigationBar handleActive={this.handleActive} navActive={this.state.navActive}  count_item={this.state.cartCount} />
          <Switch>
            <Route path="/book/:id">
                <Product handleUpdateCartCount={this.handleUpdateCartCount}/>
            </Route>
            <Route exact path="/about"><About /></Route>
            <Route exact path="/cart"><Cart handleUpdateCartCount={this.handleUpdateCartCount}/></Route>
            <Route exact path="/shop"><Shop /></Route>
            <Route exact path="/"><Home/></Route>
          </Switch>
          <Footer />
      </Router>
    )
  };
  
}
ReactDOM.render(<Master />, document.getElementById('root'));
