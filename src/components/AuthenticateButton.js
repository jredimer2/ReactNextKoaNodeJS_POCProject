import React, { Component } from 'react'
import { Page, Link, Card, DataTable, Button } from '@shopify/polaris';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from 'actions'
import simAuthentication from './SimAuthentication'
import { getToken } from 'getToken'

class AuthenticateButton extends Component {

    render() {
        
        return (
            <div>
                <Button onClick={() => {
                    console.log('>>>>> AuthenticateButton button clicked ')
                    simAuthentication()
                    this.props.updateUsersListActionCreator()
                }
                }>Get Token</Button>
            </div>
        )
        
    }
}

function mapStateToProps(state) {

    return {
        updatedUsers: state.updatedUsers
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ updateUsersListActionCreator: actions.updateUsersListActionCreator }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AuthenticateButton)