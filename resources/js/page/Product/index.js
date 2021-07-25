import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {Col,Container,Row,Button,Breadcrumb,Figure,Tabs,Tab} from 'react-bootstrap';
import {get} from '../httpHelper';
import Pagination from "react-js-pagination";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
export class Product extends Component {
    constructor() {
        super();
        this.state = {
            pageNo: 5,
            sortState: 'desc',
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            items: [],
            data: [],
            star: 'all',
            review_title: '',
            review_details: '',
            buyQuantity: 1,
            finalPrice: '',
            delPrice: '',
            id: 0,
            cartCount: 0,
            count_star:[]
            
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    async componentDidMount() {
        await this.setState({
            id: this.props.match.params.id
        })
        await get("/book/"+this.state.id).then(response => {
            this.setState({ data : response.data[0] });
            if(response.data[0].state == null || response.data[0].state == 0){
                this.setState({
                    finalPrice: response.data[0].sub_price
                })
            }else{
                this.setState({
                    finalPrice: response.data[0].sub_price,
                    delPrice: response.data[0].book_price,
                })
            }
        });
        await get("/book/reviews/"+this.state.id+"/"+this.state.star+"/"+this.state.pageNo+"/"+this.state.sortState+"?page="+this.state.activePage)
        .then(response => {
          this.setState({
                items: response.data.data,
                activePage: response.data.current_page,
                itemsCountPerPage: Number(response.data.per_page),
                totalItemsCount: response.data.total,
            
            });
        });
        await get("/book/reviewscount/"+this.state.id).then((response)=>{
            this.setState({
                count_star: response.data
            })
        })
    }
    handlePageChange(pageNumber) {
        get("/book/reviews/"+this.state.id+"/"+this.state.star+"/"+this.state.pageNo+"/"+this.state.sortState+"?page=" + pageNumber)
            .then(response => {
                this.setState({
                    items: response.data.data,
                    activePage: response.data.current_page,
                });
            })
    }
    async numOfComment(numOfpage,state){
            await this.setState({
                pageNo: Number(numOfpage),
                sortState: state,
                activePage: 1
            });
            get("/book/reviews/"+this.state.id+"/"+this.state.star+"/"+
                this.state.pageNo+"/"+this.state.sortState+"?page="+this.state.activePage)
                .then(response => {
                this.setState({
                      items: response.data.data,
                      activePage: response.data.current_page,
                      itemsCountPerPage: Number(response.data.per_page),
                      totalItemsCount: response.data.total,
                  
                  });
              });
       
    }
    async star(rating_star){
        await this.setState({
            star: rating_star,
            activePage: 1
        });
        get("/book/reviews/"+this.state.id+"/"+this.state.star+"/"+
        this.state.pageNo+"/"+this.state.sortState+"?page="+this.state.activePage)
        .then(response => {
        this.setState({
              items: response.data.data,
              activePage: response.data.current_page,
              itemsCountPerPage: Number(response.data.per_page),
              totalItemsCount: response.data.total,
          
          });
      });
    }
    async handldeform(e){
        e.preventDefault();
        await axios.post('http://127.0.0.1:8000/api/book/review', {
            book_id: this.state.id,
            review_title: e.target.review_title.value,
            review_details: e.target.review_details.value,
            rating_start: Number(e.target.rating_start.value)
          })
          .then(function (response) {
            toast.success('Your review has been saved!', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
          })
          .catch(function (error) {
            console.log(error);
          });
          await this.setState({
            review_title: '',
            review_details: '',
            activePage: 1,
            sortState: 'desc',
            star: e.target.rating_start.value,

        })
        await get("/book/reviews/"+this.state.id+"/"+this.state.star+"/"+this.state.pageNo+"/"+
                            this.state.sortState+"?page="+this.state.activePage)
        .then(response => {
          this.setState({
                items: response.data.data,
                activePage: response.data.current_page,
                itemsCountPerPage: Number(response.data.per_page),
                totalItemsCount: response.data.total,
            });
        });
    }
    handleReviewTitleChange (e){
        this.setState({
            review_title: e.target.value
        })
    }
    handleReviewDetailChange (e){
        this.setState({
            review_details: e.target.value
        })
    }
    increaseBuyQuantity(){
        if(this.state.buyQuantity < 8){
            this.setState((pre,a)=>{
                return{
                buyQuantity: pre.buyQuantity + 1
                }
            })
        }
    }
    decreaseBuyQuantity(){
        if(this.state.buyQuantity > 1){
            this.setState((pre,a)=>{
                return{
                buyQuantity: pre.buyQuantity - 1
                }
            })
        }
    }
    async addProduct (bookId, amount,book_title,author_name,sub_price,book_cover_photo){
        await this.props.handleAddToCart(bookId, amount,book_title,author_name,sub_price,book_cover_photo);
        toast.success('This book has been added to your cart!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    handleAmount(e){
        e.preventDefault();
    }
    render() {
        if(this.state.data){
            return (
                <>
                <Container>
                    <>
                    <ToastContainer />
                    <Row >
                        <Col md={12} >
                        <hr/>
                        <Breadcrumb>
                        <Breadcrumb.Item active>Category {this.state.data.category_name}</Breadcrumb.Item>
                        </Breadcrumb>
                        <hr/>
                         </Col>
                    <Col md={8}>
                        <Row>
                            <Col md={3}>
                            <Figure>
                                <Figure.Image
                                    width={130}
                                    height={190}
                                    alt="171x180"
                                    src={"../img/"+this.state.data.book_cover_photo+".jpg"}
                                />
                                <Figure.Caption>
                                By (author)     {this.state.data.author_name}
                                </Figure.Caption>
                            </Figure>
                            </Col>
                            <Col md={9}>
                                <Figure>
                                    <Figure.Caption>
                                    <h3>
                                    {this.state.data.book_title}
                                    </h3>
                                    </Figure.Caption>
                                    <Figure.Caption>
                                    {this.state.data.book_summary}
                                    </Figure.Caption>
                                    <Figure.Caption>
                                    <h4>Author biography</h4>
                                    {this.state.data.author_bio}
                                    </Figure.Caption>
                                </Figure>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                    <div>
                        <div className="product-details">
                                <div className="price">
                                    <h3 className="product-price">{this.state.finalPrice}<del className="product-old-price">{this.state.delPrice}</del></h3>
                                </div>
                                <div className="qty-label qty">
                                    Quantity
                                    <div className="input-number">
                                        <input type="number"
                                        onChange={(e)=>this.handleAmount(e)}
                                        value={this.state.buyQuantity}
                                        
                                        />
                                        <span className="qty-up"
                                        onClick={()=>this.increaseBuyQuantity()}
                                        >+</span>
                                        <span className="qty-down"
                                        onClick={()=>this.decreaseBuyQuantity()}
                                        >-</span>
                                    </div>
                                </div>
                                <br/>
                                    <button className="primary-btn" 
                                    onClick={()=>
                                        this.addProduct(this.state.id,
                                                        this.state.buyQuantity,
                                                        this.state.data.book_title,
                                                        this.state.data.author_name,
                                                        this.state.data.sub_price,
                                                        this.state.data. book_cover_photo)}
                                    >add to cart</button>
                                
                            </div>
                    </div>
                    </Col>
                        </Row>
                    <Row>
                        <Col md={8}>
                            <Row>
                                <Col md={12}>
                                    <h4>Customer Reviews (filer by {this.state.star} star)</h4>
                                    <h1>{Number(this.state.data.avg_star).toFixed(2)} Star</h1>
                                </Col>
                                <Col md={12}>
                                <Breadcrumb>
                                <Breadcrumb.Item onClick={() => this.star('all')}>
                                    All({this.state.count_star[0]})
                                </Breadcrumb.Item>
                                <Breadcrumb.Item onClick={() => this.star('1')}>
                                    1 STAR({this.state.count_star[1]})
                                </Breadcrumb.Item>
                                <Breadcrumb.Item onClick={() => this.star('2')}>
                                    2 STAR({this.state.count_star[2]})
                                </Breadcrumb.Item>
                                <Breadcrumb.Item onClick={() => this.star('3')}>
                                    3 STAR({this.state.count_star[3]})
                                </Breadcrumb.Item>
                                <Breadcrumb.Item onClick={() => this.star('4')}>
                                    4 STAR({this.state.count_star[4]})
                                </Breadcrumb.Item>
                                <Breadcrumb.Item onClick={() => this.star('5')}>
                                    5 STAR({this.state.count_star[5]})
                                </Breadcrumb.Item>
                                </Breadcrumb>
                                </Col>
                                <Row>
                <Col md={12}>
                    <div className="store-filter clearfix">
                        <span className="store-qty">Showing {this.state.pageNo*this.state.activePage-this.state.pageNo+1}-{this.state.pageNo*this.state.activePage} of {this.state.totalItemsCount} {this.state.demo}</span>
                        <div className="store-sort">
                            <select className="input-select"
                             onChange={event => this.numOfComment(this.state.pageNo,event.target.value)}
                             >
                                <option value="desc">Sort by date newest to oldest</option>
                                <option value="asc">Sort by date oldest to newest</option>
                            </select>
                            <select className="input-select"  
                            onChange={event => this.numOfComment(event.target.value,this.state.sortState)}>
                                <option value="5">show 5</option>
                                <option value="10">show 10</option>
                                <option value="15">show 15</option>
                                <option value="20">show 20</option>
                                <option value="50">show 50</option>
                            </select>
                        </div>
                    </div>
                </Col>
                <>
                <Col md={12}>
                    {this.state.items.map(item =>
                            <div key={item.id}>
                                <h4>Reviews Title {item.review_title} | {item.rating_start} star </h4> 
                                <div className="review-body">
                                    <p>{item.review_details} </p>
                                </div>
                                <div className="review-heading">
                                    <p className="date">{item.review_date}</p>
                                </div>
                                <hr/>
                            </div>
                    )}
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
               
                </>
            </Row>
                            </Row>
                        </Col>
                        <Col md={4}>
                        <div className="product-details">
                                    <div className="price">
                                    <h4 className="">write a review</h4>
                                    <hr/>                                    
                                    </div>
                                    <form onSubmit={(e)=> this.handldeform(e)}>
                                    <div className="qty-label qty">
                                        <label htmlFor="title">Add a title</label>
                                        <input 
                                        className="input" 
                                        value={this.state.review_title}
                                        onChange={(e)=>this.handleReviewTitleChange(e)}
                                        type="text" 
                                        name="review_title" 
                                        id="title" required/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <label htmlFor="des">Details please! Your review help other shoppers</label>
                                        <textarea className="input" name="review_details" cols="30" rows="7" required 
                                        value={this.state.review_details}
                                        onChange={(e)=>this.handleReviewDetailChange(e)}
                                        ></textarea>
                                        <label htmlFor="rate">Select a rating star</label>
                                        <select className="input" name="rating_start" id="rate">
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Star</option>
                                            <option value="3">3 Star</option>
                                            <option value="4">4 Star</option>
                                            <option value="5">5 Star</option>
                                        </select>
                                        
                                        
                                    </div>
                                    <div className="add-to-cart">
                                        <button type='submit' className="primary-btn">Submit review</button>
                                    </div>
                                    </form>
                        </div>
                        </Col>
                    </Row>
                    </>
                </Container>
                </>
            )
        }else{
            return(
                <h1>Không thấy cuốn sách này</h1>
            )
        }
        
    }
}

export default withRouter(Product); 
