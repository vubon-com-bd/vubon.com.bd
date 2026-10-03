import { UserVO } from '@domain/value-objects/composites/user.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '@domain/value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('UserVO — extended branches', () => {
  it('getters cover all branches', () => {
    const vo = UserVO.create({
      id: UserIdVO.create('u-1'),
      email: UserEmailVO.create('u@e.com'),
      name: UserNameVO.create('John Doe'),
      phone: UserPhoneVO.create('+8801712345678'),
      status: UserStatusVO.active(),
      type: UserTypeVO.create('individual'),
    });
    expect(vo.id.value).toBe('u-1');
    expect(vo.email.value).toBe('u@e.com');
    expect(vo.name.value).toBe('John Doe');
    expect(vo.phone?.value).toBe('+8801712345678');
    expect(vo.status.value).toBe('active');
    expect(vo.type.value).toBe('individual');
  });

  it('throws when name missing', () => {
    expect(() =>
      UserVO.create({ id: {} as never, email: {} as never, name: null as never, phone: null, status: {} as never, type: {} as never })
    ).toThrow();
  });

  it('throws when type missing', () => {
    expect(() =>
      UserVO.create({ id: {} as never, email: {} as never, name: {} as never, phone: null, status: {} as never, type: null as never })
    ).toThrow();
  });
});
