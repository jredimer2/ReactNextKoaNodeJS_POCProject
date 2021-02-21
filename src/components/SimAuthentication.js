import { setCookie, getCookie } from 'cookieUtils'
import axios from 'axios'
import config from 'config'

module.exports = async (from_login_page = false) => {

    // returning a promise so that the caller will know when the operation is complete
    // also, using async await
    return new Promise( async (resolve, reject)  => {
        try {

            if(from_login_page) {
                let response = await axios.post(`${config.dbrootport}/login`);
                console.log('>> SimAuthentication: TOKEN = ', response.data.token)
                setCookie('token', response.data.token);
                setCookie('from_login_page', from_login_page ? "yes": "no");
            }

            // Note: the following code is only to verify that the token is saved in the cookie.    
            console.log('////////// SimAuthentication TP-2')

            const fetchedToken = getCookie('token')

            console.log('////////// SimAuthentication TP-3  fetchedToken = ', fetchedToken)

            resolve(true);
        } catch (error) {
            reject(error);
        }
    });

    // await axios.post(`${config.dbrootport}/login`)
    //     .then((response) => {
    //         console.log('>> SimAuthentication: TOKEN = ', response.data.token)
    //         setCookie('token', response.data.token);
    //     })


    // // Note: the following code is only to verify that the token is saved in the cookie.    
    // console.log('////////// SimAuthentication TP-2')

    // const fetchedToken = getCookie('token')

    // console.log('////////// SimAuthentication TP-3  fetchedToken = ', fetchedToken)
}