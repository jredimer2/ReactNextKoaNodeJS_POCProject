import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import selectUserActionCreator from 'actions/selectUserActionCreator'


class TestComponentDetails extends Component {

    //<div>Id: {this.props.user.id}</div>
    //<div>Firstname: {this.props.user.fname}</div>
    //<div>Lastname: {this.props.user.lname}</div>   


    render() {
        if (this.props.user != null) {
            console.log("this.props.user = ", this.props.user)

            return (
                <div>
                    <div>Id: {this.props.user.id}</div>
                    <div>Firstname: {this.props.user.fname}</div>
                    <div>Lastname: {this.props.user.lname}</div>
                </div>
            )
        }
        else {
            return (
                <div>Empty state</div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.selectedUser
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectUserAction: selectUserActionCreator }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TestComponentDetails)