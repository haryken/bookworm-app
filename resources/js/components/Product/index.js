import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import {Col,Container,Row,Button,Breadcrumb,Figure,Tabs,Tab} from 'react-bootstrap';
import Comments from './Comments';
import BookInfo from './BookInfo';
export class Product extends Component {
    constructor() {
        super();
        this.state = {
          data: [],
          star: '5'
        }
    }
    render() {
        return (
            <Container>
                <>
                <BookInfo id={this.props.match.params.id}/>
                <Row>
                    <Col md={8}>
                        <Row>
                            <Col md={12}>
                                <h4>Customer Reviews (filer by {this.state.star} star)</h4> 
                                <h1>4.6 Star</h1>
                            </Col>
                            <Col md={12}>
                            <Tabs
                            defaultActiveKey="all"
                            transition={false}
                            onSelect={(k) => this.setState({star: k})}
                            className="mb-3"
                            >
                                <Tab eventKey="all" title="All">
                                <Comments id={this.props.match.params.id} star="all"/>
                                </Tab>
                                <Tab eventKey="5" title="5 STAR">
                                <Comments id={this.props.match.params.id} star="5"/>
                                </Tab>
                                <Tab eventKey="4" title="4 STAR">
                                <Comments id={this.props.match.params.id} star="4"/>
                                </Tab>
                                <Tab eventKey="3" title="3 STAR">
                                <Comments id={this.props.match.params.id} star="3"/>
                                
                                </Tab>
                                <Tab eventKey="2" title="2 STAR">
                                <Comments id={this.props.match.params.id} star="2"/>
                               
                                </Tab>
                                <Tab eventKey="1" title="1 STAR">
                                <Comments id={this.props.match.params.id} star="1"/>
                                
                                </Tab>
                            </Tabs>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                    <div className="product-details">
                                <div className="price">
                                <h4 className="">write a review</h4>
                                <hr/>                                    
                                </div>
                                <div className="qty-label qty">
                                    <label htmlFor="title">Add a title</label>
                                    <input className="input" type="text" name="title" id="title"/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <label htmlFor="des">Details please! Your review help other shoppers</label>
                                    <textarea className="input" name="des" id="des" cols="30" rows="7"></textarea>
                                    <label htmlFor="rate">Select a rating star</label>
                                    <select className="input" name="rate" id="rate">
                                        <option value="1">1 Star</option>
                                        <option value="2">2 Star</option>
                                        <option value="3">3 Star</option>
                                        <option value="4">4 Star</option>
                                        <option value="5">5 Star</option>
                                    </select>
                                </div>
                                <div className="add-to-cart">
                                    <button className="add-to-cart-btn"><i className="fa fa-envelope"></i> Submit review</button>
                                </div>
                    </div>
                    </Col>
                </Row>
                </>
                  

            </Container>
        )
    }
}

export default withRouter(Product); 
