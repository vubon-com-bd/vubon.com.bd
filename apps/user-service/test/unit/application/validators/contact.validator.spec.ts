/**
 * ContactValidator Unit Test
 *
 * NOTE: AddContactRequestSchema uses .strict() and does NOT include userId
 * (userId comes from auth context). Allowed types come from
 * USER_CONTACT_TYPE constant: email, phone, whatsapp, telegram, messenger,
 * skype, website, social.
 */
import { ContactValidator } from '@application/validators/contact.validator';

describe('ContactValidator', () => {
  describe('validateAdd', () => {
    it('should pass valid email contact', () => {
      const result = ContactValidator.validateAdd({
        type: 'email',
        value: 'user@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should pass valid phone contact', () => {
      const result = ContactValidator.validateAdd({
        type: 'phone',
        value: '+8801712345678',
      });
      expect(result.success).toBe(true);
    });

    it('should fail on invalid type', () => {
      const result = ContactValidator.validateAdd({
        type: 'not-a-real-type',
        value: 'user@example.com',
      });
      expect(result.success).toBe(false);
    });

    it('should fail on missing value', () => {
      const result = ContactValidator.validateAdd({ type: 'email' });
      expect(result.success).toBe(false);
    });

    it('should fail on empty value', () => {
      const result = ContactValidator.validateAdd({
        type: 'email',
        value: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('validateByType', () => {
    it('should pass valid email', () => {
      expect(ContactValidator.validateByType('email', 'user@example.com').success).toBe(true);
    });

    it('should fail invalid email', () => {
      expect(ContactValidator.validateByType('email', 'bad').success).toBe(false);
    });

    it('should pass valid BD phone', () => {
      expect(ContactValidator.validateByType('phone', '+8801712345678').success).toBe(true);
    });

    it('should fail invalid phone', () => {
      expect(ContactValidator.validateByType('phone', '123').success).toBe(false);
    });

    it('should pass valid URL', () => {
      expect(ContactValidator.validateByType('website', 'https://example.com').success).toBe(true);
    });

    it('should fail invalid URL', () => {
      expect(ContactValidator.validateByType('website', 'bad').success).toBe(false);
    });

    it('should pass non-URL type with 2+ chars', () => {
      expect(ContactValidator.validateByType('telegram', '@johndoe').success).toBe(true);
    });
  });
});
