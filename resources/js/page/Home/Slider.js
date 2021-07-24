import React, { Component } from 'react'
import { BsChevronRight, BsChevronLeft, } from "react-icons/bs";
import {Link} from "react-router-dom";
import {Col,Container,Row,Button,Carousel} from 'react-bootstrap';
export default class Slider extends Component {
    constructor(props) {
        super(props);

    }
    showBooks() {
        const chunk = (array, size) => {
            const chunkedArray = []
            for (var i = 0; i < array.length; i += size) {
                chunkedArray.push(array.slice(i, i + size))
            }
            return chunkedArray
        }
        let books = this.props.books;
        books = chunk(books, 4);

        if (books instanceof Array) {
            return books.map(function (chunkBook, chunkIndex) {
                return (
                    <div className={"carousel-item " + ((chunkIndex == 0) ? "active" : "")} key={chunkIndex}>
                        <div className="row" >
                            {chunkBook.map(function (result, i) {
                                //console.log(product);
                                return (
                                    <Col md={3}>
                                        <div className="product" key={result.book_title}>
                                            <div className="product-img">
                                                <img src={"./img/"+result.book_cover_photo+".jpg"} height="300px" alt=""/>
                                            </div>
                                            <div className="product-body" style={{height: "150px"}}>
                                                <Link to={"/book/"+result.id}>{result.book_title}</Link>
                                                <p className="author-name">   {result.author_name}</p>
                                                <h4 className="product-price">{result.sub_price} <del className="product-old-price">{result.book_price}</del></h4>
                                            </div>
                                        </div>
                                    </Col>
                                       

                                );
                            })}
                        </div>
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div id="book-slide" className="row d-flex align-items-center carousel slide" data-ride="carousel">
                <div className="col-lg-1">
                    <a href="#book-slide" data-slide="prev">
                        <BsChevronLeft size="2em"></BsChevronLeft>
                    </a>
                </div>
                <div className="container">
                    <div className="col-lg-12">
                        <div className="carousel-inner" style={{ padding: "25px 0px" }}>
                            {this.showBooks()}
                        </div>
                    </div>
                </div>
                <div className="col-lg-1">
                    <a href="#book-slide" data-slide="next">
                        <BsChevronRight size="2em"></BsChevronRight>
                    </a>
                </div>
            </div>
        )
    }
}
