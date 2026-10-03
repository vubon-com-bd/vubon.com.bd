/**
 * UserVO Composite Unit Test
 */
import { UserVO } from '@domain/value-objects/composites/user.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '@domain/value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('UserVO', () => {
  const build = (opts: { phone?: boolean } = {}) =>
    UserVO.create({
      id: UserIdVO.create('u-1'),
      email: UserEmailVO.create('u@e.com'),
      name: UserNameVO.create('John Doe'),
      phone: opts.phone ? UserPhoneVO.create('+8801712345678') : null,
      status: UserStatusVO.active(),
      type: UserTypeVO.create('individual'),
    });

  it('creates with all fields', () => {
    const vo = build({ phone: true });
    expect(vo.id.value).toBe('u-1');
    expect(vo.email.value).toBe('u@e.com');
    expect(vo.name.value).toBe('John Doe');
    expect(vo.hasPhone()).toBe(true);
  });

  it('creates without phone', () => {
    expect(build().hasPhone()).toBe(false);
  });

  it('throws when id missing', () => {
    expect(() =>
      UserVO.create({ id: null as never, email: {} as never, name: {} as never, phone: null, status: {} as never, type: {} as never })
    ).toThrow();
  });

  it('throws when email missing', () => {
    expect(() =>
      UserVO.create({ id: {} as never, email: null as never, name: {} as never, phone: null, status: {} as never, type: {} as never })
    ).toThrow();
  });

  it('throws when status missing', () => {
    expect(() =>
      UserVO.create({ id: {} as never, email: {} as never, name: {} as never, phone: null, status: null as never, type: {} as never })
    ).toThrow();
  });

  it('isAdmin false for individual', () => {
    expect(build().isAdmin()).toBe(false);
  });

  it('isAdmin true for admin type', () => {
    const vo = UserVO.create({
      id: UserIdVO.create('a-1'),
      email: UserEmailVO.create('a@e.com'),
      name: UserNameVO.create('Admin'),
      phone: null,
      status: UserStatusVO.active(),
      type: UserTypeVO.create('admin'),
    });
    expect(vo.isAdmin()).toBe(true);
  });

  it('isActive when status is active', () => {
    expect(build().isActive()).toBe(true);
  });

  it('isActive false when status is suspended', () => {
    const vo = UserVO.create({
      id: UserIdVO.create('u-1'),
      email: UserEmailVO.create('u@e.com'),
      name: UserNameVO.create('John'),
      phone: null,
      status: UserStatusVO.suspended(),
      type: UserTypeVO.create('individual'),
    });
    expect(vo.isActive()).toBe(false);
  });
});
