/**
 * CanAddAddressSpecification — Unit Tests
 * @module identity-service/test/unit/domain/specifications
 */
import { CanAddAddressSpecification } from '@domain/specifications/can-add-address.specification.js';
import { USER_ADDRESS } from '@vubon/shared-constants/user';

const SPEC = new CanAddAddressSpecification();

function makeCandidate(overrides?: {
  userActive?: boolean;
  currentAddressCount?: number;
}) {
  return {
    userId: 'user-1',
    context: {
      userActive: overrides?.userActive ?? true,
      currentAddressCount: overrides?.currentAddressCount ?? 0,
    },
  };
}

describe('CanAddAddressSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when user is active and has zero addresses', () => {
      expect(SPEC.isSatisfiedBy(makeCandidate())).toBe(true);
    });

    it('returns true when addresses below limit', () => {
      expect(
        SPEC.isSatisfiedBy(makeCandidate({ currentAddressCount: USER_ADDRESS.MAX_ADDRESSES - 1 })),
      ).toBe(true);
    });

    it('returns false when user is inactive', () => {
      expect(SPEC.isSatisfiedBy(makeCandidate({ userActive: false }))).toBe(false);
    });

    it('returns false when address limit reached', () => {
      expect(
        SPEC.isSatisfiedBy(makeCandidate({ currentAddressCount: USER_ADDRESS.MAX_ADDRESSES })),
      ).toBe(false);
    });

    it('returns false when above limit', () => {
      expect(
        SPEC.isSatisfiedBy(makeCandidate({ currentAddressCount: USER_ADDRESS.MAX_ADDRESSES + 5 })),
      ).toBe(false);
    });
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      expect(SPEC.explain(makeCandidate())).toBeNull();
    });

    it('explains inactive user', () => {
      expect(SPEC.explain(makeCandidate({ userActive: false }))).toBe('user is not active');
    });

    it('explains address limit reached', () => {
      const result = SPEC.explain(
        makeCandidate({ currentAddressCount: USER_ADDRESS.MAX_ADDRESSES }),
      );
      expect(result).toBe(`address limit reached (${USER_ADDRESS.MAX_ADDRESSES})`);
    });
  });

  describe('strict factory', () => {
    it('returns a new instance', () => {
      const instance = CanAddAddressSpecification.strict();
      expect(instance).toBeInstanceOf(CanAddAddressSpecification);
    });
  });
});
