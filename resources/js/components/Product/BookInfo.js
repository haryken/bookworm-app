import React, { Component } from 'react'
import {Col,Container,Row,Button,Breadcrumb,Figure,Tabs,Tab} from 'react-bootstrap';
import axios from 'axios';
import {get} from '../httpHelper'
import { result } from 'lodash';
export class BookInfo extends Component {
    constructor() {
        super();
        this.state = {
          data: [],
          url: ""
        }
    }
    componentDidMount() {
        get("/book/"+this.props.id).then(response => {
          this.setState({ data : response.data });
        });
    }
    render() {
        return (
            <>
            {this.state.data.map((book) => {
                return (
                        <Row  key={book.book_title}>
                        <Col md={12} >
                        <Breadcrumb>
                        <Breadcrumb.Item active>Category {book.category_name}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={3}>
                            <Figure>
                                <Figure.Image
                                    width={130}
                                    height={190}
                                    alt="171x180"
                                    src={"../img/"+book.book_cover_photo+".jpg"}
                                />
                                <Figure.Caption>
                                By (author)     {book.author_name}
                                </Figure.Caption>
                            </Figure>
                            </Col>
                            <Col md={9}>
                                <Figure>
                                    <Figure.Caption>
                                    <h3>
                                    {book.book_title}
                                    </h3>
                                    </Figure.Caption>
                                    <Figure.Caption>
                                    {book.book_summary}
                                    </Figure.Caption>
                                    <Figure.Caption>
                                    <h4>Author biography</h4>
                                    {book.author_bio}
                                    </Figure.Caption>
                                </Figure>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <div className="product-details">
                                <div className="price">
                                    <h3 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h3>
                                </div>
                                <div className="qty-label qty">
                                    Quantity
                                    <div className="input-number">
                                        <input type="number"/>
                                        <span className="qty-up">+</span>
                                        <span className="qty-down">-</span>
                                    </div>
                                </div>
                                <div className="add-to-cart">
                                    <button className="add-to-cart-btn">add to cart</button>
                                </div>
                            </div>
                    </Col>
                        </Row>
                )})}
            </>
        )
    }
}

export default BookInfo
