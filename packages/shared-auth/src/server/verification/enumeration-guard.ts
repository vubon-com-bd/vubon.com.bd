import { pbkdf2 } from '@vubon/shared-utils/infrastructure/crypto/pbkdf2';

/**
 * Enumeration protection helpers.
 * Rule: valid vs invalid email/password MUST take similar time and
 * return similar responses.
 */
const DUMMY_SALT = 'vubon-dummy-salt-do-not-reuse';
const DUMMY_ITERATIONS = 100_000;

/**
 * Burn the same amount of CPU as a real password verify.
 * Call this when the user is NOT found — so timing is constant.
 */
export async function burnPasswordTiming(): Promise<void> {
  await pbkdf2('dummy-password', DUMMY_SALT, DUMMY_ITERATIONS, 32);
}

/** Response shape for login/forgot-password to avoid leaks. */
export interface ConstantAuthResponse {
  readonly ok: true;
  readonly message: string;
}

export function constantLoginResponse(): ConstantAuthResponse {
  return { ok: true, message: 'If the account exists, you will be notified.' };
}

export function constantForgotPasswordResponse(): ConstantAuthResponse {
  return {
    ok: true,
    message: 'If the email exists, a reset link has been sent.',
  };
}
