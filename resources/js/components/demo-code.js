import React from 'react';
import ReactDOM from 'react-dom';

class OrderDetail extends React.Component {
    render() {
      return (
        <div className="order-detail">
          <h4>{this.props.productName}</h4>
          <p>Price: {this.props.price} USD</p>
          <p>Quantity: {this.props.quantity}</p>
          <p>
            <button onClick={this.props.addHandler}>+</button>
          </p>
        </div>
      );
    }
  }
   
  class Order extends React.Component {
    constructor(props) {
      super(props);
   
      this.state = {
        amount: 0,
        details: [
          { id: 1, productName: "IPhone X", price: 900, quantity: 0 },
          { id: 2, productName: "Samsung S9", price: 800, quantity: 0 },
          { id: 3, productName: "Nokia 8", price: 650, quantity: 0 }
        ]
      };
    }
   
    updateOrder(index) {
      this.setState((prevState, props) => {
        console.log(this.state.details);
   
        var newQty = prevState.details[index].quantity + 1;
        this.state.details[index].quantity = newQty;
        this.state.amount = prevState.amount + 1 * prevState.details[index].price;
        return {
          amount: this.state.amount,
          details: this.state.details
        };
      });
    }
   
    render() {
      // Array of <OrderDetail ../>
      var detailTags = this.state.details.map((e, index) => (
        <OrderDetail
          addHandler={() => this.updateOrder(index)}
          productName={e.productName}
          price={e.price}
          quantity={e.quantity}
        />
      ));
      return (
        <div className="order">
          {detailTags}
          <div className="clear" />
          <p className="total">Total: <b>{this.state.amount} USD</b></p>
        </div>
      );
    }
  }
   
  // Render
  ReactDOM.render(<Order />, document.getElementById("order1"));
   /////////////////////////////////////////////////
   class Person extends React.Component {
    constructor(props) {
      super(props);
      this.state = { mode: undefined };
    }
   
    UNSAFE_componentWillMount() {
      let modeValue;
      if (this.props.age > 70) {
        modeValue = "old";
      } else if (this.props.age < 18) {
        modeValue = "young";
      } else {
        modeValue = "middle";
      }
      this.setState({ mode: modeValue });
    }
   
    render() {
      return (
        <div className={"person person-" + this.state.mode}>
          {this.props.name} (age: {this.props.age}) :
          {this.state.mode}
        </div>
      );
    }
  }
   
  Person.defaultProps = { age: "15" };
   
  // Render
  ReactDOM.render(
    <Person name="Donald Trump" age="72" />,
    document.getElementById("person1")
  );
  ReactDOM.render(
    <Person name="Ivanka Trump"/>,
    document.getElementById("person2")
  );
  ////////////////////////////////////////
  class Employe extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loaded: false,
        empId: "",
        fullName: ""
      };
    }
   
    // Load data from Server..
    loadEmployeeData() {
      setTimeout(() => {
        this.setState({
          loaded: true,
          empId: this.props.empId,
          fullName: "Võ Duy Linh"
        });
      }, 1000);
    }
   
    componentDidMount() {
      this.loadEmployeeData();
    }
   
    render() {
      if (this.state.loaded == true) {
        return (
          <div className="employee">
            <p>Emp Id: {this.state.empId}</p>
            <p>Full Name: {this.state.fullName}</p>
          </div>
        );
      } else {
        return (
          <div className="employee">
            <p>
              Wait while data loading. EmpID: {this.props.empId}
            </p>
          </div>
        );
      }
    }
  }
   
  // Render
  ReactDOM.render(<Employe empId="1" />, document.getElementById("employee1"));
  ////////////////////////////////
  class NumberView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentNumber: 1
      };
    }
   
    nextValue() {
      this.setState((prevState, props) => {
        return {
          currentNumber: prevState.currentNumber + 1
        };
      });
    }
   
    shouldComponentUpdate(nextProps, nextState) {
      // Odd Number
      return nextState.currentNumber % 2 == 1;
    }
   
    render() {
      return (
        <div className="number-viewer">
          <button onClick={() => this.nextValue()}>Next Value</button>
          <p>Current Value: {this.state.currentNumber}</p>
        </div>
      );
    }
  }
   
  // Render
  ReactDOM.render(<NumberView />, document.getElementById("numberview1"));
  /////////////////////////////////////////
  class RevenueView extends React.Component {
    constructor(props) {
      super(props);
   
      this.state = {
        year: 2018,
        revenue: 1000,
        growthRate: "Unknown"
      };
    }
   
    nextYear() {
      this.setState((prevState, props) => {
        var randomRevenue = prevState.revenue * (1 + Math.random());
        return {
          year: prevState.year + 1,
          revenue: randomRevenue
        };
      });
    }
   
    UNSAFE_componentWillUpdate(nextProps, nextState) {
      var rate = (nextState.revenue - this.state.revenue) / this.state.revenue;
      nextState.growthRate = 100 * rate + " %";
    }
   
    render() {
      return (
        <div className="revenue-view">
          <p>Year: {this.state.year}</p>
          <p>Revenue: {this.state.revenue}</p>
          <p>Growth Rate: {this.state.growthRate}</p>
          <button onClick={() => this.nextYear()}>Next Year</button>
        </div>
      );
    }
  }
   
  // Render
  ReactDOM.render(<RevenueView />, document.getElementById("revenueview1"));

  /////////////////////////////////
  class SearchBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchText: "reactjs"
      };
      this.searchFieldRef = React.createRef();
    }
   
    clearAndFocus() {
      this.setState({ searchText: "" });
      // Focus to Input Field.
      this.searchFieldRef.current.focus();
      this.searchFieldRef.current.style.background = "#e8f8f5";
    }
   
    changeSearchText(event) {
      var v = event.target.value;
      this.setState((prevState, props) => {
        return {
          searchText: v
        };
      });
    }
   
    render() {
      return (
        <div className="search-box">
          <input
            value={this.state.searchText}
            ref={this.searchFieldRef}
            onChange={event => this.changeSearchText(event)}
          />
          <button onClick={() => this.clearAndFocus()}>Clear And Focus</button>
           
          <a href="">Reset</a>
        </div>
      );
    }
  }
   
  // Render
  ReactDOM.render(<SearchBox />, document.getElementById("searchbox1"));
