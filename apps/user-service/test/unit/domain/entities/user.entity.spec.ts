/**
 * UserEntity Unit Test
 */
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('UserEntity', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  describe('create', () => {
    it('should create a user in pending status', () => {
      const user = buildUser();
      expect(user.id).toBe('user-1');
      expect(user.email.value).toBe('user@example.com');
      expect(user.name.value).toBe('John Doe');
      expect(user.status.value).toBe('pending');
      expect(user.type.value).toBe('individual');
      expect(user.emailVerified).toBe(false);
      expect(user.phoneVerified).toBe(false);
    });

    it('should have no phone by default', () => {
      const user = buildUser();
      expect(user.phone).toBeNull();
      expect(user.hasPhone()).toBe(false);
    });

    it('should emit UserCreatedEvent', () => {
      const user = buildUser();
      const events = user.pullDomainEvents();
      expect(events.length).toBeGreaterThan(0);
      expect(events[0].type).toBe('user.created');
    });

    it('should start at version 1 (after create event)', () => {
      const user = buildUser();
      expect(user.version).toBe(1);
    });
  });

  describe('activate', () => {
    it('should set status to active', () => {
      const user = buildUser();
      user.activate(now);
      expect(user.status.value).toBe('active');
      expect(user.isActive()).toBe(true);
    });

    it('should emit UserActivatedEvent', () => {
      const user = buildUser();
      user.pullDomainEvents(); // drain create
      user.activate(now);
      const events = user.pullDomainEvents();
      expect(events.length).toBe(1);
      expect(events[0].type).toBe('user.activated');
    });

    it('should be idempotent when already active', () => {
      const user = buildUser();
      user.activate(now);
      const v1 = user.version;
      user.activate(now);
      expect(user.version).toBe(v1); // no new version bump
    });
  });

  describe('suspend', () => {
    it('should set status to suspended', () => {
      const user = buildUser();
      user.suspend('policy violation', now);
      expect(user.status.value).toBe('suspended');
      expect(user.status.isSuspended()).toBe(true);
    });

    it('should emit UserSuspendedEvent', () => {
      const user = buildUser();
      user.pullDomainEvents();
      user.suspend('spam', now);
      const events = user.pullDomainEvents();
      expect(events.length).toBe(1);
      expect(events[0].type).toBe('user.suspended');
    });

    it('should refuse to suspend admin', () => {
      const admin = UserEntity.create({
        id: UserIdVO.create('admin-1'),
        email: UserEmailVO.create('admin@example.com'),
        name: UserNameVO.create('Admin'),
        type: UserTypeVO.create('admin'),
        now,
      });
      expect(() => admin.suspend('test', now)).toThrow('Cannot suspend an admin');
    });
  });

  describe('changeName', () => {
    it('should update name', () => {
      const user = buildUser();
      user.changeName(UserNameVO.create('Jane Smith'), now);
      expect(user.name.value).toBe('Jane Smith');
      expect(user.version).toBeGreaterThan(1);
    });
  });

  describe('changeEmail', () => {
    it('should update email and reset verification', () => {
      const user = buildUser();
      user.markEmailVerified();
      expect(user.emailVerified).toBe(true);

      user.changeEmail(UserEmailVO.create('new@example.com'), now);
      expect(user.email.value).toBe('new@example.com');
      expect(user.emailVerified).toBe(false);
    });

    it('should be no-op if email unchanged', () => {
      const user = buildUser();
      user.markEmailVerified();
      const v = user.version;
      user.changeEmail(UserEmailVO.create('user@example.com'), now);
      expect(user.version).toBe(v);
      expect(user.emailVerified).toBe(true);
    });
  });

  describe('changePhone', () => {
    it('should set a phone number', () => {
      const user = buildUser();
      expect(user.hasPhone()).toBe(false);

      const phone = { value: '+8801712345678' } as never;
      user.changePhone(phone, now);
      expect(user.hasPhone()).toBe(true);
    });
  });

  describe('markEmailVerified / markPhoneVerified', () => {
    it('should set emailVerified true', () => {
      const user = buildUser();
      user.markEmailVerified();
      expect(user.emailVerified).toBe(true);
    });

    it('should set phoneVerified true', () => {
      const user = buildUser();
      user.markPhoneVerified();
      expect(user.phoneVerified).toBe(true);
    });
  });

  describe('delete', () => {
    it('should emit UserDeletedEvent', () => {
      const user = buildUser();
      user.pullDomainEvents();
      user.delete(now);
      const events = user.pullDomainEvents();
      expect(events.length).toBe(1);
      expect(events[0].type).toBe('user.deleted');
    });
  });

  describe('invariants', () => {
    it('canLogin requires active + emailVerified', () => {
      const user = buildUser();
      expect(user.canLogin()).toBe(false);

      user.markEmailVerified();
      expect(user.canLogin()).toBe(false); // still pending

      user.activate(now);
      expect(user.canLogin()).toBe(true);
    });

    it('requiresKyc for individual', () => {
      const user = buildUser();
      expect(user.requiresKyc()).toBe(true);
    });

    it('isAdmin for admin type', () => {
      const admin = UserEntity.create({
        id: UserIdVO.create('admin-2'),
        email: UserEmailVO.create('admin2@example.com'),
        name: UserNameVO.create('Admin Two'),
        type: UserTypeVO.create('admin'),
        now,
      });
      expect(admin.isAdmin()).toBe(true);
    });
  });

  describe('toUserVO', () => {
    it('should return a UserVO', () => {
      const user = buildUser();
      const vo = user.toUserVO();
      expect(vo.id.value).toBe('user-1');
      expect(vo.email.value).toBe('user@example.com');
    });
  });
});
