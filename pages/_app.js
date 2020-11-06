import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from "js-cookie";
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        const config = { apiKey: '0075dbe053f529cba46ae026184ba659', shopOrigin: 'jredstore1.myshopify.com', forceRedirect: true };

        return (
            <React.Fragment>
                <Head>
                    <title>Sample App</title>
                    <meta charSet="utf-8" />
                </Head>
                <Provider config={config}>
                    <AppProvider i18n={translations}>
                        <Component {...pageProps} />
                    </AppProvider>
                </Provider>
            </React.Fragment>
        );
    }
}

export default MyApp;