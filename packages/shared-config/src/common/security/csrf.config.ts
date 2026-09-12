import { getOptionalEnv } from '../env/env.validation';
import { ENVIRONMENT } from '@vubon/shared-constants/src/common/environment.constants';

const nodeEnv = getOptionalEnv('NODE_ENV', ENVIRONMENT.DEVELOPMENT);

export const csrfConfig = {
  cookie: true,
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  sessionKey: 'csrfToken',
  tokenKey: '_csrf',
  headerKey: 'x-csrf-token',
  cookieOptions: {
    httpOnly: true,
    secure: nodeEnv === ENVIRONMENT.PRODUCTION,
    sameSite: 'strict' as const,
  },
} as const;
