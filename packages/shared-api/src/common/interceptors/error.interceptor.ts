import { AuthError } from '../errors/auth-error';
import { normalizeError } from '../errors/error-handler';

/**
 * Auth failure handler — app layer registers a callback
 * (e.g. logout + redirect). shared-api NEVER redirects itself.
 */
export type AuthFailureHandler = (error: AuthError) => void;

let authFailureHandler: AuthFailureHandler | null = null;

export function registerAuthFailureHandler(handler: AuthFailureHandler): void {
  authFailureHandler = handler;
}

/**
 * Error interceptor.
 * Normalizes thrown value into ApiError and dispatches auth failures.
 */
export function errorInterceptor(error: unknown): never {
  const apiError = normalizeError(error);
  if (apiError instanceof AuthError && authFailureHandler) {
    authFailureHandler(apiError);
  }
  throw apiError;
}
