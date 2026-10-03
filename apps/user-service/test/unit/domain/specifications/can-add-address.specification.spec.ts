/**
 * CanAddAddressSpecification Unit Test
 */
import { CanAddAddressSpecification } from '@domain/specifications/can-add-address.specification';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('CanAddAddressSpecification', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildActiveUser = () => {
    const u = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    u.activate(now);
    return u;
  };

  it('should be true when below limit', () => {
    const user = buildActiveUser();
    expect(CanAddAddressSpecification.check(user, 3, 10)).toBe(true);
  });

  it('should be false when at limit', () => {
    const user = buildActiveUser();
    expect(CanAddAddressSpecification.check(user, 10, 10)).toBe(false);
  });

  it('should be false for deleted user', () => {
    const user = buildActiveUser();
    user.delete(now);
    expect(CanAddAddressSpecification.check(user, 0, 10)).toBe(false);
  });

  it('should be false for non-active user', () => {
    const user = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John'),
      type: UserTypeVO.create('individual'),
      now,
    });
    expect(CanAddAddressSpecification.check(user, 0, 10)).toBe(false);
  });

  it('should work as instance', () => {
    const user = buildActiveUser();
    const spec = new CanAddAddressSpecification(5, 10);
    expect(spec.isSatisfiedBy(user)).toBe(true);
  });
});