//////////////////////
class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      fullName: ""
    };
  }
 
  handleSubmitForm(event) {
    alert("Full Name: " + this.state.fullName);
    event.preventDefault();
  }
 
  handleChange(event) {
    var value = event.target.value;
 
    this.setState({
      fullName: value
    });
  }
 
  render() {
    return (
      <form onSubmit={event => this.handleSubmitForm(event)}>
        <label>
          Full Name:
          <input
            type="text"
            value={this.state.fullName}
            onChange={event => this.handleChange(event)}
          />
        </label>
        <input type="submit" value="Submit" />
        <p>{this.state.fullName}</p>        
      </form>
    );
  }
}
 
// Render
ReactDOM.render(<SimpleForm />, document.getElementById("form1"));
///////////////////////////////////
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      content: ""
    };
  }
 
  handleSubmitForm(event) {
    alert("Textarea Content: " + this.state.content);
    event.preventDefault();
  }
 
  handleChange(event) {
    var value = event.target.value;
 
    this.setState({
      content: value
    });
  }
 
  render() {
    return (
      <form onSubmit={event => this.handleSubmitForm(event)}>
        <label>Content</label>
        <br />
        <textarea cols="45" rows="5"
          value={this.state.content}
          onChange={event => this.handleChange(event)} />
        <br />
        <input type="submit" value="Submit" />
        <p>{this.state.content}</p>
      </form>
    );
  }
}
 
// Render
ReactDOM.render(<EssayForm />, document.getElementById("form1"));
///////////////////////
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      favoriteFlavor: "coconut"
    };
  }
 
  handleSubmitForm(event) {
    alert("Favorite Flavor: " + this.state.favoriteFlavor);
    event.preventDefault();
  }
 
  handleChange(event) {
    var value = event.target.value;
 
    this.setState({
      favoriteFlavor: value
    });
  }
 
  render() {
    return (
      <form onSubmit={event => this.handleSubmitForm(event)}>
        <p>Pick your favorite flavor:</p>
        <select
            value={this.state.favoriteFlavor}
            onChange={event => this.handleChange(event)}>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
 
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
 
// Render
ReactDOM.render(<FlavorForm />, document.getElementById("root"));
/////////////////////////
import React from 'react';
import ReactDOM from 'react-dom';
import Slider from "react-slick";

//Importing axios service
import axios from 'axios';
class App extends React.Component {
  //initialize array variable
  constructor() {
    //super is used to access the variables
    super();
    this.state = {
       data: []
    }
 }
 componentDidMount() {
 //API request
 axios.get("http://127.0.0.1:8000/api/book").then(response => {
  
  //getting and setting api data into variable
  this.setState({ data : response.data });
 
})
}
  
//Final output
render() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
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
    <Slider {...settings}>
          {this.state.data.map((result) => {
            return (
              <div>
          <div class="product">
                
                <div class="product-img">
                <img src={"./img/"+result.book_cover_photo+".jpg"} alt=""/>
            </div>
            <div class="product-body">
                <h3 class="product-name"><a href="#">{result.book_title}</a></h3>
                <p class="author-name">   {result.author_}</p>
                <h4 class="product-price">{result.discount_price} <del class="product-old-price">{result.book_price}</del></h4>
            </div>
            <div class="add-to-cart">
                <button class="add-to-cart-btn"><i class="fa fa-eye"></i>View</button>
            </div>
            </div>
            </div>
            )})}
           
</Slider>
          
  );
  
}

}


ReactDOM.render(<App />, document.getElementById('order1'));
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';

import Master from './components/Master';
import CreateItem from './components/CreateItem';

ReactDOM.render(<Master/>,document.getElementById("order1"))

render(
   <Router history={browserHistory}>
       <Route path="/" component={Master} >
         <Route path="/add-item" component={CreateItem} />
       </Route>
   </Router>,
document.getElementById('example'));