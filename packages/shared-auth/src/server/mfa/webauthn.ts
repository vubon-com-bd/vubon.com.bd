import { randomBytes } from 'node:crypto';

/**
 * Minimal WebAuthn challenge / credential-id helpers.
 * Full WebAuthn ceremony verification requires a dedicated
 * library (e.g. @simplewebauthn/server). This is a stub.
 */
export interface WebAuthnChallenge {
  readonly challenge: string;
  readonly expiresAt: number;
}

export function createWebAuthnChallenge(ttlSeconds = 300): WebAuthnChallenge {
  return {
    challenge: randomBytes(32).toString('base64url'),
    expiresAt: Date.now() + ttlSeconds * 1000,
  };
}

export function isChallengeExpired(ch: WebAuthnChallenge): boolean {
  return ch.expiresAt <= Date.now();
}

export interface WebAuthnVerifyInput {
  readonly challenge: string;
  readonly clientDataJSON: string;
  readonly authenticatorData: string;
  readonly signature: string;
}

/**
 * ⚠️ Stub — replace with real WebAuthn verification using
 * @simplewebauthn/server (verifyRegistrationResponse /
 * verifyAuthenticationResponse).
 */
export async function verifyWebAuthnAssertion(input: WebAuthnVerifyInput): Promise<boolean> {
  return Boolean(
    input.challenge && input.clientDataJSON && input.authenticatorData && input.signature
  );
}
