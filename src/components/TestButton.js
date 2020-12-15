import React, { Component } from 'react'
import { Page, Link, Card, DataTable, Button } from '@shopify/polaris';

class TestButton extends Component {

    async buttonCallback() {
        await this.props.testButtonAction('Greetings from Redux')
        
        console.log("TestButton.buttonCallback() = ", this.props.label)
    }

    render() {
        
        return (
            <div>
                <Button onClick={() => {
                    console.log('>>>>> TestButton Component: TestButton clicked ')
                    this.buttonCallback()
                }
                }>Test Button</Button>
            </div>
        )
        
    }
}

export default TestButton;
