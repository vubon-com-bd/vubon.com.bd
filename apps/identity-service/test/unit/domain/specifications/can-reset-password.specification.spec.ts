/**
 * CanResetPasswordSpecification — Unit Tests
 */
import { CanResetPasswordSpecification } from '@domain/specifications/can-reset-password.specification.js';

const SPEC = new CanResetPasswordSpecification();

function makeAuth(overrides?: {
  isFinal?: boolean;
  isActive?: boolean;
  isLocked?: boolean;
  statusValue?: string;
}) {
  return {
    isFinal: () => overrides?.isFinal ?? false,
    isActive: () => overrides?.isActive ?? true,
    isLocked: () => overrides?.isLocked ?? false,
    status: { value: overrides?.statusValue ?? 'active' },
  } as unknown as Parameters<typeof SPEC.isSatisfiedBy>[0]['auth'];
}

describe('CanResetPasswordSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true for active user with no recent resets', () => {
      expect(SPEC.isSatisfiedBy({ auth: makeAuth() })).toBe(true);
    });

    it('returns false for final status', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isFinal: true, statusValue: 'revoked' }),
        }),
      ).toBe(false);
    });

    it('returns false for inactive non-locked user', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isActive: false, isLocked: false, statusValue: 'inactive' }),
        }),
      ).toBe(false);
    });

    it('returns true for locked user', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth({ isActive: false, isLocked: true }),
        }),
      ).toBe(true);
    });

    it('returns false when max resets reached (default)', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: { recentResetCount: 3 },
        }),
      ).toBe(false);
    });

    it('returns false when max resets reached (custom)', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: { recentResetCount: 2, maxResetsPerHour: 2 },
        }),
      ).toBe(false);
    });

    it('returns false when within cooldown AND at max (line 39)', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: {
            recentResetCount: 3,
            lastResetAtMs: Date.now() - 5 * 60 * 1000,
            resetWindowMinutes: 60,
          },
        }),
      ).toBe(false);
    });

    it('returns true when within cooldown but below max (line 39 — false branch)', () => {
      expect(
        SPEC.isSatisfiedBy({
          auth: makeAuth(),
          context: {
            recentResetCount: 1,
            lastResetAtMs: Date.now() - 5 * 60 * 1000,
            resetWindowMinutes: 60,
          },
        }),
      ).toBe(true);
    });
  });

  describe('explain', () => {
    it('explains final status', () => {
      expect(
        SPEC.explain({
          auth: makeAuth({ isFinal: true, statusValue: 'revoked' }),
        }),
      ).toContain('terminal');
    });

    it('explains inactive status', () => {
      expect(
        SPEC.explain({
          auth: makeAuth({ isActive: false, isLocked: false, statusValue: 'inactive' }),
        }),
      ).toContain('does not allow password reset');
    });

    it('explains max resets (default)', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: { recentResetCount: 3 },
        }),
      ).toContain('Too many password reset');
    });

    it('explains max resets (custom)', () => {
      expect(
        SPEC.explain({
          auth: makeAuth(),
          context: { recentResetCount: 2, maxResetsPerHour: 2 },
        }),
      ).toContain('Too many password reset');
    });

    it('returns null when satisfied', () => {
      expect(SPEC.explain({ auth: makeAuth() })).toBeNull();
    });
  });

  it('strict factory returns instance', () => {
    expect(CanResetPasswordSpecification.strict()).toBeInstanceOf(
      CanResetPasswordSpecification,
    );
  });
});
