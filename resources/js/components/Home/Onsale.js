import React from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {get} from "../httpHelper";
import {Col,Container,Row,Button} from 'react-bootstrap';
 class Onsale extends React.Component {
  constructor() {
    super();
    this.state = {
       data: []
    }
 }
 componentDidMount() {
 get("/books/onsale").then(response => {
  this.setState({ data : response.data });
 
})
}
render() {
      var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        centerPadding: 100,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    return (
      <>
      
    <Container>
        <Row>
            <Col md={11}><h3 className="title">On sale</h3></Col>
            <Col>
                <Button variant="danger" href="/shop">View all</Button>
            </Col>
        </Row>
        <Row>
            <Col>
            <div className="products-tabs">
              <div  className="products-slick" data-nav="#slick-nav-2">
                  <Slider {...settings}>
                        {this.state.data.map((result,index) => {
                          if(index < 10){
                          return (
                              <div className="product" key={result.book_title}>
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
                          )}})}
                  </Slider>
              </div>
          </div>
            </Col>
        </Row>
          </Container>
      </>
    );
  }
}
export default Onsale;