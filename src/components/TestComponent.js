import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import selectUserActionCreator from 'actions'


class TestComponent extends Component {

    createItemsList() {
        return this.props.users.map(user => {
            return (
                <li
                    key={user.id}
                    onClick={() => this.props.selectUserAction(user)}
                >
                    {user.fname} {user.lname}
                </li>
            )
        })
    }
    render() {
        return (
            <div>
                <ul>
                    {this.createItemsList()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        users: state.users
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectUserAction: selectUserActionCreator }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TestComponent)