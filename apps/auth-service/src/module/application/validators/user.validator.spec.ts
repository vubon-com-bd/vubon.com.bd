/**
 * UserValidator — Unit Tests (Schema-aware)
 * @module auth-service/application/validators
 */
import { UserValidator } from './user.validator';

describe('UserValidator', () => {
  // ═══════════════════════════════════════════════════════════
  // create — { email, password, type, acceptTerms }
  // ═══════════════════════════════════════════════════════════

  describe('create()', () => {
    const valid = {
      email: 'newuser@example.com',
      password: 'Str0ng!Pass#2024',
      type: 'individual',
      acceptTerms: true as const,
    };

    it('should accept valid input', () => {
      const r = UserValidator.create(valid);
      expect(r.email).toBe('newuser@example.com');
      expect(r.type).toBe('individual');
    });

    it('should accept valid types (vendor, admin, staff)', () => {
      ['vendor', 'admin', 'staff'].forEach((t) => {
        const r = UserValidator.create({ ...valid, type: t });
        expect(r.type).toBe(t);
      });
    });

    it('should reject invalid type', () => {
      expect(() => UserValidator.create({ ...valid, type: 'superuser' })).toThrow();
    });

    it('should reject weak password', () => {
      expect(() => UserValidator.create({ ...valid, password: 'weak' })).toThrow();
    });

    it('should reject missing acceptTerms', () => {
      const { acceptTerms: _, ...without } = valid;
      expect(() => UserValidator.create(without as never)).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // update — requires at least one field
  // ═══════════════════════════════════════════════════════════

  describe('update()', () => {
    it('should accept phone update', () => {
      const r = UserValidator.update({ phone: '+8801712345678' });
      expect(r.phone).toBe('+8801712345678');
    });

    it('should accept status update', () => {
      const r = UserValidator.update({ status: 'active' });
      expect(r.status).toBe('active');
    });

    it('should reject empty update', () => {
      expect(() => UserValidator.update({})).toThrow();
    });

    it('should accept emailVerified flag', () => {
      const r = UserValidator.update({ emailVerified: true });
      expect(r.emailVerified).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // updateProfile — min 1 field
  // ═══════════════════════════════════════════════════════════

  describe('updateProfile()', () => {
    it('should accept bio', () => {
      const r = UserValidator.updateProfile({ bio: 'Hello world' });
      expect(r.bio).toBe('Hello world');
    });

    it('should accept displayName', () => {
      const r = UserValidator.updateProfile({ displayName: 'John Doe' });
      expect(r.displayName).toBe('John Doe');
    });

    it('should accept dateOfBirth (YYYY-MM-DD)', () => {
      const r = UserValidator.updateProfile({ dateOfBirth: '1990-01-15' });
      expect(r.dateOfBirth).toBe('1990-01-15');
    });

    it('should reject invalid dateOfBirth format', () => {
      expect(() => UserValidator.updateProfile({ dateOfBirth: '15/01/1990' })).toThrow();
    });

    it('should reject empty update', () => {
      expect(() => UserValidator.updateProfile({})).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // updateSettings — min 1 field
  // ═══════════════════════════════════════════════════════════

  describe('updateSettings()', () => {
    it('should accept theme', () => {
      const r = UserValidator.updateSettings({ theme: 'dark' });
      expect(r.theme).toBe('dark');
    });

    it('should accept twoFactor flag', () => {
      const r = UserValidator.updateSettings({ twoFactor: true });
      expect(r.twoFactor).toBe(true);
    });

    it('should reject 3-letter constraint violation for currency', () => {
      expect(() => UserValidator.updateSettings({ currency: 'US' })).toThrow();
    });

    it('should reject empty update', () => {
      expect(() => UserValidator.updateSettings({})).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // updatePreferences — min 1 field
  // ═══════════════════════════════════════════════════════════

  describe('updatePreferences()', () => {
    it('should accept newsletter flag', () => {
      const r = UserValidator.updatePreferences({ newsletter: true });
      expect(r.newsletter).toBe(true);
    });

    it('should accept securityAlerts flag', () => {
      const r = UserValidator.updatePreferences({ securityAlerts: false });
      expect(r.securityAlerts).toBe(false);
    });

    it('should reject empty update', () => {
      expect(() => UserValidator.updatePreferences({})).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // addAddress — requires line1, city, country
  // ═══════════════════════════════════════════════════════════

  describe('addAddress()', () => {
    const valid = {
      line1: '123 Main St',
      city: 'Dhaka',
      country: 'BD',
      type: 'home',
    };

    it('should accept valid address', () => {
      const r = UserValidator.addAddress(valid);
      expect(r.line1).toBe('123 Main St');
      expect(r.type).toBe('home');
    });

    it('should default isDefault to false', () => {
      const r = UserValidator.addAddress(valid);
      expect(r.isDefault).toBe(false);
    });

    it('should reject too-short line1', () => {
      expect(() => UserValidator.addAddress({ ...valid, line1: 'ab' })).toThrow();
    });

    it('should reject too-short city', () => {
      expect(() => UserValidator.addAddress({ ...valid, city: 'D' })).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // addContact — { type, value, label?, isPrimary? }
  // ═══════════════════════════════════════════════════════════

  describe('addContact()', () => {
    it('should accept email contact', () => {
      const r = UserValidator.addContact({
        type: 'email',
        value: 'alt@example.com',
      });
      expect(r.type).toBe('email');
      expect(r.value).toBe('alt@example.com');
    });

    it('should accept phone contact', () => {
      const r = UserValidator.addContact({
        type: 'phone',
        value: '+8801712345678',
      });
      expect(r.type).toBe('phone');
    });

    it('should accept whatsapp contact', () => {
      const r = UserValidator.addContact({ type: 'whatsapp', value: '+8801712345678' });
      expect(r.type).toBe('whatsapp');
    });

    it('should reject invalid contact type', () => {
      expect(() =>
        UserValidator.addContact({ type: 'fax', value: 'some-value' }),
      ).toThrow();
    });

    it('should reject empty value', () => {
      expect(() => UserValidator.addContact({ type: 'email', value: '' })).toThrow();
    });

    it('should accept optional label', () => {
      const r = UserValidator.addContact({
        type: 'email',
        value: 'a@b.com',
        label: 'Work',
      });
      expect(r.label).toBe('Work');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // submitKyc — { documents: [...], acceptTerms: true }
  // ═══════════════════════════════════════════════════════════

  describe('submitKyc()', () => {
    const valid = {
      documents: [
        {
          type: 'nid',
          frontUrl: 'https://example.com/front.jpg',
        },
      ],
      acceptTerms: true as const,
    };

    it('should accept valid KYC', () => {
      const r = UserValidator.submitKyc(valid);
      expect(r.documents).toHaveLength(1);
    });

    it('should reject empty documents array', () => {
      expect(() =>
        UserValidator.submitKyc({ ...valid, documents: [] }),
      ).toThrow();
    });

    it('should reject missing acceptTerms', () => {
      const { acceptTerms: _, ...rest } = valid;
      expect(() => UserValidator.submitKyc(rest as never)).toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // changePassword — currentPassword, newPassword, confirmPassword
  // ═══════════════════════════════════════════════════════════

  describe('changePassword()', () => {
    const valid = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewStr0ng!Pass#2024',
      confirmPassword: 'NewStr0ng!Pass#2024',
    };

    it('should accept valid change', () => {
      const r = UserValidator.changePassword(valid);
      expect(r.newPassword).toBe('NewStr0ng!Pass#2024');
    });

    it('should reject when new === current', () => {
      expect(() =>
        UserValidator.changePassword({
          currentPassword: 'SamePass123!',
          newPassword: 'SamePass123!',
          confirmPassword: 'SamePass123!',
        }),
      ).toThrow();
    });

    it('should reject mismatched confirm', () => {
      expect(() =>
        UserValidator.changePassword({ ...valid, confirmPassword: 'Different' }),
      ).toThrow();
    });

    it('should reject weak new password', () => {
      expect(() =>
        UserValidator.changePassword({
          currentPassword: 'OldPass123!',
          newPassword: 'weak',
          confirmPassword: 'weak',
        }),
      ).toThrow();
    });
  });
});
