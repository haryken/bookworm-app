import React from 'react';
import Pagination from './Pagination';
import axios from 'axios';
class Demo extends React.Component {
    constructor() {
        super();

        var exampleItems = [];

        this.state = {
            exampleItems: exampleItems,
            pageOfItems: [],
            pageNo:1
        };

        this.onChangePage = this.onChangePage.bind(this);
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/books/onsale").then(response => {
         this.setState({ exampleItems : response.data });
        
       })
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        {this.state.pageOfItems.map(item =>
                            <div key={item.book_title}>{item.book_title}</div>
                        )}
                        <Pagination  items={this.state.exampleItems} pageSize ={Number(2)}  onChangePage={this.onChangePage} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Demo;