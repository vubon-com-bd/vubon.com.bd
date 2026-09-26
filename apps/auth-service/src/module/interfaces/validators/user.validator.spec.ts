/**
 * UserValidator (interface) — Unit Tests
 * @module auth-service/interfaces/validators
 *
 * Real schema-compliant data:
 * - UserType: individual | business | vendor | admin | staff | guest | system
 * - CreateUserRequest: email, password, type, acceptTerms (no phone required)
 * - UpdateUserRequest: at least one of username/phone/status/type/roles
 * - UpdateProfileRequest: at least one profile field
 * - UpdateSettingsRequest: at least one setting
 * - UpdatePreferencesRequest: at least one preference
 * - AddContactRequest: type + value
 * - SubmitKycRequest: documents[] + acceptTerms
 */
import { UserValidator } from './user.validator';

const STRONG = 'Str0ng!Pass@2024';
const UUID = '00000000-0000-0000-0000-000000000001';

describe('UserValidator', () => {
  // ═══════════════════════════════════════════════════════════
  // create
  // ═══════════════════════════════════════════════════════════

  describe('create()', () => {
    const valid = {
      email: 'new@example.com',
      password: STRONG,
      type: 'individual' as const, // ← REAL VALUE
      acceptTerms: true as const,
    };

    it('should parse valid create input', () => {
      const result = UserValidator.create(valid);
      expect(result.email).toBe('new@example.com');
    });

    it('should accept optional firstName', () => {
      const result = UserValidator.create({ ...valid, firstName: 'John' });
      expect(result.firstName).toBe('John');
    });

    it('should throw on invalid type', () => {
      expect(() => UserValidator.create({ ...valid, type: 'superuser' })).toThrow();
    });

    it('should accept vendor type', () => {
      const result = UserValidator.create({ ...valid, type: 'vendor' });
      expect(result.type).toBe('vendor');
    });

    it('should throw on weak password', () => {
      expect(() => UserValidator.create({ ...valid, password: 'weak' })).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // update
  // ═══════════════════════════════════════════════════════════

  describe('update()', () => {
    it('should accept partial username update', () => {
      const result = UserValidator.update({ username: 'johndoe' });
      expect(result.username).toBe('johndoe');
    });

    it('should accept status update', () => {
      const result = UserValidator.update({ status: 'active' });
      expect(result.status).toBe('active');
    });

    it('should throw on invalid status', () => {
      expect(() => UserValidator.update({ status: 'invalid' })).toThrow();
    });

    it('should throw on empty object (refine)', () => {
      expect(() => UserValidator.update({})).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // updateProfile
  // ═══════════════════════════════════════════════════════════

  describe('updateProfile()', () => {
    it('should parse displayName', () => {
      const result = UserValidator.updateProfile({ displayName: 'John' });
      expect(result.displayName).toBe('John');
    });

    it('should parse bio', () => {
      const result = UserValidator.updateProfile({ bio: 'Hello' });
      expect(result.bio).toBe('Hello');
    });

    it('should throw on empty object (refine)', () => {
      expect(() => UserValidator.updateProfile({})).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // updateSettings
  // ═══════════════════════════════════════════════════════════

  describe('updateSettings()', () => {
    it('should parse theme', () => {
      const result = UserValidator.updateSettings({ theme: 'dark' });
      expect(result.theme).toBe('dark');
    });

    it('should parse twoFactor flag', () => {
      const result = UserValidator.updateSettings({ twoFactor: true });
      expect(result.twoFactor).toBe(true);
    });

    it('should throw on empty object', () => {
      expect(() => UserValidator.updateSettings({})).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // updatePreferences
  // ═══════════════════════════════════════════════════════════

  describe('updatePreferences()', () => {
    it('should parse newsletter', () => {
      const result = UserValidator.updatePreferences({ newsletter: true });
      expect(result.newsletter).toBe(true);
    });

    it('should parse securityAlerts', () => {
      const result = UserValidator.updatePreferences({ securityAlerts: false });
      expect(result.securityAlerts).toBe(false);
    });

    it('should throw on empty object', () => {
      expect(() => UserValidator.updatePreferences({})).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // addAddress
  // ═══════════════════════════════════════════════════════════

  describe('addAddress()', () => {
    it('should parse valid address with real schema fields', () => {
      const result = UserValidator.addAddress({
        type: 'home',
        line1: '123 Main St',
        city: 'Dhaka',
        country: 'BD',
      } as never);
      expect(result.type).toBeDefined();
    });

    it('should throw on missing type', () => {
      expect(() =>
        UserValidator.addAddress({
          line1: '123 Main',
          city: 'Dhaka',
          country: 'BD',
        } as never),
      ).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // updateAddress
  // ═══════════════════════════════════════════════════════════

  describe('updateAddress()', () => {
    it('should parse partial line1 update', () => {
      const result = UserValidator.updateAddress({ line1: '456 New' } as never);
      expect(result.line1).toBe('456 New');
    });

    it('should throw on empty object (refine)', () => {
      expect(() => UserValidator.updateAddress({} as never)).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // addContact
  // ═══════════════════════════════════════════════════════════

  describe('addContact()', () => {
    it('should accept email contact', () => {
      const result = UserValidator.addContact({
        type: 'email',
        value: 'alt@example.com',
      } as never);
      expect(result.value).toBe('alt@example.com');
    });

    it('should accept phone contact', () => {
      const result = UserValidator.addContact({
        type: 'phone',
        value: '+8801712345678',
      } as never);
      expect(result.value).toBe('+8801712345678');
    });

    it('should throw on missing type', () => {
      expect(() => UserValidator.addContact({ value: 'x' } as never)).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // submitKyc — REAL: documents[] + acceptTerms
  // ═══════════════════════════════════════════════════════════

  describe('submitKyc()', () => {
    it('should parse valid KYC with documents array', () => {
      const result = UserValidator.submitKyc({
        documents: [
          {
            type: 'nid',
            frontUrl: 'https://example.com/front.jpg',
            verified: false,
            uploadedAt: new Date().toISOString(),
          },
        ],
        acceptTerms: true,
      } as never);
      expect(result.documents).toHaveLength(1);
    });

    it('should throw on empty documents array', () => {
      expect(() =>
        UserValidator.submitKyc({
          documents: [],
          acceptTerms: true,
        } as never),
      ).toThrow();
    });

    it('should throw on missing acceptTerms', () => {
      expect(() =>
        UserValidator.submitKyc({
          documents: [
            {
              type: 'nid',
              frontUrl: 'https://example.com/front.jpg',
              verified: false,
              uploadedAt: new Date().toISOString(),
            },
          ],
        } as never),
      ).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // changePassword
  // ═══════════════════════════════════════════════════════════

  describe('changePassword()', () => {
    it('should parse valid change', () => {
      const result = UserValidator.changePassword({
        currentPassword: 'OldP@ss1234',
        newPassword: 'N3w!Str0ng@Pass',
        confirmPassword: 'N3w!Str0ng@Pass',
      } as never);
      expect(result.newPassword).toBe('N3w!Str0ng@Pass');
    });

    it('should throw on weak newPassword', () => {
      expect(() =>
        UserValidator.changePassword({
          currentPassword: 'OldP@ss1234',
          newPassword: 'weak',
          confirmPassword: 'weak',
        } as never),
      ).toThrow();
    });

    it('should throw when newPassword === currentPassword', () => {
      expect(() =>
        UserValidator.changePassword({
          currentPassword: STRONG,
          newPassword: STRONG,
          confirmPassword: STRONG,
        } as never),
      ).toThrow();
    });
  });
});
