import React, { Component } from 'react';
// import { Page, Card, Button } from '@shopify/polaris';
// import Merchants from 'components/Merchants'
// import TestComponentDetails from 'components/TestComponentDetails'
// import AuthenticateButton from 'components/AuthenticateButton'
// import Users from 'components/Users'
// import config from 'config'
// import cookies from 'cookieUtils'
// import { createStore } from 'redux'
// import { getToken } from 'getToken'
// import axios from 'axios'
// import MenuBar from 'components/MenuBar'
// import TestLabel from 'components/TestLabel'
// import TestButton from 'components/TestButton'
import TestComponent from 'components/TestComponent'
import { ExampleContext } from '../contexts/ExampleContext'; 

class Test extends Component {

  state = {
    token: '',
    shopOrigin: '',
    from_login_page: 'no'
  }

  static contextType = ExampleContext;

  componentDidMount() {

    let { token, shopOrigin, from_login_page } = this.props;
    this.setState({token, shopOrigin, from_login_page})

    if(token) {
      this.context.getUsersList();
    } else if(shopOrigin) {
      // need to get the merchant details first from the shopOrigin
      // then get the same token for the merchant logged in from Shopify
    }
  }

  // data is passed from getInitialProps of _app.js
  static async getInitialProps(ctx, data) {
    let auth = {};
    console.log({data});
    if(data && data.auth) {
      auth = data.auth;
    }

    return auth;
  }

  render() {

    const { token, shopOrigin, from_login_page } = this.state;

    return (
      <div>
        <h1>
        {
          (token || shopOrigin) 
          ? (from_login_page === "yes" ? "Logged in from Login page": "Logged in from Shopify") 
          : "No logged in"
        }
        </h1>
        <TestComponent />
      </div>
    )
  }
}

export default Test
