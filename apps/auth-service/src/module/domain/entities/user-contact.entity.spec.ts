/**
 * UserContactEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { UserContactEntity } from './user-contact.entity';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildContact = (overrides: Partial<Parameters<typeof UserContactEntity.create>[0]> = {}) =>
  UserContactEntity.create({
    id: 'contact-1',
    userId: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    verified: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('UserContactEntity', () => {
  describe('create()', () => {
    it('should create with email only', () => {
      const c = buildContact();
      expect(c.email?.value).toBe('john@example.com');
      expect(c.phone).toBeUndefined();
    });

    it('should create with phone only', () => {
      const c = buildContact({
        email: undefined,
        phone: UserPhoneVO.of('+8801712345678'),
      });
      expect(c.phone?.value).toBe('+8801712345678');
      expect(c.email).toBeUndefined();
    });

    it('should create with both', () => {
      const c = buildContact({ phone: UserPhoneVO.of('+8801712345678') });
      expect(c.email).toBeDefined();
      expect(c.phone).toBeDefined();
    });

    it('should reject when neither email nor phone', () => {
      expect(() => buildContact({ email: undefined, phone: undefined }))
        .toThrow('must have email or phone');
    });
  });

  describe('markVerified() / markUnverified()', () => {
    it('should mark as verified', () => {
      const c = buildContact();
      c.markVerified();
      expect(c.verified).toBe(true);
    });

    it('should mark as unverified', () => {
      const c = buildContact({ verified: true });
      c.markUnverified();
      expect(c.verified).toBe(false);
    });
  });

  describe('identity', () => {
    it('should preserve id', () => {
      expect(buildContact().id).toBe('contact-1');
    });

    it('should preserve userId', () => {
      expect(buildContact().userId).toBe('user-1');
    });
  });
});
