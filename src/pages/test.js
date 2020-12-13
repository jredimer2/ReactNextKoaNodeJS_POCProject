import React, { useState } from 'react';
import { Page, Card } from '@shopify/polaris';
import Merchants from 'components/Merchants'
import TestComponent from 'components/TestComponent'
import TestComponentDetails from 'components/TestComponentDetails'
import AuthenticateButton from 'components/AuthenticateButton'
import Users from 'components/Users'
import config from 'config'
import cookies from 'cookieUtils'
import { Provider } from 'react-redux'
import allReducers from 'reducers'
import { createStore } from 'redux'
import { getToken } from 'getToken'
import axios from 'axios'



function Test(props) {

  // step4: destructure merchants and users and pass them to Merchants and Users Components
  const { merchants, users } = props;

  //console.log('>>>>>> USERS = ', users)

  //console.log("Calling cookies.getCookie from browser ..........")
  //const tkn = cookies.getCookie('token', '')
  //console.log('>>>>>>>>>>>>> Stored token in Browser = ', tkn)

  const store = createStore(allReducers)

  console.log(">>> Received users = ", users)



  return (
    /*
    <Page title="Multiple queries to a page">
      <Card>
        <Users jsonResponse={users} />
      </Card>
    </Page>
    */
    <Provider store={store}>
      <Page title="Testing REDUX">
        <Card title="Users from Database">
          <Users jsonResponse={users} />
        </Card>
        <Card title="Users">
          <TestComponent />
        </Card>
        <Card title="Details">
          <TestComponentDetails />
        </Card>
      </Page>
    </Provider>
  )
}

// This is to query Merchants list
Test.getInitialProps = async function (ctx) {
  let merchants = {};
  let users = {};
  let responseUsers;

  // step1: get merchants
  /*
  try {
    const res1 = await fetch(`http://localhost:3001/merchants`)
    merchants = await res1.json()
  } catch(err) {
    console.error(err);
  }
*/
  // step2: get users
  try {
    //const tokenRes = await fetch(`${config.dbrootport}/login`, { method: 'POST' })
    //const tokenJson = await tokenRes.json()

    //console.log("%%%%%%% TOKEN = ", tokenJson.token)
    //console.log("$$$$$$ Fetched token from getInitialProps() = ", getToken(ctx))

    //cookies.setCookie('token', tokenJson.token)

    /*
    const res2 = await fetch(`${config.dbrootport}/users?merch_id=${config.merch_id}`, {
      headers: {
        'Authorization': `Bearer ${tokenJson.token}`
      }
    })

    users = await res2.json()
*/

    const token = getToken(ctx)
    console.log("***** TOKEN = ", token)

    responseUsers = await axios.get(`${config.dbrootport}/users?merch_id=${config.merch_id}`, {
      headers: {
        'Authorization': `Bearer ${getToken(ctx)}`
      }
    }
    )
    
  } catch (err) {
    console.error(err);
  }

  if (responseUsers != undefined) { users = responseUsers.data }


  console.log(">> >> >> Users = ", users)

  return { merchants, users }
}

// Question: How do I query Users list? there's only one getInitialProps()

export default Test;