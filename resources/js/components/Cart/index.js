import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {get} from '../httpHelper';
import {Col,Container,Row,Button,Breadcrumb,Figure,Tabs,Tab} from 'react-bootstrap';
export default class Cart extends Component {
    state = {
        items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [],
        carts: [],
        amounts: [],
        total: 0.0,
        msg: "",
    }
    componentDidMount(){
        let totalcost = 0;
        this.state.items.map((re,i)=>{
            totalcost = totalcost + Number(re.amount)*Number(re.sub_price)
        })
        this.setState({
            total: totalcost.toFixed(2)
        })
    }
    increaseValue = (book_id,amount) => {    
        if (amount + 1 <= 8) {

            let updateAmount = this.state.items.map(item => (
                (item.bookId == book_id) ? { ...item, amount: item.amount + 1 } : item
            ))
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(updateAmount));
            this.setState({
                items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [],
            })
            let k = JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [];
            let totalcost = 0.0;
            k.map((re,i)=>{
                totalcost = totalcost + Number(re.amount)*Number(re.sub_price)
            })
            this.setState({
                total: totalcost.toFixed(2)
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
            let totalcost = 0.0;
            let k = JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [];
            k.map((re,i)=>{
                totalcost = totalcost + Number(re.amount)*Number(re.sub_price)
            })
            this.setState({
                items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [],
                total: totalcost.toFixed(2)
            })
            
        }
        else if (amount - 1 == 0) {
            updateAmount = this.state.items.filter(item => (item.bookId != book_id));
            localStorage.setItem('cart', JSON.stringify(updateAmount));
            let totalcost = 0.0;
            let k = JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [];
            k.map((re,i)=>{
                totalcost = totalcost + Number(re.amount)*Number(re.sub_price)
            })
            this.setState({
                items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [],
                total: totalcost.toFixed(2)
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
                            <table>
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
                                          <h4>${Number(result.sub_price*result.amount).toFixed(2)} </h4>
                                      </td>
                                 </tr>
                                 )})}
                               
                               </tbody>
                            </table>
                         </div>
                    </Col>
                    <Col md={3}>
							<h3 className="title">Cart totals</h3>
						<div className="order-summary">
							<div className="order-col">
								<div><strong>TOTAL</strong></div>
								<div><strong className="order-total">${this.state.total}</strong></div>
							</div>
						</div>
				
						<a href="#" className="primary-btn order-submit" style={{width:"100%"}}>Place order</a>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}
