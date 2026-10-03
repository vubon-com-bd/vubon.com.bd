/**
 * CanChangeEmailSpecification Unit Test
 */
import { CanChangeEmailSpecification } from '@domain/specifications/can-change-email.specification';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('CanChangeEmailSpecification', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('old@example.com'),
      name: UserNameVO.create('John'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('should be true for new email', () => {
    const user = buildUser();
    expect(
      CanChangeEmailSpecification.check(user, UserEmailVO.create('new@example.com'))
    ).toBe(true);
  });

  it('should be false for same email', () => {
    const user = buildUser();
    expect(
      CanChangeEmailSpecification.check(user, UserEmailVO.create('old@example.com'))
    ).toBe(false);
  });

  it('should be false for deleted user', () => {
    const user = buildUser();
    user.delete(now);
    expect(
      CanChangeEmailSpecification.check(user, UserEmailVO.create('new@example.com'))
    ).toBe(false);
  });

  it('should be false for suspended user', () => {
    const user = buildUser();
    user.suspend('test', now);
    expect(
      CanChangeEmailSpecification.check(user, UserEmailVO.create('new@example.com'))
    ).toBe(false);
  });
});
