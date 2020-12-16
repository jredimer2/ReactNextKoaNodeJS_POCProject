import React, { Component } from 'react'

class TestLabel extends Component {

    render() {
        return (
            <div>
                <br></br>
                <div>{this.props.label}</div>
                <br></br>
            </div>
        )
    }
}

export default TestLabel;