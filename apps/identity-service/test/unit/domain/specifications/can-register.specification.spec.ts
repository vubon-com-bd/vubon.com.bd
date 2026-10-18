/**
 * CanRegisterSpecification — Unit Tests
 */
import { CanRegisterSpecification } from '@domain/specifications/can-register.specification.js';

const SPEC = new CanRegisterSpecification();

function make(overrides?: {
  identifier?: string;
  registrationEnabled?: boolean;
  ipBlocked?: boolean;
  existingIdentifierCount?: number;
  maxIdentifiersPerUser?: number;
  ipRegistrationCount24h?: number;
  maxRegistrationsPerIp24h?: number;
}) {
  return {
    identifier: overrides?.identifier ?? 'user@example.com',
    context: {
      existingIdentifierCount: overrides?.existingIdentifierCount ?? 0,
      maxIdentifiersPerUser: overrides?.maxIdentifiersPerUser,
      registrationEnabled: overrides?.registrationEnabled,
      ipBlocked: overrides?.ipBlocked,
      ipRegistrationCount24h: overrides?.ipRegistrationCount24h,
      maxRegistrationsPerIp24h: overrides?.maxRegistrationsPerIp24h,
    },
  };
}

describe('CanRegisterSpecification', () => {
  it('returns true for valid registration', () => {
    expect(SPEC.isSatisfiedBy(make())).toBe(true);
  });

  it('returns false when registration disabled', () => {
    expect(SPEC.isSatisfiedBy(make({ registrationEnabled: false }))).toBe(false);
  });

  it('returns false when IP blocked', () => {
    expect(SPEC.isSatisfiedBy(make({ ipBlocked: true }))).toBe(false);
  });

  it('returns false when identifier empty', () => {
    expect(SPEC.isSatisfiedBy(make({ identifier: '' }))).toBe(false);
  });

  it('returns false when identifier already exists', () => {
    expect(SPEC.isSatisfiedBy(make({ existingIdentifierCount: 1 }))).toBe(false);
  });

  it('returns false when IP registration limit reached (default)', () => {
    expect(SPEC.isSatisfiedBy(make({ ipRegistrationCount24h: 5 }))).toBe(false);
  });

  it('returns false when IP registration limit reached (custom)', () => {
    expect(
      SPEC.isSatisfiedBy(
        make({ ipRegistrationCount24h: 3, maxRegistrationsPerIp24h: 3 }),
      ),
    ).toBe(false);
  });

  describe('explain', () => {
    it('returns null when satisfied', () => {
      expect(SPEC.explain(make())).toBeNull();
    });

    it('explains registration disabled', () => {
      expect(SPEC.explain(make({ registrationEnabled: false }))).toBe(
        'Registration is disabled',
      );
    });

    it('explains IP blocked', () => {
      expect(SPEC.explain(make({ ipBlocked: true }))).toBe('IP is blocked');
    });

    it('explains empty identifier', () => {
      expect(SPEC.explain(make({ identifier: '' }))).toBe(
        'Identifier cannot be empty',
      );
    });

    it('explains identifier already registered', () => {
      expect(SPEC.explain(make({ existingIdentifierCount: 1 }))).toBe(
        'Identifier already registered',
      );
    });

    it('explains IP limit', () => {
      expect(SPEC.explain(make({ ipRegistrationCount24h: 5 }))).toContain(
        'Too many registrations',
      );
    });
  });

  it('strict factory returns instance', () => {
    expect(CanRegisterSpecification.strict()).toBeInstanceOf(
      CanRegisterSpecification,
    );
  });
});
