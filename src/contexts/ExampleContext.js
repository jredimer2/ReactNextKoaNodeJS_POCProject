import React, { Component, createContext } from 'react'
import axios from 'axios'
import { getToken } from 'getToken'
import config from 'config'

// Step 1: create ExampleContenxt which will be used to wrap the main component (_app.js)
// ExampleContextProvider component will return a provider
export const ExampleContext = createContext();

export class ExampleContextProvider extends Component {

    state = {
        users: [],
    };

    getUsersList = async () => {

        const token = getToken(null)
        const responseUsers = await axios.get(`${config.dbrootport}/users?merch_id=${config.merch_id}`, {
            headers: {
                'Authorization': `Bearer ${getToken(null)}`
            }
        }
        )

        // return responseUsers.data 
        this.setState({users: responseUsers.data})
    }

    render() {
        return (
            <ExampleContext.Provider value={{
                ...this.state, 
                getUsersList: this.getUsersList,        
            }}>
                {this.props.children}
            </ExampleContext.Provider>
        )
    }
}

export default ExampleContextProvider
