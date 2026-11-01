import { InvalidTokenError } from '../errors/invalid-token-error';

export function assertNonEmptyToken(token: string, label = 'token'): void {
  if (typeof token !== 'string' || token.trim().length === 0) {
    throw new InvalidTokenError(`${label} is empty`);
  }
}

export function assertTokenType(actual: string, expected: string): void {
  if (actual !== expected) {
    throw new InvalidTokenError(`Expected token type "${expected}", got "${actual}"`);
  }
}
