import React, { Component } from 'react'
import { Page, Link, Card, DataTable, Button } from '@shopify/polaris';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import selectUserActionCreator from 'actions'
import testAuthenticator from './TestAuthenticator'

class AuthenticateButton extends Component {

    render() {
        
        return (
            <div>
                <Button onClick={() => {
                    console.log('>>>>> AuthenticateButton button clicked ')
                    testAuthenticator()
                }
                }>Create cookie</Button>
            </div>
        )
        
    }
}

export default AuthenticateButton