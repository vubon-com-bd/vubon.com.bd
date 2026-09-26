/**
 * UserVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { UserVO } from './user.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { UserEmailVO } from '../primitives/user-email.vo';
import { UserNameVO } from '../primitives/user-name.vo';
import { UserStatusVO } from '../primitives/user-status.vo';
import { UserTypeVO } from '../primitives/user-type.vo';

describe('UserVO', () => {
  const buildUser = (status = 'active') =>
    UserVO.of({
      id: UserIdVO.of('user-1'),
      email: UserEmailVO.of('a@b.com'),
      name: UserNameVO.of('John Doe'),
      status: UserStatusVO.of(status),
      type: UserTypeVO.of('customer'),
    });

  describe('of()', () => {
    it('should create with all fields', () => {
      const vo = buildUser();
      expect(vo.id.value).toBe('user-1');
      expect(vo.email.value).toBe('a@b.com');
      expect(vo.name.value).toBe('John Doe');
    });
  });

  describe('getters', () => {
    it('should expose id', () => {
      expect(buildUser().id.value).toBe('user-1');
    });

    it('should expose email', () => {
      expect(buildUser().email.value).toBe('a@b.com');
    });

    it('should expose name', () => {
      expect(buildUser().name.value).toBe('John Doe');
    });

    it('should expose status', () => {
      expect(buildUser().status.value).toBe('active');
    });

    it('should expose type', () => {
      expect(buildUser().type.value).toBe('customer');
    });
  });

  describe('isActive()', () => {
    it('should return true for active user', () => {
      expect(buildUser('active').isActive()).toBe(true);
    });

    it('should return false for suspended user', () => {
      expect(buildUser('suspended').isActive()).toBe(false);
    });
  });

  describe('canLogin()', () => {
    it('should return true for active', () => {
      expect(buildUser('active').canLogin()).toBe(true);
    });

    it('should return false for suspended', () => {
      expect(buildUser('suspended').canLogin()).toBe(false);
    });

    it('should return false for pending', () => {
      expect(buildUser('pending').canLogin()).toBe(false);
    });
  });

  describe('sameIdentity()', () => {
    it('should return true for same id', () => {
      const a = buildUser();
      const b = buildUser();
      expect(a.sameIdentity(b)).toBe(true);
    });

    it('should return false for different id', () => {
      const a = UserVO.of({
        id: UserIdVO.of('user-1'),
        email: UserEmailVO.of('a@b.com'),
        name: UserNameVO.of('John Doe'),
        status: UserStatusVO.of('active'),
        type: UserTypeVO.of('customer'),
      });
      const b = UserVO.of({
        id: UserIdVO.of('user-2'),
        email: UserEmailVO.of('c@d.com'),
        name: UserNameVO.of('Jane Doe'),
        status: UserStatusVO.of('active'),
        type: UserTypeVO.of('customer'),
      });
      expect(a.sameIdentity(b)).toBe(false);
    });
  });
});
