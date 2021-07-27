import React, { Component } from 'react'
import {Container, Row, Col,Breadcrumb,Accordion,Card} from 'react-bootstrap';
import { Button, Card as Ca, CardBody, CardText, CardGroup, CardTitle } from 'reactstrap';
import {get} from "../httpHelper";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import ReactTooltip from 'react-tooltip';
export class Shop extends Component {
    constructor() {
        super();
        this.state = {
        categories: [],
        authors: [],
        pageNo: 5,
        activePage: 1,
        items: [],
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        sortPage: 'onsale',
        filerValue: "",
        Label: ""
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    async componentDidMount() {
            await get("/authors").then(response => {
                this.setState({ authors : response.data });
            })

            await get("/categories").then(response => {
                this.setState({ categories : response.data });
            })
            await get("/books/"+this.state.sortPage+"/"+this.state.pageNo+"?page="+this.state.activePage).then(response => {
                this.setState({ 
                    items: response.data.data,
                    activePage: response.data.current_page,
                    itemsCountPerPage: Number(response.data.per_page),
                    totalItemsCount: response.data.total,
                });
            })

    }
    handlePageChange(pageNumber) {
        get("/books/"+this.state.sortPage+"/"+this.state.pageNo+this.state.filerValue+"?page="+ pageNumber)
            .then(response => {
                this.setState({
                    items: response.data.data,
                    activePage: response.data.current_page
                });
            })
    }
    async sortPage(panovalue,sortvalue){
        await this.setState({
            pageNo: panovalue,
            sortPage: sortvalue,
            activePage: 1
        });
        await get("/books/"+this.state.sortPage+"/"+this.state.pageNo+this.state.filerValue+"?page="+this.state.activePage).then(response => {
            this.setState({ 
                items: response.data.data,
                activePage: response.data.current_page,
                itemsCountPerPage: Number(response.data.per_page),
                totalItemsCount: response.data.total,
            });
        })
    }
    async handelFilter(id,filterLable){
        await this.setState({
            filerValue: id,
            activePage: 1,
            Label: filterLable
        });
        get("/books/"+this.state.sortPage+"/"+this.state.pageNo+this.state.filerValue+"?page="+this.state.activePage).then(response => {
            this.setState({ 
                items: response.data.data,
                activePage: response.data.current_page,
                itemsCountPerPage: Number(response.data.per_page),
                totalItemsCount: response.data.total,
            });
        })
    }
    async clearFilter(){
        await this.setState({
            filerValue: '',
            activePage: 1,
            Label: ''
        })
        get("/books/"+this.state.sortPage+"/"+this.state.pageNo+this.state.filerValue+"?page="+this.state.activePage).then(response => {
            this.setState({ 
                items: response.data.data,
                activePage: response.data.current_page,
                itemsCountPerPage: Number(response.data.per_page),
                totalItemsCount: response.data.total,
            });
        })
    }
    render() {
        return (
            <>
            <Container>
                <Row>
                    <Col md={12} >
                        <hr/>
                        <Breadcrumb>
                        <Breadcrumb.Item active>Books  {this.state.Label}</Breadcrumb.Item>
                        </Breadcrumb>
                        <hr/>
                    </Col>
                    <Col md={3}>
                        <Row>
                            <Col md={12}>
                                <CardGroup>
                                <Ca>
                                    <CardBody data-tip='' data-for="close"
                                    onClick={()=>this.clearFilter()}
                                    >
                                    <CardText>Filter by</CardText>
                                    <ReactTooltip id="close" getContent={() => { return "Clear filter" }}/>
                                    </CardBody>
                                </Ca>
                                </CardGroup>
                            </Col>
                            <Col md={12}>
                                <Accordion>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            Category
                                        </Accordion.Toggle>

                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                            {this.state.categories.map(cate=>{
                                            return(
                                            <div key={cate.category_name} 
                                            onClick={event => this.handelFilter("/category/"+cate.id,'filter by Category '+cate.category_name)}
                                            >
                                                Category {cate.category_name}
                                            <hr/>
                                            </div>
                                            )
                                        })}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1">
                                            Author
                                        </Accordion.Toggle>

                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                            {this.state.authors.map(cate=>{
                                            return(
                                            <div key={cate.author_name}
                                            onClick={event => this.handelFilter("/author/"+cate.id,'filter by Author '+cate.author_name)}
                                            >
                                                {cate.author_name}
                                            <hr/>
                                            </div>
                                            )
                                        })}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="3">
                                            Rating reviews
                                        </Accordion.Toggle>

                                        <Accordion.Collapse eventKey="3">
                                            <Card.Body>
                                            <div 
                                        onClick={event => this.handelFilter("/star/1",'filter by 1 Star')}>
                                            1 Star
                                        <hr/>
                                        </div>
                                        <div onClick={event => this.handelFilter("/star/2",'filter by 2 Star')}
                                        >
                                            2 Star
                                        <hr/>
                                        </div>
                                        <div
                                        onClick={event => this.handelFilter("/star/3",'filter by 3 Star')}>
                                            3 Star
                                        <hr/>
                                        </div>
                                        <div 
                                        onClick={event => this.handelFilter("/star/4",'filter by 4 Star')}>
                                            4 Star
                                        <hr/>
                                        </div>
                                        <div
                                        onClick={event => this.handelFilter("/star/5",'filter by 5 Star')}>
                                            5 Star
                                        <hr/>
                                        </div>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col md={12}>
                                <div className="store-filter clearfix">
                                    <span className="store-qty">Showing {this.state.pageNo*this.state.activePage-this.state.pageNo+1}-{this.state.pageNo*this.state.activePage} of {this.state.totalItemsCount} {this.state.demo}</span>
                                    <div className="store-sort">
                                        <select className="input-select"
                                             onChange={event => this.sortPage(this.state.pageNo,event.target.value)}
                                        >
                                            <option value="onsale">Sort by on sale</option>
                                            <option value="popular">Sort by popularity</option>
                                            <option value="all/asc">Sort by price low to high</option>
                                            <option value="all/desc">Sort by price high to low</option>
                                        </select>
                                        <select className="input-select"  
                                            onChange={event => this.sortPage(event.target.value,this.state.sortPage)}
                                        >   <option value="5">show 5</option>
                                            <option value="10">show 10</option>
                                            <option value="15">show 15</option>
                                            <option value="20">show 20</option>
                                            <option value="25">show 25</option>
                                        </select>
                                    </div>
                                </div>   
                            </Col>
                            <Col md={12}>
                                <Row>
                                    {this.state.items.map((result,index) =>{
                                        if(result.state == 1){
                                            return(
                                                <Col md={3} key={result.book_summary}>
                                                <div key={result.id}>
                                                <div className="product">
                                                    <div className="product-img">
                                                        <img src={result.book_cover_photo? "./img/"+result.book_cover_photo+".jpg":"./img/default.jpg"} height="200px" alt=""/>
                                                    </div>
                                                    <div className="product-body" style={{height: "150px"}}>
                                                        <p className="author-name">   {result.author_name}</p>
                                                        <p data-tip='' data-for={result.book_title}><Link to={"/book/"+result.id}>{result.book_title}</Link></p>
                                                        <ReactTooltip id={result.book_title} getContent={() => { return "View detail" }}/>
                                                    </div>
                                                    <div className="product-body">
                                                         <h4 className="product-price"><del className="product-old-price">${result.book_price}</del>${result.sub_price} </h4>
                                                    </div>
                                                </div>
                                                </div>
                                                </Col>
                                            )
                                        }else if(result.state == 0 || result.state == null){
                                            return(
                                                <Col md={3} key={result.book_title}>
                                                <div>
                                                <div className="product">
                                                    <div className="product-img">
                                                        <img src={result.book_cover_photo? "./img/"+result.book_cover_photo+".jpg":"./img/default.jpg"}  height="200px" alt=""/>
                                                    </div>
                                                    <div className="product-body" style={{height: "150px"}}>
                                                        <p className="author-name">{result.author_name}</p>
                                                        <p data-tip='' data-for={result.book_title}><Link to={"/book/"+result.id}>{result.book_title}</Link></p>
                                                        <ReactTooltip id={result.book_title} getContent={() => { return "View detail" }}/>
                                                        
                                                    </div>
                                                    <div className="product-body">
                                                         <h4 className="product-price">${result.sub_price}</h4>
                                                    </div>
                                                </div>
                                                </div>
                                                </Col>
                                            )
                                        }
                                        
                                    }
                                    )}
                                   
                                </Row>
                                <div id="react-paginate">
                                <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemsCountPerPage}
                                        totalItemsCount={this.state.totalItemsCount}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange}
                                    />
                                </div>
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
