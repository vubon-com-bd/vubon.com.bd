/**
 * CanDeleteAccountSpecification Unit Test
 */
import { CanDeleteAccountSpecification } from '@domain/specifications/can-delete-account.specification';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('CanDeleteAccountSpecification', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildUser = (type: 'individual' | 'admin' = 'individual') =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John'),
      type: UserTypeVO.create(type),
      now,
    });

  it('should be true for normal user with no active orders', () => {
    expect(CanDeleteAccountSpecification.check(buildUser(), false)).toBe(true);
  });

  it('should be false for user with active orders', () => {
    expect(CanDeleteAccountSpecification.check(buildUser(), true)).toBe(false);
  });

  it('should be false for admin user', () => {
    expect(CanDeleteAccountSpecification.check(buildUser('admin'), false)).toBe(false);
  });

  it('should be false for already deleted user', () => {
    const user = buildUser();
    user.delete(now);
    expect(CanDeleteAccountSpecification.check(user, false)).toBe(false);
  });
});
