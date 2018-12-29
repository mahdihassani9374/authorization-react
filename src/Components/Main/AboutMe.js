import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class AboutMe extends Component {
  constructor(props) {
    super(props)
    console.log('welcome to AboutMe');
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">AboutMe</li>    
        </ol>
        <div className="jumbotron">
            <h1>AboutMe ... </h1> 
            <p>
              dvertising image of a man shopping for Christmas presents, United States, 1918
              A woman shopping in Japan, 2016
              is an activity in which a customer browses the available goods or services presented by one or more retailers with the potential intent to purchase a suitable selection of them  </p> 
        </div>
        <div className="card">
          <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Quick sample text to create the card title and make up the body of the card's content.</p>
          </div>
        </div>
      </div>
    )
  }
}
