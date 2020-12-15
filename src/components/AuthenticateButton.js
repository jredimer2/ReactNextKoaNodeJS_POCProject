import React, { Component } from 'react'
import { Page, Link, Card, DataTable, Button } from '@shopify/polaris';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from 'actions'
import simAuthentication from './SimAuthentication'
import { getToken } from 'getToken'

class AuthenticateButton extends Component {

    handleGetTokenBtnClick = async () => {
        try {
            console.log('>>>>> AuthenticateButton button clicked ')
            await simAuthentication();
            console.log('>>>> token received...');
            this.props.updateUsersListActionCreator()
        } catch(error) {
            console.error(error);
        }
    }

    render() {
        
        return (
            <div>
                <Button onClick={ this.handleGetTokenBtnClick }
                >Get Token</Button>
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