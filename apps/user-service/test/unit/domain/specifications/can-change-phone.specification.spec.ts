/**
 * CanChangePhoneSpecification Unit Test
 */
import { CanChangePhoneSpecification } from '@domain/specifications/can-change-phone.specification';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('CanChangePhoneSpecification', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildUser = () =>
    UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John'),
      type: UserTypeVO.create('individual'),
      now,
    });

  it('should be true when user has no phone and new phone provided', () => {
    const user = buildUser();
    const phone = { value: '+8801712345678' } as never;
    expect(CanChangePhoneSpecification.check(user, phone)).toBe(true);
  });

  it('should be false when both null', () => {
    const user = buildUser();
    expect(CanChangePhoneSpecification.check(user, null)).toBe(false);
  });

  it('should be false for deleted user', () => {
    const user = buildUser();
    user.delete(now);
    const phone = { value: '+8801712345678' } as never;
    expect(CanChangePhoneSpecification.check(user, phone)).toBe(false);
  });

  it('should be false for suspended user', () => {
    const user = buildUser();
    user.suspend('test', now);
    const phone = { value: '+8801712345678' } as never;
    expect(CanChangePhoneSpecification.check(user, phone)).toBe(false);
  });
});
