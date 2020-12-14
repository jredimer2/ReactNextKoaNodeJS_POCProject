import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import testButtonActionCreator from 'actions/testButtonActionCreator'


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

function mapStateToProps(state) {

    return {
        users: state.users,
        label: state.label
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ testButtonAction: testButtonActionCreator }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TestLabel)