/**
 * CanRecoverAccountSpecification — Unit Tests
 */
import { CanRecoverAccountSpecification } from '@domain/specifications/can-recover-account.specification.js';

const SPEC = new CanRecoverAccountSpecification();

function makeAuth(overrides?: { isLocked?: boolean; isRevoked?: boolean }) {
  return {
    isLocked: () => overrides?.isLocked ?? true,
    isRevoked: () => overrides?.isRevoked ?? false,
  } as unknown as Parameters<typeof SPEC.isSatisfiedBy>[0]['auth'];
}

describe('CanRecoverAccountSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true for locked account with backup and identity verified', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isLocked: true }),
          context: {
            hasBackupEmail: true,
            identityVerified: true,
            recoveryAttemptsIn24h: 0,
          },
        }),
      ).toBe(true);
    });

    it('returns false when neither locked nor revoked', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isLocked: false, isRevoked: false }),
          context: { hasBackupEmail: true, identityVerified: true },
        }),
      ).toBe(false);
    });

    it('returns true for revoked account', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isLocked: false, isRevoked: true }),
          context: { hasBackupEmail: true, identityVerified: true },
        }),
      ).toBe(true);
    });

    it('returns false when max attempts reached (line 32 — custom max)', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: {
            hasBackupEmail: true,
            identityVerified: true,
            recoveryAttemptsIn24h: 5,
            maxRecoveryAttempts24h: 5,
          },
        }),
      ).toBe(false);
    });

    it('returns false when max attempts reached (line 32 — default max)', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: {
            hasBackupEmail: true,
            identityVerified: true,
            recoveryAttemptsIn24h: 3,
          },
        }),
      ).toBe(false);
    });

    it('returns false when no backup contact', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: { identityVerified: true },
        }),
      ).toBe(false);
    });

    it('returns false when identity not verified (line 47)', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: {
            hasBackupEmail: true,
            identityVerified: false,
          },
        }),
      ).toBe(false);
    });

    it('returns true with backup phone only', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: {
            hasBackupPhone: true,
            identityVerified: true,
          },
        }),
      ).toBe(true);
    });
  });

  describe('explain', () => {
    it('explains not locked or revoked', () => {
      expect(
        SPEC.explain({
          auth: makeAuth({ isLocked: false, isRevoked: false }),
          context: { hasBackupEmail: true, identityVerified: true },
        }),
      ).toContain('not locked or revoked');
    });

    it('explains max attempts (default)', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: {
            hasBackupEmail: true,
            identityVerified: true,
            recoveryAttemptsIn24h: 3,
          },
        }),
      ).toContain('Max recovery attempts');
    });

    it('explains max attempts (custom)', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: {
            hasBackupEmail: true,
            identityVerified: true,
            recoveryAttemptsIn24h: 2,
            maxRecoveryAttempts24h: 2,
          },
        }),
      ).toContain('Max recovery attempts');
    });

    it('explains no backup contact', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: { identityVerified: true },
        }),
      ).toBe('No backup email or phone configured');
    });

    it('explains identity not verified', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: { hasBackupEmail: true, identityVerified: false },
        }),
      ).toBe('Identity verification required');
    });

    it('returns null when satisfied', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: { hasBackupEmail: true, identityVerified: true },
        }),
      ).toBeNull();
    });
  });

  it('strict factory returns instance', () => {
    expect(CanRecoverAccountSpecification.strict()).toBeInstanceOf(
      CanRecoverAccountSpecification,
    );
  });
});
