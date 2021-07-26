import React, { Component } from 'react';
import {get} from '../httpHelper';
import {Col,Container,Row,Table,Figure} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [],
        carts: [],
        amounts: [],
        total: 0.0,
        cartCount: localStorage.getItem('cart_count')!==null?parseInt(localStorage.getItem('cart_count')):0,
        };
    }
    componentDidMount(){
        let totalcost = 0.0;
        this.state.items.map((re,i)=>{
            totalcost = totalcost + Number(re.amount)*Number(re.sub_price)
        })
        this.setState({
            total: totalcost.toFixed(2)
        })
    }
    componentWillUnmount() {
        this._mounted = false;
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    increaseValue(book_id,amount){    
        if (amount  <= 7) {
            let updateAmount = this.state.items.map(item => (
                (item.bookId == book_id) ? { ...item, amount: item.amount + 1 } : item
            ))
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(updateAmount));
            
            let items = JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [];
            let totalcost = 0.0;
            items.map((re,i)=>{
                totalcost = totalcost + Number(re.amount)*Number(re.sub_price)
            })
            this.setState({
                items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [],
                total: totalcost.toFixed(2)

            })
        }
        else {
            console.log('false');
        }
        
    }
    deleteItem(book_id){
        let updateAmount = this.state.items.filter(item => (item.bookId != book_id));
        localStorage.setItem('cart', JSON.stringify(updateAmount));
        localStorage.setItem('cart_count',localStorage.getItem('cart')!==null?JSON.parse(localStorage.getItem('cart')).length:0);
        this.props.handleCartRemove();
    }
    updateAll(){
        let totalcost = 0.0;
        localStorage.setItem('cart_count',localStorage.getItem('cart')!==null?JSON.parse(localStorage.getItem('cart')).length:0);
        let item = JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [];
        item.map((re,i)=>{
            totalcost = totalcost + Number(re.amount)*Number(re.sub_price)
        })
        this.setState({
        })
        this.setState({
            total: totalcost.toFixed(2),
            items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [],
            cartCount: localStorage.getItem('cart_count')!==null?parseInt(localStorage.getItem('cart_count')):0,
        })
        this.props.handleCartRemove();
    }
    updateItemCount(book_id){
        let updateAmount = this.state.items.map(item => (
            (item.bookId == book_id) ? { ...item, amount: item.amount - 1 } : item
        ))
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(updateAmount));
    }
    decreaseValue(book_id,amount){
        if (amount - 1 > 0) {
            this.updateItemCount(book_id);
            this.updateAll();
        }
        else if (amount - 1 == 0) {
            this.deleteItem(book_id);
            this.updateAll();
            toast.success('This book has been remove!', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            console.log('false');
        }
    }
    inputChangedHandler(e){
        e.defaultValue();
    }
    handlePlaceOrder(){
        let items = JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [];
        let order_items = [];
        if(items.length == 0){
            toast.error('Your cart is empty!', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            items.map((value)=>{
                order_items.push({
                'book_id': value.bookId,
                'quantity': value.amount,
                'price': value.sub_price,
                'book_title': value.book_title
                });
            }),
            axios.post('/api/orders',{
                items: order_items
            })
            .then((response) => {
                    localStorage.removeItem('cart');
                    this.updateAll();
                    this.timer = setTimeout(function () {
                        window.location = '/'
                    }, 10000);
                    toast.success('Order successfull!', {
                        position: "bottom-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            .catch(error => {
                let unavailable_book = error.response.data.unavailable_book;
                let invalid_quantity = error.response.data.invalid_quantity;
                if (unavailable_book.length !== 0) {
                    unavailable_book.map((book,index)=>{
                        this.deleteItem(book.book_id);
                    })
                    toast.error("Some books unavailable!", {
                        position: "bottom-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.updateAll()

                }
                if (invalid_quantity.length !== 0) {
                    invalid_quantity.map((book,index)=>{
                        this.deleteItem(book.book_id);
                    })
                    toast.error("Some books wrong amount!", {
                        position: "bottom-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.updateAll()

                }
                
            });
        }

    }
    render() {
            return (
                <>
                <Container>
                    <Row>
                        <ToastContainer />
                        <Col md={12}>
                        <hr/>    
                        <h5>
                            Item totals: {this.state.cartCount}
                            
                        </h5>
                        <hr/>    
                        </Col>
                        <Col md={9}>
                            <Table>
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
                                            <tr key={result.book_title}>
                                            <td>
                                            <Row>
                                                <Col md={6}>
                                                <Figure>
                                                    <Figure.Image
                                                        width={130}
                                                        height={190}
                                                        alt="171x180"
                                                        src={"../img/"+result.book_cover_photo+".jpg"}
                                                    />
                                                    <Figure.Caption>
                                                    By (author)     {result.author_name}
                                                    </Figure.Caption>
                                                </Figure>
                                                </Col>
                                                <Col md={6}>
                                                    <Row>
                                                        <Col md={12}>
                                                        <p className="book-title">{result.book_title}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            </td>
                                            <td>
                                                <h4>${result.sub_price} </h4>
                                            </td>
          
                                            <td>
                                            <div className="product-details">
                                                    <div className="add-to-cart">
                                                        <div className="qty-label">
                                                            <div className="input-number">
                                                                <input 
                                                                type="number"
                                                                value="1"
                                                                value={result.amount}
                                                                onChange={(event)=>this.inputChangedHandler(event)}
                                                                />
                                                                <span className="qty-up" onClick={() => this.increaseValue(result.bookId,result.amount)}>+</span>
                                                                <span className="qty-down" onClick={() => this.decreaseValue(result.bookId,result.amount)}>-</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </td>
                                              <td>
                                                  <h4>${Number(result.sub_price*result.amount).toFixed(2)} </h4>
                                              </td>
                                         </tr>
                                         )
                                    })}
                                   
                                   </tbody>
    
                            </Table>
                               
                        </Col>
                        <Col md={3}>
                        <Table>
                                    <thead>
                                            <tr height="60px">
                                                <th colSpan="2"><h3>Cart totals</h3>  </th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                 <div><strong>TOTAL</strong></div>
                                            </td>
                                            <td>
                                                <div><strong className="order-total">${this.state.total}</strong></div>
                                            </td>
                                        </tr>
                                    </tbody>
                        </Table>
                            <button 
                            className="primary-btn" 
                            onClick={()=>this.handlePlaceOrder()}
                            >
                                PLACE ORDER
                            </button>
                        </Col>
                    </Row>
                </Container>
                </>
            )
        
    }
}
