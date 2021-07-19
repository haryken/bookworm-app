import React, { Component } from 'react'
import {Container, Row, Col,Button,Breadcrumb} from 'react-bootstrap';
import { UncontrolledCollapse } from 'reactstrap';
import {get} from "../httpHelper";
import Pagination from './Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export class Shop extends Component {
    constructor() {
        super();
        this.state = {
        categories: [],
        authors: [],
        exampleItems: [],
        pageOfItems: [],
        pageNo: 20,
        sortState: 1,
        fillterVal: ''
        }
        this.onChangePage = this.onChangePage.bind(this);
    }
    async componentDidMount() {
            await get("/authors").then(response => {
                this.setState({ authors : response.data });
            })

            await get("/categories").then(response => {
                this.setState({ categories : response.data });
            })
            await get("/books/onsale").then(response => {
                this.setState({ exampleItems : response.data });
            })

    }
    async numOfComment(event){
            await this.setState({
                pageNo: Number(event.target.value)
            });
       
    }
    async sortBook(event){
        await this.setState({
            sortState: event.target.value,
            fillterVal: ''
        });
        if(event.target.value == 1){
            get("/books/onsale").then(response => {
                this.setState({ exampleItems : response.data });
            })
        };
        if(event.target.value == 2){
            get("/books/popular").then(response => {
                this.setState({ exampleItems : response.data });
            })
        };
        if(event.target.value == 3){
            get("/books").then(response => {
                this.setState({ exampleItems : response.data.sort((a, b) =>
                     (Number(a.sub_price) > Number(b.sub_price)) ? 1 : -1) });
            })
        }
        if(event.target.value == 4){
            get("/books").then(response => {
                this.setState({ exampleItems : response.data.sort((a, b) => 
                    (Number(a.sub_price) < Number(b.sub_price)) ? 1 : -1) });
            })
        };
    }
    async filterCategory(e){
        await this.setState({
            fillterVal:"Category: " + e.target.value
        });
        if(this.state.sortState==1){
            get("/books/onsale").then(response => {
                this.setState({ exampleItems : response.data.filter(i =>
                     i.category_name.includes(e.target.value))});
            })
        }
        if(this.state.sortState==2){
            get("/books/popular").then(response => {
                this.setState({ exampleItems : response.data.filter(i =>
                     i.category_name.includes(e.target.value))});
            })
        }
        if(this.state.sortState==3){
           get("/books").then(response => {
                this.setState({ exampleItems : response.data.filter(i =>
                     i.category_name.includes(e.target.value)).sort((a, b) =>
                      (Number(a.sub_price) > Number(b.sub_price)) ? 1 : -1) });
            })
        }
        if(this.state.sortState==4){
            get("/books").then(response => {
                this.setState({ exampleItems : response.data.filter(i =>
                     i.category_name.includes(e.target.value)).sort((a, b) =>
                      (Number(a.sub_price) < Number(b.sub_price)) ? 1 : -1) });
            })
        }
        
    }
    async filterAuthor(e){
        await this.setState({
            fillterVal: "Authur: " + e.target.value
        });
        if(this.state.sortState==1){
            get("/books/onsale").then(response => {
                this.setState({ exampleItems : response.data.filter(i =>
                     i.author_name.includes(e.target.value))});
            })
        }
        if(this.state.sortState==2){
            get("/books/popular").then(response => {
                this.setState({ exampleItems : response.data.filter(i =>
                     i.author_name.includes(e.target.value))});
            })
        }
        if(this.state.sortState==3){
            get("/books").then(response => {
                this.setState({ exampleItems : response.data.filter(i =>
                     i.author_name.includes(e.target.value)).sort((a, b) =>
                      (Number(a.sub_price) > Number(b.sub_price)) ? 1 : -1) });
            })
        }
        if(this.state.sortState==4){
            get("/books").then(response => {
                this.setState({ exampleItems : response.data.filter(i =>
                     i.author_name.includes(e.target.value)).sort((a, b) =>
                      (Number(a.sub_price) < Number(b.sub_price)) ? 1 : -1) });
            })
        }
        
    }
    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }
    render() {
        return (
            <>
            <Container>
                <Row>
                    <Col md={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Book</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.state.fillterVal}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    </Col>
                    <Col md={3}>
                        <Row>
                            <Col md={12}>
                            <h2 className="title">Filter by</h2>
                            <div id="toggler" className="book-border">Categories</div>
                            <UncontrolledCollapse toggler="#toggler">
                            {this.state.categories.map(cate=>{
                                return(
                                <button className="btn btn-light"
                                style={{width:"100%"}}
                                key={cate.category_name}
                                value={cate.category_name}
                                onClick={event => this.filterCategory(event)}>
                                {cate.category_name}
                                </button>
                                )
                            })}
                            </UncontrolledCollapse>
                            <div id="toggler1" className="book-border">Authur</div>
                            <UncontrolledCollapse toggler="#toggler1">
                            {this.state.authors.map(cate=>{
                                return(
                                <button className="btn btn-light"
                                style={{width:"100%"}}
                                key={cate.author_name}
                                value={cate.author_name}
                                onClick={event => this.filterAuthor(event)}>
                                {cate.author_name}
                                </button>
                                )
                            })}
                            </UncontrolledCollapse>
                            <div id="toggler2" className="book-border">Rating Review</div>
                            <UncontrolledCollapse toggler="#toggler2">
                                <button className="btn btn-light"
                                style={{width:"100%"}}
                                value='1'>
                                1 Star
                                </button>
                                <button className="btn btn-light"
                                style={{width:"100%"}}
                                value='2'>
                                2 Star
                                </button>
                                <button className="btn btn-light"
                                style={{width:"100%"}}
                                value='3'>
                                3 Star
                                </button>
                                <button className="btn btn-light"
                                style={{width:"100%"}}
                                value='4'>
                                4 Star
                                </button>
                                <button className="btn btn-light"
                                style={{width:"100%"}}
                                value='5'>
                                5 Star
                                </button>
                            </UncontrolledCollapse>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col md={12}>
                                <div className="store-filter clearfix">
                                    <span className="store-qty">Showing 1-12 of 126 books</span>
                                    <div className="store-sort">
                                        <select className="input-select"
                                        value={this.state.sortState} 
                                        onChange={event => this.sortBook(event)}>
                                            <option value="1">Sort by on sale</option>
                                            <option value="2">Sort by popularity</option>
                                            <option value="3">Sort by price low to high</option>
                                            <option value="4">Sort by price high to low</option>
                                        </select>
                                        <select className="input-select"  onChange={event => this.numOfComment(event)}>
                                            <option value="20">show 20</option>
                                            <option value="50">show 50</option>
                                        </select>
                                    </div>
                                </div>   
                            </Col>
                            <Col md={12}>
                                <Row>
                                    {this.state.pageOfItems.map((result,index) =>{
                                        if(result.state == 1){
                                            return(
                                                <Col md={3} key={result.book_summary}>
                                                <div key={result.id}>
                                                <div className="product">
                                                    <div className="product-img">
                                                        <img src={"./img/"+result.book_cover_photo+".jpg"} height="200px" alt=""/>
                                                    </div>
                                                    <div className="product-body" style={{height: "100px"}}>
                                                        <h3 className="product-name">{result.book_title}</h3>
                                                        <p className="author-name">   {result.author_name}</p>
                                                    </div>
                                                    <div className="product-body">
                                                         <h4 className="product-price">{result.sub_price} <del className="product-old-price">{result.book_price}</del></h4>
                                                    </div>
                                                    <div className="add-to-cart">
                                                        <Button className="add-to-cart-btn" href={"/book/"+result.id}><i className="fa fa-eye"></i>View</Button>
                                                    </div>
                                                </div>
                                                </div>
                                                </Col>
                                            )
                                        }else if(result.state == 0){
                                            return(
                                                <Col md={3} key={result.book_title}>
                                                <div>
                                                <div className="product">
                                                    <div className="product-img">
                                                        <img src={"./img/"+result.book_cover_photo+".jpg"} height="200px" alt=""/>
                                                    </div>
                                                    <div className="product-body" style={{height: "100px"}}>
                                                        <h3 className="product-name">{result.book_title}</h3>
                                                        <p className="author-name">   {result.author_name}</p>
                                                        
                                                    </div>
                                                    <div className="product-body">
                                                         <h4 className="product-price">{result.sub_price}</h4>
                                                    </div>
                                                    <div className="add-to-cart">
                                                        <Button className="add-to-cart-btn" href={"/book/"+result.id}><i className="fa fa-eye"></i>View</Button>
                                                    </div>
                                                </div>
                                                </div>
                                                </Col>
                                            )
                                        }
                                        
                                    }
                                    )}
                                    {this.state.pageNo == '20' && <Pagination  items={this.state.exampleItems} pageSize ={Number(20)}  onChangePage={this.onChangePage} />}
                                    {this.state.pageNo == '50' && <Pagination  items={this.state.exampleItems} pageSize ={Number(50)}  onChangePage={this.onChangePage} />}
                                </Row>
                            </Col>
                        </Row>
                      
                    </Col>
                </Row>
            </Container>
            
            
            </>
        )
    }
}

export default Shop
