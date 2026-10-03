import { UserContactVO } from '@domain/value-objects/composites/user-contact.vo';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';

describe('UserContactVO', () => {
  const build = (type: 'email' | 'phone' = 'email', verified = false, primary = false) =>
    UserContactVO.create({
      id: ContactIdVO.create('c-1'),
      userId: UserIdVO.create('u-1'),
      type: ContactTypeVO.create(type),
      contactValue: ContactValueVO.create(type === 'email' ? 'u@e.com' : '+8801712345678'),
      isPrimary: primary,
      isVerified: verified,
    });

  it('creates email contact', () => {
    const vo = build('email');
    expect(vo.isEmail()).toBe(true);
    expect(vo.isPhone()).toBe(false);
  });

  it('creates phone contact', () => {
    const vo = build('phone');
    expect(vo.isPhone()).toBe(true);
  });

  it('canBeUsedForLogin when verified + primary', () => {
    expect(build('email', true, true).canBeUsedForLogin()).toBe(true);
    expect(build('email', false, true).canBeUsedForLogin()).toBe(false);
    expect(build('email', true, false).canBeUsedForLogin()).toBe(false);
  });

  it('throws when id missing', () => {
    expect(() =>
      UserContactVO.create({ id: null as never, userId: {} as never, type: {} as never, contactValue: {} as never, isPrimary: false, isVerified: false })
    ).toThrow();
  });

  it('throws when contactValue missing', () => {
    expect(() =>
      UserContactVO.create({ id: {} as never, userId: {} as never, type: {} as never, contactValue: null as never, isPrimary: false, isVerified: false })
    ).toThrow();
  });
});
