import React, { Component } from 'react'
import {Col,Row} from 'react-bootstrap';
import Pagination from "react-js-pagination";
import {get} from "../httpHelper";
export class Comments extends Component {
    constructor() {
        super();
        this.state = {
        pageNo: 1,
        sortState: 'desc',
        activePage: 1,
        itemsCountPerPage: 1,
        totalItemsCount: 1,
        items: []
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    async componentDidMount() {
        await this.setState({idbook: this.props.id});
        get("/book/reviews/"+this.props.id+"/"+this.props.star+"/"+this.state.pageNo+"/"+
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
    handlePageChange(pageNumber) {
        get("/book/reviews/"+this.props.id+"/"+this.props.star+"/"+this.state.pageNo+"?page=" + pageNumber)
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
            get("/book/reviews/"+this.props.id+"/"+this.props.star+"/"+
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
    render() {
        return (
            <>
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
                                <option value="1">show 20</option>
                                <option value="4">show 50</option>
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
                </Col>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
                </>
            </Row>
            </>
        )
    }
}

export default Comments;
