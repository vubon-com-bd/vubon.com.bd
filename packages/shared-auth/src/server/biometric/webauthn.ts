import { randomBytes } from 'node:crypto';

/** Generate a WebAuthn challenge (base64url). */
export function generateChallenge(bytes = 32): string {
  return randomBytes(bytes).toString('base64url');
}

/** Generate a credential id placeholder. */
export function generateCredentialId(): string {
  return randomBytes(16).toString('base64url');
}
