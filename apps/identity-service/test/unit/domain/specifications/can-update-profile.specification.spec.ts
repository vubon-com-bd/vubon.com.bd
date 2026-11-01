/**
 * CanUpdateProfileSpecification — Unit Tests
 */
import { CanUpdateProfileSpecification } from '@domain/specifications/can-update-profile.specification.js';

const SPEC = new CanUpdateProfileSpecification();

function makeUser(overrides?: {
  isFinal?: boolean;
  isAdmin?: boolean;
  statusValue?: string;
}) {
  return {
    isFinal: () => overrides?.isFinal ?? false,
    isAdmin: () => overrides?.isAdmin ?? false,
    status: { value: overrides?.statusValue ?? 'active' },
  } as unknown as Parameters<typeof SPEC.isSatisfiedBy>[0]['user'];
}

describe('CanUpdateProfileSpecification', () => {
  it('returns true for self update', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser(),
        context: { isSelf: true },
      }),
    ).toBe(true);
  });

  it('returns true for admin updating another user', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser(),
        context: { isSelf: false, isAdmin: true },
      }),
    ).toBe(true);
  });

  it('returns false for non-self non-admin', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser(),
        context: { isSelf: false, isAdmin: false },
      }),
    ).toBe(false);
  });

  it('returns false when user is final', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser({ isFinal: true }),
        context: { isSelf: true },
      }),
    ).toBe(false);
  });

  it('returns false when admin trying to update another admin', () => {
    expect(
      SPEC.isSatisfiedBy({
        user: makeUser({ isAdmin: true }),
        context: { isSelf: false, isAdmin: true },
      }),
    ).toBe(false);
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      expect(
        SPEC.explain({
          user: makeUser(),
          context: { isSelf: true },
        }),
      ).toBeNull();
    });

    it('explains final status', () => {
      expect(
        SPEC.explain({
          user: makeUser({ isFinal: true }),
          context: { isSelf: true },
        }),
      ).toContain('final');
    });

    it('explains missing permissions', () => {
      expect(
        SPEC.explain({
          user: makeUser(),
          context: { isSelf: false, isAdmin: false },
        }),
      ).toBe('Only self or admin can update profile');
    });

    it('explains admin target admin', () => {
      expect(
        SPEC.explain({
          user: makeUser({ isAdmin: true }),
          context: { isSelf: false, isAdmin: true },
        }),
      ).toBe('Cannot update another admin user');
    });
  });

  it('strict factory returns instance', () => {
    expect(CanUpdateProfileSpecification.strict()).toBeInstanceOf(
      CanUpdateProfileSpecification,
    );
  });
});
