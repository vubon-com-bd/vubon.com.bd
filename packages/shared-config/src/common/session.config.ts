import { getEnv } from './env/env.validation';

export const sessionConfig = {
  secret: getEnv('SESSION_SECRET', 'default-secret-key'),
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax',
  },
  store: {
    type: 'redis',
    host: getEnv('REDIS_HOST', 'localhost'),
    port: getEnv('REDIS_PORT', 6379),
    password: getEnv('REDIS_PASSWORD', undefined),
    db: 1,
  },
};
