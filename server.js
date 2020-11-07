require('isomorphic-fetch');
const Koa = require('koa');
const next = require('next');
const { default: shopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');  
const session = require('koa-session');
const Router = require('koa-router');

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
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        }

        )
        ctx.redirect('/merch-landing');
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


  // merch page is missing; either you can add the merch.js page or just redirect to existing merch-landing page
  router.get('/merch', verifyRequest(), async (ctx) => {
    ctx.redirect('/merch-landing');
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
