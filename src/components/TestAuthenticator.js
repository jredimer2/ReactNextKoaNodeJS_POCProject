import {setCookie, getCookie} from 'cookieUtils'
import axios from 'axios'
import config from 'config'

module.exports = async () => {
    console.log('>>> TestAuthenticator.auth()')

    //const tokenRes = await fetch(`${config.dbrootport}/login`, { method: 'POST' })
    //const tokenJson = await tokenRes.json()

    //console.log("TOKEN = ", tokenJson)
    
    await axios.post(`${config.dbrootport}/login`)
        .then((response) => {
            console.log('>> TOKEN = ', response.data.token)
            setCookie('token', response.data.token);
            //Router.push('/');
            //dispatch({ type: AUTHENTICATE, payload: response.data.token });
        })
    
    console.log('Getting cookie now from browser TP-1')
    
    const fetchedToken = getCookie('token')

    console.log('Fetched Token from cookie = ', fetchedToken)
}