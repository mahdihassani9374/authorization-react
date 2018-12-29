import React, { Component } from 'react'
import { Route , Redirect} from 'react-router-dom'

export default class PrivateRoute extends Component {
  render() {
    const {component:Component , auth , ...restprops } = this.props;
    return <Route {...restprops} render={(props)=>(
        auth ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname:'/login'}} />
        )
    )} />
  }
}
