import React, { Component } from 'react'
import {Container, Row, Col,Button,Breadcrumb} from 'react-bootstrap';
import { UncontrolledCollapse } from 'reactstrap';
import Pagination from './Pagination';
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
            fillterVal: 'Default',
            checked: false
            
          }
          this.onChangePage = this.onChangePage.bind(this);
       }
      async componentDidMount() {
            await axios.get("http://127.0.0.1:8000/api/authors").then(response => {
                this.setState({ authors : response.data });
            })

            await axios.get("http://127.0.0.1:8000/api/categories").then(response => {
                this.setState({ categories : response.data });
            })
            await axios.get("http://127.0.0.1:8000/api/books/onsale").then(response => {
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
        });
        if(event.target.value == 1){
            await axios.get("http://127.0.0.1:8000/api/books/onsale").then(response => {
                this.setState({ exampleItems : response.data });
            })
        };
        if(event.target.value == 2){
            await axios.get("http://127.0.0.1:8000/api/books/popular").then(response => {
                this.setState({ exampleItems : response.data });
            })
        };
        if(event.target.value == 3){
            await axios.get("http://127.0.0.1:8000/api/books").then(response => {
                this.setState({ exampleItems : response.data.sort((a, b) => (Number(a.sub_price) > Number(b.sub_price)) ? 1 : -1) });
            })
        }
        if(event.target.value == 4){
            await axios.get("http://127.0.0.1:8000/api/books").then(response => {
                this.setState({ exampleItems : response.data.sort((a, b) => (Number(a.sub_price) < Number(b.sub_price)) ? 1 : -1) });
            })
        };
    }
    async filterCategory(e){
        await this.setState({
            fillterVal: e.target.value
        });
        if(this.state.sortState==1){
            await axios.get("http://127.0.0.1:8000/api/books/onsale").then(response => {
                this.setState({ exampleItems : response.data.filter(i => i.category_name.includes(e.target.value))});
            })
        }
        if(this.state.sortState==2){
            await axios.get("http://127.0.0.1:8000/api/books/popular").then(response => {
                this.setState({ exampleItems : response.data.filter(i => i.category_name.includes(e.target.value))});
            })
        }
        if(this.state.sortState==3){
            await axios.get("http://127.0.0.1:8000/api/books").then(response => {
                this.setState({ exampleItems : response.data.filter(i => i.category_name.includes(e.target.value)).sort((a, b) => (Number(a.sub_price) > Number(b.sub_price)) ? 1 : -1) });
            })
        }
        if(this.state.sortState==4){
            await axios.get("http://127.0.0.1:8000/api/books").then(response => {
                this.setState({ exampleItems : response.data.filter(i => i.category_name.includes(e.target.value)).sort((a, b) => (Number(a.sub_price) < Number(b.sub_price)) ? 1 : -1) });
            })
        }
        
    }
    async filterAuthor(e){
        await this.setState({
            fillterVal: e.target.value
        });
        if(this.state.sortState==1){
            await axios.get("http://127.0.0.1:8000/api/books/onsale").then(response => {
                this.setState({ exampleItems : response.data.filter(i => i.author_name.includes(e.target.value))});
            })
        }
        if(this.state.sortState==2){
            await axios.get("http://127.0.0.1:8000/api/books/popular").then(response => {
                this.setState({ exampleItems : response.data.filter(i => i.author_name.includes(e.target.value))});
            })
        }
        if(this.state.sortState==3){
            await axios.get("http://127.0.0.1:8000/api/books").then(response => {
                this.setState({ exampleItems : response.data.filter(i => i.author_name.includes(e.target.value)).sort((a, b) => (Number(a.sub_price) > Number(b.sub_price)) ? 1 : -1) });
            })
        }
        if(this.state.sortState==4){
            await axios.get("http://127.0.0.1:8000/api/books").then(response => {
                this.setState({ exampleItems : response.data.filter(i => i.author_name.includes(e.target.value)).sort((a, b) => (Number(a.sub_price) < Number(b.sub_price)) ? 1 : -1) });
            })
        }
        
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
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
                            {this.state.fillterVal} {this.state.sortState} {this.state.checked}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    </Col>
                    <Col md={3}>
                        <Row>
                            <Col md={12}>
                            <h2 class="title">Filter by</h2>
                            <div id="toggler" style={{background: "red"}} className="book-border"  >Categories</div>
                            <UncontrolledCollapse toggler="#toggler">
                                    {this.state.categories.map(cate=>{
                                        return(
                                            <>
                                                <div class="input-checkbox">
                                                    <input type="radio"
                                                        defaultChecked={this.state.checked}
                                                        id={cate.category_name} name="value" 
                                                        value={cate.category_name}
                                                        onChange={event => this.filterCategory(event)}
                                                    />
                                                    <label for={cate.category_name}>
                                                        <span></span>
                                                        {cate.category_name}
                                                    </label>
                                                </div>
                                            </>
                                        )
                                    })}
                                
                            </UncontrolledCollapse>
                            <div id="toggler1" className="book-border">Authur</div>
                            <UncontrolledCollapse toggler="#toggler1">
                            {this.state.authors.map(cate=>{
                                        return(
                                            <>
                                                <div class="input-checkbox">
                                                    <input type="radio" id={cate.author_name} name="value"
                                                    value={cate.author_name}
                                                    onChange={event => this.filterAuthor(event)}/>
                                                    <label for={cate.author_name}>
                                                        <span></span>
                                                        {cate.author_name}
                                                    </label>
                                                </div>
                                            </>
                                        )
                                    })}

                            </UncontrolledCollapse>
                            <div id="toggler2" className="book-border"  >Rating Review</div>
                            <UncontrolledCollapse toggler="#toggler2">
                            <div class="input-checkbox">
									<input type="radio" id="star-1" name="value"/>
									<label for="star-1">
										<span></span>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
									</label>
                                    
								</div>
								<div class="input-checkbox">
									<input type="radio" id="star-2" name="value"/>
									<label for="star-2">
										<span></span>
										    <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
									</label>
								</div>
								<div class="input-checkbox">
									<input type="radio" id="star-3" name="value"/>
									<label for="star-3">
										<span></span>
										    <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
									</label>
								</div>
								<div class="input-checkbox">
									<input type="radio" id="star-4" name="value"/>
									<label for="star-4">
										<span></span>
										<i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
									</label>
								</div>
								<div class="input-checkbox">
									<input type="radio" id="star-5" name="value"/>
									<label for="star-5">
										<span></span>
										<i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
									</label>
								</div>
                            </UncontrolledCollapse>

                            </Col>
                        </Row>
                    </Col>
                    <Col md={9}>
                        <Row>
                            <Col md={12}>
                                <div class="store-filter clearfix">
                                    <span class="store-qty">Showing 1-12 of 126 books</span>
                                    <div class="store-sort">
                                        <select class="input-select"
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
                                                <Col md={3}>
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
                                                        <Button className="add-to-cart-btn" href={"/book/"+result.id}><i class="fa fa-eye"></i>View</Button>
                                                    </div>
                                                </div>
                                                </div>
                                                </Col>
                                            )
                                        }else if(result.state == 0){
                                            return(
                                                <Col md={3}>
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
                                                         <h4 className="product-price">{result.sub_price}</h4>
                                                    </div>
                                                    <div className="add-to-cart">
                                                        <Button className="add-to-cart-btn" href={"/book/"+result.id}><i class="fa fa-eye"></i>View</Button>
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
