import React, { Component } from 'react';
import {get} from '../httpHelper';
import {Col,Container,Row,Table,Figure,Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
export default class Cart extends Component {
    state = {
        items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [],
        carts: [],
        amounts: [],
        total: 0.0,
        cartCount: localStorage.getItem('cart_count')!==null?parseInt(localStorage.getItem('cart_count')):0
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
    decreaseValue(book_id,amount){
        let updateAmount;
        if (amount - 1 > 0) {

            updateAmount = this.state.items.map(item => (
                (item.bookId == book_id) ? { ...item, amount: item.amount - 1 } : item
            ))
            localStorage.removeItem('cart');
            localStorage.setItem('cart', JSON.stringify(updateAmount));
            let totalcost = 0.0;
            let item = JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [];
            item.map((re,i)=>{
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
            localStorage.setItem('cart_count',localStorage.getItem('cart')!==null?JSON.parse(localStorage.getItem('cart')).length:0);

            let totalcost = 0.0;
            let item = JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [];
            item.map((re,i)=>{
                totalcost = totalcost + Number(re.amount)*Number(re.sub_price)
            })
            this.setState({
                items: JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart')) : [],
                total: totalcost.toFixed(2),
                cartCount: localStorage.getItem('cart_count')!==null?parseInt(localStorage.getItem('cart_count')):0
            })
            this.props.handleCartRemove();
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
        console.log("click")
    }
    render() {
        if(this.state.cartCount>0){
            return (
                <>
                <Container>
                    <Row>
                        <ToastContainer />
                        <Col md={12}>
                        <h3>
                            Item totals: {this.state.cartCount}
                            
                        </h3>
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
                                                <th colSpan="2">Cart totals </th>
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
        }else{
            return(
                <>
                <Container>
                    <Row>
                <p>Không có cuốn sách nào được chọn</p>

                    </Row>
                </Container>
                </>
            )
        }
        
    }
}
