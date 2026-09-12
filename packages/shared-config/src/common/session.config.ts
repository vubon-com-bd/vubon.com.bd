import { getRequiredEnv, getOptionalEnv } from './env/env.validation';
import { ENVIRONMENT } from '@vubon/shared-constants/src/common/environment.constants';

const nodeEnv = getOptionalEnv('NODE_ENV', ENVIRONMENT.DEVELOPMENT);

export const sessionConfig = {
  /** @required — no fallback for security */
  secret: getRequiredEnv('SESSION_SECRET'),
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: nodeEnv === ENVIRONMENT.PRODUCTION,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax' as const,
  },
  store: {
    type: 'redis',
    host: getOptionalEnv('REDIS_HOST', 'localhost'),
    port: Number(getOptionalEnv('REDIS_PORT', '6379')),
    password: getOptionalEnv('REDIS_PASSWORD', ''),
    db: 1,
  },
} as const;
