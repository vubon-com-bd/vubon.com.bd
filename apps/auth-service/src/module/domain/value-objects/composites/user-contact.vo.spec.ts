/**
 * UserContactVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { UserContactVO } from './user-contact.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { UserEmailVO } from '../primitives/user-email.vo';
import { UserPhoneVO } from '../primitives/user-phone.vo';

describe('UserContactVO', () => {
  const userId = UserIdVO.of('user-1');
  const email1 = UserEmailVO.of('a@b.com');
  const email2 = UserEmailVO.of('c@d.com');
  const phone1 = UserPhoneVO.of('+8801712345678');
  const phone2 = UserPhoneVO.of('+8801812345678');

  describe('of()', () => {
    it('should create with primary contacts only', () => {
      const vo = UserContactVO.of({
        userId, primaryEmail: email1, primaryPhone: phone1,
      });
      expect(vo.primaryEmail.value).toBe('a@b.com');
      expect(vo.hasAlternateEmail()).toBe(false);
      expect(vo.hasAlternatePhone()).toBe(false);
    });

    it('should accept alternate email', () => {
      const vo = UserContactVO.of({
        userId, primaryEmail: email1, primaryPhone: phone1, alternateEmail: email2,
      });
      expect(vo.hasAlternateEmail()).toBe(true);
    });

    it('should accept alternate phone', () => {
      const vo = UserContactVO.of({
        userId, primaryEmail: email1, primaryPhone: phone1, alternatePhone: phone2,
      });
      expect(vo.hasAlternatePhone()).toBe(true);
    });

    it('should reject alternate email same as primary', () => {
      expect(() => UserContactVO.of({
        userId, primaryEmail: email1, primaryPhone: phone1, alternateEmail: email1,
      })).toThrow('differ from primary');
    });

    it('should reject alternate phone same as primary', () => {
      expect(() => UserContactVO.of({
        userId, primaryEmail: email1, primaryPhone: phone1, alternatePhone: phone1,
      })).toThrow('differ from primary');
    });
  });
});
