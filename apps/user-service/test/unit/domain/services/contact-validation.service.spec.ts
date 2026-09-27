/**
 * ContactValidationService Unit Test
 */
import { ContactValidationService } from '@domain/services/contact-validation.service';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';

describe('ContactValidationService', () => {
  describe('validateForType', () => {
    it('should validate valid email', () => {
      expect(() =>
        ContactValidationService.validateForType(
          ContactTypeVO.create('email'),
          ContactValueVO.create('user@example.com')
        )
      ).not.toThrow();
    });

    it('should throw on invalid email', () => {
      expect(() =>
        ContactValidationService.validateForType(
          ContactTypeVO.create('email'),
          ContactValueVO.create('not-an-email')
        )
      ).toThrow();
    });

    it('should validate valid BD phone', () => {
      expect(() =>
        ContactValidationService.validateForType(
          ContactTypeVO.create('phone'),
          ContactValueVO.create('+8801712345678')
        )
      ).not.toThrow();
    });

    it('should throw on invalid phone', () => {
      expect(() =>
        ContactValidationService.validateForType(
          ContactTypeVO.create('phone'),
          ContactValueVO.create('123')
        )
      ).toThrow();
    });

    it('should validate valid URL', () => {
      expect(() =>
        ContactValidationService.validateForType(
          ContactTypeVO.create('website'),
          ContactValueVO.create('https://example.com')
        )
      ).not.toThrow();
    });
  });

  describe('canBeLoginIdentifier', () => {
    it('should be true for email/phone', () => {
      expect(ContactValidationService.canBeLoginIdentifier(ContactTypeVO.create('email'))).toBe(true);
      expect(ContactValidationService.canBeLoginIdentifier(ContactTypeVO.create('phone'))).toBe(true);
    });

    it('should be false for whatsapp', () => {
      expect(ContactValidationService.canBeLoginIdentifier(ContactTypeVO.create('whatsapp'))).toBe(false);
    });
  });

  describe('requiresVerification', () => {
    it('should be true for email/phone only', () => {
      expect(ContactValidationService.requiresVerification(ContactTypeVO.create('email'))).toBe(true);
      expect(ContactValidationService.requiresVerification(ContactTypeVO.create('phone'))).toBe(true);
      expect(ContactValidationService.requiresVerification(ContactTypeVO.create('website'))).toBe(false);
    });
  });
});
