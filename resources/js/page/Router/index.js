import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Home from "../Home";
import Shop from "../Shop";
import NavigationBar from "../NavigationBar";
import Product from "../Product";
import Footer from '../Footer';
import About from '../About';
import Cart from '../Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
export class Master extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart'))!==null?JSON.parse(localStorage.getItem('cart')):[],
    cartCount: localStorage.getItem('cart_count')!==null?parseInt(localStorage.getItem('cart_count')):0
  }

  isBookAdded(bookId){
    return this.state.cart.some(item => bookId === item.bookId);
  }

  handleCartRemove = ()=> {
    localStorage.setItem('cart_count',localStorage.getItem('cart')!==null?JSON.parse(localStorage.getItem('cart')).length:0);
    this.setState({cartCount: localStorage.getItem('cart_count')!==null?parseInt(localStorage.getItem('cart_count')):0})

  }
  handleAddToCart = (book_id, amount,book_title,author_name,sub_price,book_cover_photo) => {
    let carts = JSON.parse(localStorage.getItem('cart'))!==null?JSON.parse(localStorage.getItem('cart')):[];
    if (this.isBookAdded(book_id)) {
      let newCart = carts.map(book => (
                                        (book.bookId === book_id && book.amount+amount<=8)?{ ...book, amount: book.amount+amount } : book
                                      )
                              )
      this.setState({ cart: newCart },
                       ()=>{localStorage.setItem('cart', JSON.stringify(this.state.cart))
                            localStorage.setItem('cart_count',this.state.cart.length)
                            });
    }
    else
    {
      this.setState({
        cart: [...carts, { "bookId": book_id, "amount": amount,'book_title':book_title,'author_name':author_name,'sub_price':sub_price,'book_cover_photo':book_cover_photo}],
                       cartCount: this.state.cartCount+1
              },
              ()=> {
                    localStorage.setItem('cart', JSON.stringify(this.state.cart));
                    localStorage.setItem('cart_count',this.state.cart.length)
                    })
    }

  }
  render(){
    return (
      <Router>
          <NavigationBar cart_cnt={this.state.cartCount} />
          <Switch>
            <Route path="/book/:id">
                <Product handleAddToCart={this.handleAddToCart}/>
            </Route>
            <Route exact path="/about"><About /></Route>
            <Route exact path="/cart"><Cart handleCartRemove={this.handleCartRemove}/></Route>
            <Route exact path="/shop"><Shop /></Route>
            <Route exact path="/"><Home /></Route>
          </Switch>
          <Footer />
      </Router>
    )
  };
  
}
ReactDOM.render(<Master />, document.getElementById('root'));
