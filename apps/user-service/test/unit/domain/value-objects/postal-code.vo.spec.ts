import { PostalCodeVO } from '@domain/value-objects/primitives/postal-code.vo';

describe('PostalCodeVO', () => {
  it('should create valid 4-digit code', () => {
    expect(PostalCodeVO.create('1200').value).toBe('1200');
  });
  it('should trim', () => {
    expect(PostalCodeVO.create('  1200  ').value).toBe('1200');
  });
  it('should throw on non-4-digit', () => {
    expect(() => PostalCodeVO.create('123')).toThrow();
  });
  it('should throw on letters', () => {
    expect(() => PostalCodeVO.create('abcd')).toThrow();
  });
  it('should convert to number', () => {
    expect(PostalCodeVO.create('1200').getAsNumber()).toBe(1200);
  });
});
