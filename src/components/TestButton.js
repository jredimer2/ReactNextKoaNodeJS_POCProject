import React, { Component } from 'react'
import { Page, Link, Card, DataTable, Button } from '@shopify/polaris';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import testButtonActionCreator from 'actions/testButtonActionCreator'
import actions from 'actions'

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

function mapStateToProps(state) {
    return {
        label: state.label
    }
}

function matchDispatchToProps(dispatch) {
    console.log(">>>>>>>> TestButton.matchDispatchToProps actions = ", actions)
    return bindActionCreators({ testButtonAction: actions.testButtonActionCreator }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TestButton)
