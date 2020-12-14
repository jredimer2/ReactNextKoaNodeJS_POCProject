import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from "js-cookie";
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';

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
        console.log('getInitialProps:start');
        let shopOrigin;
        try {
            console.log(">>>>>>>>>>>> COOKIE = ", ctx.req.headers.cookie)
            shopOrigin = parseCookie(ctx.req.headers.cookie).shopOrigin;
        } catch (e) {
            if(typeof window !== "undefined") {
                shopOrigin = Cookies.get("shopOrigin");
            }
        }

        const shopifyProviderConfig = { apiKey: API_KEY, shopOrigin, forceRedirect: true };

        let pageProps = {};

        // call getInitialProps in the page here because it will not be automatically called in a page
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx, {
                // Pass any extra data to components's getInitalProps method here.
                //  I'm using it like a global state provider here for values I do not want to retrieve again in Component's getInitalProps
                shopOrigin: shopOrigin
            });

            console.log('inside getInitialProps apps 2');
        }

        return { shopifyProviderConfig, pageProps };
    }

    render() {
        const { Component, pageProps, shopifyProviderConfig } = this.props;
        const config = { ...shopifyProviderConfig };

        console.log(config)

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
                        <AppProvider i18n={translations}>
                            <Component {...pageProps} />
                        </AppProvider>

                }
            </React.Fragment>
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