import React, { Component } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import '../Styles/app.css';
import { Route, Link, BrowserRouter as Router , Switch , NavLink } from 'react-router-dom'
import Main from './Main/Main';
import Contact from './Main/Contact';
import AboutMe from './Main/AboutMe';
import Product from './Main/Product';
import Login from './Main/Login';
import Notfound from './Main/Notfound';
import PrivateRoute from './PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/bootstrap-rtl.min.css';
import UserPanel from './User/UserPanel';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      auth:true
    }
  }

  componentDidMount() {
   this.has_api_token()
  }

  has_api_token() {
    let api_token = localStorage.getItem('api_token');
    if(api_token!=null) {
      axios.get(`http://roocket.org/api/user?api_token=${api_token}`)
      .then(response=>{
        console.log(response);
        this.setState({auth:true})
      })
      .catch(error=>{
        console.log(error);
        this.setState({auth:false})
      })
    }
    else {
      this.setState({auth:false})
    }
  }
  login() {
    this.setState({auth:true})
  }
  render() {
    return (
      <div>
        <Router>         
          <div>                   
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <div className="container">
                <div className="row">
                  <ul className="navbar-nav p-0">
                    <li className="nav-item">
                      <NavLink exact className="nav-link" to="/">صفحه اصلی</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link " to="/aboutme">درباره ما</NavLink>
                    </li>
                    <li className="nav-item" >
                      <NavLink className="nav-link " to="/contact">تماس با ما</NavLink>
                    </li>                  
                  </ul>
                </div> 
                <div className="row float-left">
                  <ul className="navbar-nav p-0">
                    {
                      this.state.auth ? (                        
                        <li className="nav-item">
                          <NavLink className="nav-link " to="/user-panel">ناحیه کاربری</NavLink>                          
                        </li>                    
                      ): (
                        <li className="nav-item">
                          <NavLink className="nav-link " to="/login">ورود به سایت</NavLink>
                        </li>
                      )
                    }
                  </ul>
                </div>          
              </div>
            </nav>  
            <div className="container">
              <div className="row">
                <div className="wraper">
                
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route path="/aboutme" component={AboutMe} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/product/:id" component={Product} />
                  <Route path="/login" render={(props) =>  <Login {...props} login={this.login.bind(this)} auth={this.state.auth} />} />
                  <PrivateRoute path="/user-panel" component={UserPanel} auth={this.state.auth} />
                  <Route component={Notfound} />
                </Switch>
                </div>
              </div>
            </div>         
          </div>
          </Router>
      </div>
    );
  }
}

export default App;
