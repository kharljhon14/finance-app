import { clerkMiddleware, getAuth } from '@hono/clerk-auth';

import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import accounts from './accounts';
import { HTTPException } from 'hono/http-exception';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ error: 'internal error' }, 500);
});

app.get('/hello', clerkMiddleware(), (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ error: 'Unauthorized' });
  }

  return c.json({
    message: 'Hello Next.js!',
    userId: auth.userId
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/accounts', accounts);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
