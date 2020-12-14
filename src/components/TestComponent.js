import React, { useState, Component } from 'react';
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


class TestComponent extends Component {

    render() {
        return (
            <div>
                <Page title="Testing REDUX">
                    <Card title="Menu bar">
                        <AuthenticateButton />
                        <TestButton />
                        <TestLabel></TestLabel>
                    </Card>
                    <Card title="Users">
                        <Users />
                    </Card>
                    <Card title="Details">
                        <TestComponentDetails />
                    </Card>
                </Page>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        updatedUsers: state.updateUsersListActionCreator
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ updateUsersListActionCreator: actions.updateUsersListActionCreator }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TestComponent)