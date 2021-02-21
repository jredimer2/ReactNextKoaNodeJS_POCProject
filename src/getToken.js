//const cookie = require('js-cookie');
const { getCookie } = require('./cookieUtils')

// Setting the default ctx to null allows this function to be called from anywhere 
exports.getToken = (ctx=null) => {
    //console.log(">>>>> CTX.REQ.HEADERS = ", ctx.req.headers)

  if (process.browser) {
    console.log(">>>>>>> ON BROWSER")
    return getCookie('token')

  } else {
    console.log(">>>>>> ON SERVER")
    if(ctx.req.headers.cookie) {
        const sp = ctx.req.headers.cookie.split("=")
        return sp[1].trim()        
      }
  }  
  
  return null
};


/*
const cookie = require('js-cookie');
//import utils from './cookieUtils'
const { getCookie } = require('./cookieUtils')

exports.getToken = (ctx) => {
    console.log(">>>>> getToken()")
  };
*/

  /*
module.exports = async (ctx) => {
    console.log('>>> getToken2()')

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
*/