// resource for handling cookies taken from here:
// https://github.com/carlos-peru/next-with-api/blob/master/lib/session.js

const cookie = require('js-cookie');

exports.setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/'
    });
  }
};

exports.removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

/*
const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};
*/

exports.getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
  console.log("getCookieFromBrowser : TP-1  key = ", key)
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  console.log("getCookieFromServer : TP-1  process.browser = ", process.browser)
  if (!req.headers.cookie) {
    console.log("getCookieFromServer : TP-2")
    return undefined;
  }
  console.log("getCookieFromServer : TP-3")
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  console.log("getCookieFromServer : TP-4")
  if (!rawCookie) {
    return undefined;
  }
  console.log("getCookieFromServer : TP-5")
  return rawCookie.split('=')[1];
};

/*
export let setCookie = (key, value) => {
  console.log("%%%%%%%% setCookie TP-1")
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/'
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

*/