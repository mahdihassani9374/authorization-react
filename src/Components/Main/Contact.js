import React, { Component } from 'react'
import { Link} from 'react-router-dom'

export default class Contact extends Component {
  constructor(props) {
      super(props)
      console.log('welcome to contact');
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active">Contact</li>    
        </ol>
        <div className="card">
          <div className="card-body">
              <h5 className="card-title">Contact</h5>
              <p className="card-text">Quick sample text to create the card title and make up the body of the card's content.</p>
              <div className="row">
                  <div className="col-lg-6">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="please enter name ..." />
                      </div>
                  </div>
                  <div className="col-lg-6">
                      <div className="form-group">
                        <input type="number" className="form-control" placeholder="please enter phone number ..." />
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="form-group">
                        <textarea className="form-control" rows="6" placeholder="please enter phone number ..." />
                      </div>
                  </div>
                  <div className="col-lg-12">
                      <div className="form-group">
                        <button className="btn btn-outline-success">send message</button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
