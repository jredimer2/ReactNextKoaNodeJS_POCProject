import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from "js-cookie";
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';

// Step 2: include the default export of ExampleContextProvider and wrap it around the component
import ExampleContextProvider from '../contexts/ExampleContext';
import simAuthentication from '../components/SimAuthentication'

//import { Provider } from 'react-redux';



const parseCookie = str =>
  str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        console.log('>>> _app.js  TP-1 getInitialProps:start');
        let shopOrigin, token, from_login_page, pathname;
        try {
            pathname = ctx ? ctx.pathname: '';
            console.log(">>>>>>>>>>>> _app.js  TP-2  COOKIE = ", ctx.req.headers.cookie)
            shopOrigin = parseCookie(ctx.req.headers.cookie).shopOrigin;
            token = parseCookie(ctx.req.headers.cookie).token;
            from_login_page = parseCookie(ctx.req.headers.cookie).from_login_page;
        } catch (e) {
            console.error({e})
            if(typeof window !== "undefined") {
                pathname = window.location.pathname;
                shopOrigin = Cookies.get("shopOrigin");
                token = Cookies.get("token");
                from_login_page = Cookies.get("from_login_page");
            }
        }

        // force redirect only if logged in from Shopify
        let forceRedirect = true;
        if(from_login_page && from_login_page === "yes") {
            forceRedirect = false;
        }

        if(pathname === "/login") {
            forceRedirect = false;
        }

        
        const shopifyProviderConfig = { apiKey: API_KEY, shopOrigin, token, from_login_page, forceRedirect: false, baseUrl: BASE_URL};

        let pageProps = {};

        // call getInitialProps in the page here because it will not be automatically called in a page
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx, {
                // Pass any extra data to components's getInitalProps method here.
                //  I'm using it like a global state provider here for values I do not want to retrieve again in Component's getInitalProps
                shopOrigin: shopOrigin,
                auth: {
                    token: token,
                    shopOrigin: shopOrigin,
                    from_login_page: from_login_page
                }
            });

            console.log('>>> _apps.js  TP-3 inside getInitialProps apps 2');
        }

        return { shopifyProviderConfig, pageProps };
    }

    render() {
        const { Component, pageProps, shopifyProviderConfig } = this.props;
        const config = { ...shopifyProviderConfig };

        console.log('>>>>>> _app.js  shopifyProviderConfig', shopifyProviderConfig)

        return (
            <ExampleContextProvider>
            <React.Fragment>
                <Head>
                    <title>Next-React-Koa-Node</title>
                    <meta charSet="utf-8" />
                </Head>
                {
                    config.shopOrigin ?
                        <Provider config={config}>
                            <AppProvider i18n={translations}>                                
                            <Component {...pageProps} baseUrl={shopifyProviderConfig.baseUrl} />
                            </AppProvider>
                        </Provider>
                        :
                        <AppProvider i18n={translations}>
                            <Component {...pageProps} baseUrl={shopifyProviderConfig.baseUrl} />
                        </AppProvider>

                }
            </React.Fragment>
            </ExampleContextProvider>
        );
    }
}


/*
class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        const config = { apiKey: API_KEY, shopOrigin: Cookies.get("shopOrigin"), forceRedirect: true };

        return (
            <React.Fragment>
                <Head>
                    <title>Sample App</title>
                    <meta charSet="utf-8" />
                </Head>
                {
                    config.shopOrigin ?
                    <Provider config={config}>
                        <AppProvider i18n={translations}>
                            <Component {...pageProps} />
                        </AppProvider>
                    </Provider>
                    :
                    <Provider config={config}>
                    <AppProvider i18n={translations}>
                        <Component {...pageProps} />
                    </AppProvider>
                </Provider>
                }
            </React.Fragment>
        );
    }
}
*/

export default MyApp;