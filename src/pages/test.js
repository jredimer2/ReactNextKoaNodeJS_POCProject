import React, { useState } from 'react';
import { Page, Card, Button } from '@shopify/polaris';
import Merchants from 'components/Merchants'
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
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MenuBar from 'components/MenuBar'
import TestLabel from 'components/TestLabel'
import TestButton from 'components/TestButton'
import actions from 'actions'
import TestComponent from 'components/TestComponent'

export default function Test(props) {

  const store = createStore(allReducers)

  return (

    <Provider store={store}>
      <TestComponent />
    </Provider>

  )
}

