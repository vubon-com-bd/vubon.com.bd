/**
 * CanUpdateProfileSpecification Unit Test
 */
import { CanUpdateProfileSpecification } from '@domain/specifications/can-update-profile.specification';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('CanUpdateProfileSpecification', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('should be true for active user', () => {
    const user = buildUser();
    user.activate(now);
    expect(CanUpdateProfileSpecification.check(user)).toBe(true);
  });

  it('should be true for pending user', () => {
    const user = buildUser();
    expect(CanUpdateProfileSpecification.check(user)).toBe(true);
  });

  it('should be false for suspended user', () => {
    const user = buildUser();
    user.suspend('test', now);
    expect(CanUpdateProfileSpecification.check(user)).toBe(false);
  });

  it('should be false for deleted user', () => {
    const user = buildUser();
    user.delete(now);
    expect(CanUpdateProfileSpecification.check(user)).toBe(false);
  });

  it('should work as instance', () => {
    const user = buildUser();
    user.activate(now);
    const spec = new CanUpdateProfileSpecification();
    expect(spec.isSatisfiedBy(user)).toBe(true);
  });
});
