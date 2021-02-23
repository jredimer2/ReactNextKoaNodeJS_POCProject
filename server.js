require('isomorphic-fetch');
const Koa = require('koa');
const next = require('next');
const { default: shopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');  
const bodyParser = require('koa-bodyparser')
const session = require('koa-session');
const Router = require('koa-router');
const axios = require('axios');
const config = require('./src/config.js')


dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

console.log(">>>>>>>>>> START OF SERVER.JS")
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(bodyParser({ enableTypes: ['json', 'text'] }))

  server.use(
    shopifyAuth({
      //prefix: '/merch',
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products',
        'write_products',
        'read_script_tags',
        'write_script_tags',
        'write_price_rules',
        'write_discounts'
      ],
      async afterAuth(ctx) {
        // step1: save the access token and the shop
        // step2: get the merchant token from the db server if username and email are present? 
        const { shop, accessToken } = ctx.session;

        console.log('>>>>>>> server.js  SHOPIFY ACCESS TOKEN =', accessToken)

        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });

        try {
          console.log('>>>>>>>>>> server.js TP-1')
          let response = await axios.post(`${config.dbrootport}/login`);
          console.log('>>>>>>>>>> server.js TP-2')
          let token = response.data.token;
          console.log('>>>>>>>>>> server.js TP-3')

          console.log('>>>>>>>>>> server.js DB-SERVER TOKEN =', token)
          console.log('>>>>>>>>>> server.js TP-4')

          ctx.cookies.set('token', token, {
            httpOnly: false,
            secure: true,
            sameSite: 'none'
          });
          console.log('>>>>>>>>>> server.js TP-5')

        } catch(error) {
          console.error({error});
        }

        
        ctx.cookies.set('from_login_page', "no", {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });

        
        // register app-uninstalled webhook here
        try {
          let response = await axios.post(`${config.dbrootport}/webhooks/register`, {
            shop, 
            access_token: accessToken
          });

          console.log(response);
        } catch (error) {
          console.error(error);
        }
      

        //ctx.redirect('/merch');
        ctx.redirect('/test');
      },
    }),
  );

  // instead of adding verifyRequest middleware for each route, use it for the route it is necessary
  
  // server.use(verifyRequest());
  // server.use(async (ctx) => {
  //   await handle(ctx.req, ctx.res);
  //   ctx.respond = false;
  //   ctx.res.statusCode = 200;

  // });

  router.get('/login-api', async (ctx) => {
    let response = await axios.post(`${config.dbrootport}/login`)
    ctx.body = response.data;
    console.log('>>>>>>>>>> RESPONSE = ', response)
  });

  // adding verifyRequest middleware for /merch route 
  
  router.get('/merch', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });
  

  router.get('/tmp', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  router.get('/merch-landing', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  // when customers uninstalls the app, this endpoint will be called by Shopify
  // the same endpoint was registered by the db server when customer installed the app
  router.post('/webhooks/app-uninstalled', async (ctx) => {
    // call backend api to notify that the app has been uninstalled
    console.log('/webhooks/app-uninstalled');
    console.log(ctx.request.body); // webhook body
    
    const shop = ctx.req.headers['x-shopify-shop-domain'];

    try {
      let response = await axios.post(`${config.dbrootport}/webhooks/app-uninstalled`, {shop: shop});
      console.log({response});
    } catch (error) {
      console.error(error);
    }
    ctx.body = {};
  });

  // for every other route don't use verifyRequest middleware or use any other middleware you create
  router.get('(.*)', async (ctx) => {
    await handle(ctx.req, ctx.res);
    // ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  // letting the server know that we want to use koa-router's routes
  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});