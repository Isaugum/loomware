import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { RedisClientType } from 'redis';

export function createSessionMiddleware(redisClient: RedisClientType) {
  return session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'fallback_secret_change_me',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
      domain: process.env.COOKIE_DOMAIN || undefined,
    },
    name: process.env.SESSION_NAME || 'sid',
  });
}
