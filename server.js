require('isomorphic-fetch');
const Koa = require('koa');
const next = require('next');
const { default: shopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');  
const session = require('koa-session');
const Router = require('koa-router');
const axios = require('axios');

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    shopifyAuth({
      //prefix: '/merch',
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products',
        'write_products',
        'read_script_tags',
        'write_script_tags'
      ],
      async afterAuth(ctx) {
        // step1: save the access token and the shop
        // step2: get the merchant token from the db server if username and email are present? 
        const { shop, accessToken } = ctx.session;
        console.log(`afterAuth:start`);
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });

        try {
          let response = await axios.post(`http://localhost:3001/login`);
          let token = response.data.token;
          
          ctx.cookies.set('token', token, {
            httpOnly: false,
            secure: true,
            sameSite: 'none'
          });
        } catch(error) {
          console.error({error});
        }

        ctx.cookies.set('from_login_page', "no", {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });
      
        ctx.redirect('/merch');
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


  // adding verifyRequest middleware for /merch route 
  router.get('/merch', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });
  
  router.get('/merch-landing', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
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