import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {get} from '../httpHelper';
import {Col,Container,Row,Button,Breadcrumb,Figure,Tabs,Tab} from 'react-bootstrap';
export default class Cart extends Component {
    state = {
        items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [],
        carts: [],
        amounts: [],
        total: 0,
        msg: "",
    }
    increaseValue = (book_id,amount) => {    
        if (amount + 1 <= 8) {

            let updateAmount = this.state.items.map(item => (
                (item.bookId == book_id) ? { ...item, amount: item.amount + 1 } : item
            ))
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(updateAmount));
            this.setState({
                items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : []
            })
        }
        else {
            console.log('false');
        }
        
    }
    decreaseValue = (book_id,amount) => {
        let updateAmount;
        if (amount - 1 > 0) {

            updateAmount = this.state.items.map(item => (
                (item.bookId == book_id) ? { ...item, amount: item.amount - 1 } : item
            ))
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(updateAmount));
            this.setState({
                items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : []
            })
        }
        else if (amount - 1 == 0) {
            updateAmount = this.state.items.filter(item => (item.bookId != book_id));
            localStorage.setItem('cart', JSON.stringify(updateAmount));
            this.setState({
                items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : []
            })
            this.props.handleCartRemove();
        }
        else {
            console.log('false');
        }
    }
    render() {

        return (
            <>
            <Container>
                <Row>
                    <Col md={9}>
                    <div className="table-users">
                            <table cellSpacing="1">
                                <thead>
                                <tr id="table-title" height="60px">
                                  <th width="230">Product </th>
                                  <th >Price</th>
                                  <th>Quantity</th>
                                  <th>Total</th>
                               </tr>
                                </thead>
                               
                               <tbody>
                               {this.state.items.map((result,index) => {
                                return (
                                    <tr>
                                    <td>
                                    <Row>
                                        <Col md={4}>
                                            <img src={"./img/"+result.book_cover_photo+".jpg"} alt="img" width="100%"/>
                                        </Col>
                                        <Col md={8}>
                                            <Row>
                                                <Col md={12}>
                                                <div>{result.book_title} </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div>Author name {result.bookId} </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    </td>
  
                                    <td>
                                        <h4>${result.sub_price} </h4>
                                    </td>
  
                                    <td>
                                        <div>
                                          <div className="product-details">
                                              <div className="add-to-cart">
                                                  <div className="qty-label">
                                                      <div className="input-number">
                                                          <input type="number" value={result.amount}/>
                                                          <span className="qty-up"
                                                          onClick={() => this.increaseValue(result.bookId,result.amount)}
                                                          >+</span>
                                                          <span className="qty-down"
                                                          onClick={() => this.decreaseValue(result.bookId,result.amount)}
                                                          
                                                          >-</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                          <h4>${Number(result.sub_price)*Number(result.amount)} </h4>
                                      </td>
                                 </tr>
                                 )})}
                               
                               </tbody>
                            </table>
                         </div>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}
