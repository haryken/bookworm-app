import React from 'react';
import {get} from "../httpHelper";
import { Col, Row, Button} from 'react-bootstrap';
class Popular extends React.Component {
    constructor() {
        super();
        this.state = {
          data: []
        }
    }
    componentDidMount() {
        get("/books/popular").then(response => {
          this.setState({ data : response.data });
        })
    }
    render() {
        return (
          <>
          <Row>
              {this.state.data.map((result,index) => {
                   if(index < 8 && result.state == 0){
                    return (
                      <Col md={3}  key={result.book_title}>
                          <div className="product">
                              <div className="product-img">
                              <img src={"./img/"+result.book_cover_photo+".jpg"} height="300px" alt=""/>
                          </div>
                          <div className="product-body" style={{height: "150px"}}>
                              <h3 className="product-name">{result.book_title}</h3>
                              <p className="author-name">   {result.author_name}</p>
                              <h4 className="product-price">{result.sub_price}</h4>
                          </div>
                          <div className="add-to-cart">
                              <Button className="add-to-cart-btn" href={"/book/"+result.id}><i className="fa fa-eye"></i>View</Button>
                          </div>
                          </div>
                      </Col>
                      
                )}else if(index < 8 && result.state == 1){
                    return (
                      <Col md={3} key={result.book_summary}>
                          <div className="product" >
                              <div className="product-img">
                              <img src={"./img/"+result.book_cover_photo+".jpg"} height="300px" alt=""/>
                          </div>
                          <div className="product-body" style={{height: "150px"}}>
                              <h3 className="product-name">{result.book_title}</h3>
                              <p className="author-name">   {result.author_name}</p>
                              <h4 className="product-price">{result.sub_price} <del className="product-old-price">{result.book_price}</del></h4>
                          </div>
                          <div className="add-to-cart">
                              <Button className="add-to-cart-btn" href={"/book/"+result.id}><i className="fa fa-eye"></i>View</Button>
                          </div>
                          </div>
                      </Col>
                      
                )
                }
                })}
          </Row>
            
          </>
        );
      }
}
export default Popular;