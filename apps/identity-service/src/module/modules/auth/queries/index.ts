/**
 * Auth Query Handlers Barrel
 * @module identity-service/modules/auth/queries
 */
import {
  GetAuthSessionHandler,
  ListAuthSessionsHandler,
  ListAuthTokensHandler,
  GetAuthMfaSettingsHandler,
  GetAuthRecoveryCodesHandler,
  GetAuthSettingsHandler,
} from '../../../application/queries/auth/index.js';

export const AUTH_QUERY_HANDLERS = [
  GetAuthSessionHandler,
  ListAuthSessionsHandler,
  ListAuthTokensHandler,
  GetAuthMfaSettingsHandler,
  GetAuthRecoveryCodesHandler,
  GetAuthSettingsHandler,
] as const;
