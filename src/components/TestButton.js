import React, { Component } from 'react'
import { Page, Link, Card, DataTable, Button } from '@shopify/polaris';
const axios = require('axios');
const config = require('config.js')

class TestButton extends Component {

    constructor() {
        super()
    }

    async buttonCallback() {
        console.log('>>>>> buttoCallback TP-1')
        //await this.props.testButtonAction('Greetings from Redux')        
        //console.log("TestButton.buttonCallback() = ", this.props.label)

        let response = await axios.get(`${config.dbrootport}/test`);
        console.log('>>>>> buttoCallback TP-2')
        
        let data = response.data
        console.log('>>>>> buttoCallback TP-3')
        console.log('>>>>> data =', data)
        console.log('>>>>> data.discount_codes =', data.discount_codes)
        
    }

    render() {
        
        return (
            <div>
                <Button onClick={() => this.buttonCallback()}>
                    Test localhost:3001/test
                </Button>
            </div>
        )
        
    }
}

export default TestButton;
