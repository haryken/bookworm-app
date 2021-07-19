import React, { Component } from 'react'
import {Col,Container,Row,Button,Breadcrumb,Figure,Tabs,Tab} from 'react-bootstrap';
import Pagination from './Pagination';
import axios from 'axios';
import { event } from 'jquery';
// /200/3
export class Comments extends Component {
    constructor() {
        super();
        this.state = {
        activePage: 15,
        exampleItems: [],
        pageOfItems: [],
        pageNo: 1,
        sortState: 1
        }
        this.onChangePage = this.onChangePage.bind(this);
    }
    async componentDidMount() {
        await this.setState({idbook: this.props.id});
        axios.get("http://127.0.0.1:8000/api/book/reviews/"+this.props.id+"/"+this.props.star).then(response => {
          this.setState({ exampleItems : response.data.sort((a, b) => (a.review_date > b.review_date) ? 1 : -1) });
        });
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    async numOfComment(event){
        if(this.state.sortState == '1'){
            await this.setState({
                pageNo: Number(event.target.value)
            });
            
        }else{
            await this.setState({
                pageNo: Number(event.target.value)
            });
            
        }
       
    }
    async sortDate(event){
        if(event.target.value == 1){
            await this.setState({
                sortState: event.target.value
            });
            axios.get("http://127.0.0.1:8000/api/book/reviews/"+this.props.id+"/"+this.props.star).then(response => {
          this.setState({ exampleItems : response.data.sort((a, b) => (a.review_date > b.review_date) ? 1 : -1) });
        });
           
        }
        else{
            await this.setState({
                sortState: event.target.value
            });
            axios.get("http://127.0.0.1:8000/api/book/reviews/"+this.props.id+"/"+this.props.star).then(response => {
          this.setState({ exampleItems : response.data.sort((a, b) => (a.review_date < b.review_date) ? 1 : -1) });
        });
        }
    }
    render() {
        return (
            <>
            <Row>
                <Col md={12}>
                    <div className="store-filter clearfix">
                        <span className="store-qty">Showing 1-12 of 126 comments</span>
                        <div className="store-sort">
                            <select className="input-select"
                             value={this.state.sortState} 
                             onChange={event => this.sortDate(event)}>
                                <option value="1">Sort by date newest to oldest</option>
                                <option value="2">Sort by date oldest to newest</option>
                            </select>
                            <select className="input-select"  onChange={event => this.numOfComment(event)}>
                                <option value="1">show 20</option>
                                <option value="2">show 50</option>
                            </select>
                        </div>
                    </div>
                </Col>
                <>
                <Col md={12}>
                {this.state.pageOfItems.map(item =>
                            <div key={item.id}>
                                <h4>Reviews Title {item.review_title} | {this.props.star} star </h4> 
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
                {this.state.pageNo == '1' && <Pagination  items={this.state.exampleItems} pageSize ={Number(1)}  onChangePage={this.onChangePage} />}
                {this.state.pageNo == '2' && <Pagination  items={this.state.exampleItems} pageSize ={Number(2)}  onChangePage={this.onChangePage} />}
                </>
            </Row>
            </>
        )
    }
}

export default Comments;
