'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAMES } from '../utils/cookie-names';
import { ACCESS_COOKIE_OPTIONS, REFRESH_COOKIE_OPTIONS } from '../utils/cookie-options';

export interface LoginActionInput {
  readonly identifier: string;
  readonly password: string;
}

export interface LoginActionDeps {
  readonly login: (input: LoginActionInput) => Promise<{
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly sessionId: string;
  }>;
}

/**
 * Server Action factory.
 * Apps call this once with their login implementation and
 * receive a server action they can bind to a form.
 */
export function createLoginAction(deps: LoginActionDeps) {
  return async function loginAction(input: LoginActionInput): Promise<{
    readonly ok: boolean;
    readonly error?: string;
  }> {
    try {
      const result = await deps.login(input);
      const store = await cookies();
      store.set(AUTH_COOKIE_NAMES.accessToken, result.accessToken, ACCESS_COOKIE_OPTIONS);
      store.set(AUTH_COOKIE_NAMES.refreshToken, result.refreshToken, REFRESH_COOKIE_OPTIONS);
      store.set(AUTH_COOKIE_NAMES.sessionId, result.sessionId, ACCESS_COOKIE_OPTIONS);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'Login failed' };
    }
  };
}
