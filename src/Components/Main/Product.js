import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product:{}
    }
  }

  componentDidMount () {
    const { params } = this.props.match
    axios.get(`http://roocket.org/api/products/${params.id}`)
    .then((responsive) => {
      const {data} = responsive.data;
      this.setState({
        product:data
      })
      console.log(data);
    }).catch((error)=>{
      console.log(error);
    })
  }
    
  render() {
    return (
      <div>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Product detail</li>    
        </ol>
        <div className="card">
          <div className="card-body">
              <div className="row">
                <div className="col-lg-3">
                  <img className="card-img img-thumbnail" src={this.state.product.image} alt="Card image cap"></img>
                </div>
                <div className="col-lg-9">
                  <h5 className="card-title"></h5>
                  <p className="card-text">{this.state.product.title}</p>
                  <p className="card-text">قیمت : {this.state.product.price}</p>
                  <p className="card-text">                    
                   {this.state.product.body}
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
