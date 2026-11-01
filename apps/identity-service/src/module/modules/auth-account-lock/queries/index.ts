import {
  GetAuthAccountLockStatusHandler,
  ListAuthLoginAttemptsHandler,
} from '../../../application/queries/auth/index.js';

export const LOCK_QUERY_HANDLERS = [
  GetAuthAccountLockStatusHandler,
  ListAuthLoginAttemptsHandler,
] as const;
