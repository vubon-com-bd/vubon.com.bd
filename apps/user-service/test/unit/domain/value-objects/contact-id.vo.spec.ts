import { ContactIdVO } from '@domain/value-objects/primitives/contact-id.vo';

describe('ContactIdVO', () => {
  it('should create valid id', () => {
    expect(ContactIdVO.create('c-1').value).toBe('c-1');
  });
  it('should trim whitespace', () => {
    expect(ContactIdVO.create('  c-1  ').value).toBe('c-1');
  });
  it('should throw on empty', () => {
    expect(() => ContactIdVO.create('')).toThrow();
  });
  it('should throw on non-string', () => {
    expect(() => ContactIdVO.create(123 as never)).toThrow();
  });
});
