import { ContactTypeVO } from '@domain/value-objects/primitives/contact-type.vo';

describe('ContactTypeVO', () => {
  it('should create email type', () => {
    const vo = ContactTypeVO.create('email');
    expect(vo.value).toBe('email');
    expect(vo.isEmail()).toBe(true);
    expect(vo.isPhone()).toBe(false);
  });
  it('should create phone type', () => {
    expect(ContactTypeVO.create('phone').isPhone()).toBe(true);
  });
  it('should lowercase input', () => {
    expect(ContactTypeVO.create('EMAIL').value).toBe('email');
  });
  it('should throw on invalid type', () => {
    expect(() => ContactTypeVO.create('invalid')).toThrow();
  });
});
