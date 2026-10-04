/**
 * CanSubmitKycSpecification Unit Test
 */
import { CanSubmitKycSpecification } from '@domain/specifications/can-submit-kyc.specification';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('CanSubmitKycSpecification', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildEligibleUser = () => {
    const u = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'), // ✅ valid name (>= 2)
      type: UserTypeVO.create('individual'),
      now,
    });
    u.markEmailVerified();
    u.activate(now);
    return u;
  };

  it('should be true for eligible user', () => {
    expect(CanSubmitKycSpecification.check(buildEligibleUser(), null)).toBe(true);
  });

  it('should be false for non-active user', () => {
    const u = UserEntity.create({
      id: UserIdVO.create('u-1'),
      email: UserEmailVO.create('u@example.com'),
      name: UserNameVO.create('User'), // ✅ fixed
      type: UserTypeVO.create('individual'),
      now,
    });
    expect(CanSubmitKycSpecification.check(u, null)).toBe(false);
  });

  it('should be false for unverified email', () => {
    const u = UserEntity.create({
      id: UserIdVO.create('u-1'),
      email: UserEmailVO.create('u@example.com'),
      name: UserNameVO.create('User'), // ✅ fixed
      type: UserTypeVO.create('individual'),
      now,
    });
    u.activate(now);
    expect(CanSubmitKycSpecification.check(u, null)).toBe(false);
  });

  it('should be false for admin user', () => {
    const u = UserEntity.create({
      id: UserIdVO.create('u-1'),
      email: UserEmailVO.create('u@example.com'),
      name: UserNameVO.create('Admin'), // ✅ fixed
      type: UserTypeVO.create('admin'),
      now,
    });
    u.markEmailVerified();
    u.activate(now);
    expect(CanSubmitKycSpecification.check(u, null)).toBe(false);
  });

  it('should be false for deleted user', () => {
    const u = buildEligibleUser();
    u.delete(now);
    expect(CanSubmitKycSpecification.check(u, null)).toBe(false);
  });
});
