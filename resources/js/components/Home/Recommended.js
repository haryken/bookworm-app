import React from 'react';
import { Col, Row,Button } from 'react-bootstrap';
import {get} from "../httpHelper";
import {Link} from "react-router-dom";
 class Recommended extends React.Component {
  constructor() {
    super();
    this.state = {
       data: []
    }
 }
 componentDidMount() {
    get("/books/topRecommended").then(response => {
      this.setState({ data : response.data });
    })
}
render() {
      
    return (
            <Row>
              {this.state.data.map((result,index) => {
                  if(index < 8 && result.state == 0 || result.state == null){
                    return (
                      <Col md={3} key={result.book_summary}>
                          <div className="product">
                              <div className="product-img">
                              <img src={"./img/"+result.book_cover_photo+".jpg"} height="300px" alt=""/>
                          </div>
                          <div className="product-body" style={{height: "150px"}}>
                            <Link to={"/book/"+result.id}>{result.book_title}</Link>
                              <p className="author-name">   {result.author_name}</p>
                              <h4 className="product-price">{result.sub_price}</h4>
                          </div>
                          </div>
                      </Col>
                      
                )}else if(index < 8 && result.state == 1){
                    return (
                      <Col md={3} key={result.book_title}>
                          <div className="product">
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
                      
                          )
                }
                
                })}
          </Row>
    );
  }
}
export default Recommended;