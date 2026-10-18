/**
 * CanRefreshTokenSpecification — Unit Tests
 */
import { CanRefreshTokenSpecification } from '@domain/specifications/can-refresh-token.specification.js';

const SPEC = new CanRefreshTokenSpecification();

function makeToken(overrides?: {
  isRevoked?: boolean;
  isExpired?: boolean;
  isUsed?: boolean;
}) {
  return {
    isRevoked: () => overrides?.isRevoked ?? false,
    isExpired: () => overrides?.isExpired ?? false,
    isUsed: () => overrides?.isUsed ?? false,
  } as unknown as Parameters<typeof SPEC.isSatisfiedBy>[0]['token'];
}

function makeSession(overrides?: {
  isActive?: boolean;
  isExpired?: boolean;
  statusValue?: string;
}) {
  return {
    isActive: () => overrides?.isActive ?? true,
    isExpired: () => overrides?.isExpired ?? false,
    status: { value: overrides?.statusValue ?? 'active' },
  } as unknown as Parameters<typeof SPEC.isSatisfiedBy>[0]['session'];
}

describe('CanRefreshTokenSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true for valid token', () => {
      expect(SPEC.isSatisfiedBy({ token: makeToken() })).toBe(true);
    });

    it('returns false for revoked token', () => {
      expect(SPEC.isSatisfiedBy({ token: makeToken({ isRevoked: true }) })).toBe(false);
    });

    it('returns false for expired token', () => {
      expect(SPEC.isSatisfiedBy({ token: makeToken({ isExpired: true }) })).toBe(false);
    });

    it('returns false for used token', () => {
      expect(SPEC.isSatisfiedBy({ token: makeToken({ isUsed: true }) })).toBe(false);
    });

    it('returns false for token reuse detected', () => {
      expect(
        SPEC.isSatisfiedBy({
          token: makeToken(),
          context: { tokenReuseDetected: true },
        }),
      ).toBe(false);
    });

    it('returns false for revoked session', () => {
      expect(
        SPEC.isSatisfiedBy({
          token: makeToken(),
          context: { sessionRevoked: true },
        }),
      ).toBe(false);
    });

    it('returns false when session inactive', () => {
      expect(
        SPEC.isSatisfiedBy({
          token: makeToken(),
          session: makeSession({ isActive: false }),
        }),
      ).toBe(false);
    });

    it('returns false when session expired (line 51)', () => {
      expect(
        SPEC.isSatisfiedBy({
          token: makeToken(),
          session: makeSession({ isExpired: true }),
        }),
      ).toBe(false);
    });

    it('returns true when session valid', () => {
      expect(
        SPEC.isSatisfiedBy({
          token: makeToken(),
          session: makeSession(),
        }),
      ).toBe(true);
    });
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      expect(SPEC.explain({ token: makeToken() })).toBeNull();
    });

    it('explains revoked token', () => {
      expect(SPEC.explain({ token: makeToken({ isRevoked: true }) })).toBe(
        'Token is revoked',
      );
    });

    it('explains expired token', () => {
      expect(SPEC.explain({ token: makeToken({ isExpired: true }) })).toBe(
        'Token has expired',
      );
    });

    it('explains used token', () => {
      expect(SPEC.explain({ token: makeToken({ isUsed: true }) })).toBe(
        'Token has already been used',
      );
    });

    it('explains reuse detected', () => {
      expect(
        SPEC.explain({
          token: makeToken(),
          context: { tokenReuseDetected: true },
        }),
      ).toContain('Token reuse detected');
    });

    it('explains revoked session', () => {
      expect(
        SPEC.explain({
          token: makeToken(),
          context: { sessionRevoked: true },
        }),
      ).toBe('Session has been revoked');
    });

    it('explains session not active', () => {
      expect(
        SPEC.explain({
          token: makeToken(),
          session: makeSession({ isActive: false, statusValue: 'revoked' }),
        }),
      ).toContain('not active');
    });

    it('explains session expired (line 51)', () => {
      expect(
        SPEC.explain({
          token: makeToken(),
          session: makeSession({ isExpired: true }),
        }),
      ).toBe('Session has expired');
    });
  });

  it('strict factory returns instance', () => {
    expect(CanRefreshTokenSpecification.strict()).toBeInstanceOf(
      CanRefreshTokenSpecification,
    );
  });
});
