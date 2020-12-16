import React, { Component } from 'react'
import { Page, Link, Card, DataTable, Button } from '@shopify/polaris';
import simAuthentication from './SimAuthentication'
import { getToken } from 'getToken'

import { ExampleContext } from '../contexts/ExampleContext';

class AuthenticateButton extends Component {

    static contextType = ExampleContext;

    handleGetTokenBtnClick = async () => {
        try {
            console.log('>>>>> AuthenticateButton button clicked ')
            await simAuthentication();
            console.log('>>>> token received...');
            this.context.getUsersList()
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

export default AuthenticateButton;