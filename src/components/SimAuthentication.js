import { setCookie, getCookie } from 'cookieUtils'
import axios from 'axios'
import config from 'config'

module.exports = async () => {

    await axios.post(`${config.dbrootport}/login`)
        .then((response) => {
            console.log('>> SimAuthentication: TOKEN = ', response.data.token)
            setCookie('token', response.data.token);
        })


    // Note: the following code is only to verify that the token is saved in the cookie.    
    console.log('////////// SimAuthentication TP-2')

    const fetchedToken = getCookie('token')

    console.log('////////// SimAuthentication TP-3  fetchedToken = ', fetchedToken)
}