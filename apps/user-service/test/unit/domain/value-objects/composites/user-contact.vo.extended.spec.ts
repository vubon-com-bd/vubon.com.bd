import { UserContactVO } from '@domain/value-objects/composites/user-contact.vo';
import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '@domain/value-objects/primitives/contact-value.vo';

describe('UserContactVO — extended', () => {
  const build = (verified: boolean, primary: boolean) =>
    UserContactVO.create({
      id: ContactIdVO.create('c-1'),
      userId: UserIdVO.create('u-1'),
      type: ContactTypeVO.create('email'),
      contactValue: ContactValueVO.create('u@e.com'),
      isPrimary: primary,
      isVerified: verified,
    });

  it('canBeUsedForLogin all four combinations', () => {
    expect(build(true, true).canBeUsedForLogin()).toBe(true);
    expect(build(false, true).canBeUsedForLogin()).toBe(false);
    expect(build(true, false).canBeUsedForLogin()).toBe(false);
    expect(build(false, false).canBeUsedForLogin()).toBe(false);
  });

  it('getters cover', () => {
    const vo = build(true, true);
    expect(vo.isVerified).toBe(true);
    expect(vo.isPrimary).toBe(true);
    expect(vo.type.value).toBe('email');
    expect(vo.contactValue.value).toBe('u@e.com');
  });
});
