const { parsed: localEnv } = require("dotenv").config();
const withCSS = require("@zeit/next-css");

const webpack = require("webpack");
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const abc = JSON.stringify(process.env.BASE_URL)

module.exports = withCSS({
  webpack: config => {
    const env = { API_KEY: apiKey, BASE_URL: abc };
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  }
});

