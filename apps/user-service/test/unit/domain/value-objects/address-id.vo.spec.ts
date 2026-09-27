import { AddressIdVO } from '@domain/value-objects/primitives/address-id.vo';

describe('AddressIdVO', () => {
  it('should create valid id', () => {
    expect(AddressIdVO.create('addr-1').value).toBe('addr-1');
  });
  it('should trim whitespace', () => {
    expect(AddressIdVO.create('  addr-1  ').value).toBe('addr-1');
  });
  it('should throw on empty', () => {
    expect(() => AddressIdVO.create('')).toThrow();
  });
  it('should throw on non-string', () => {
    expect(() => AddressIdVO.create(123 as never)).toThrow();
  });
  it('should equal same value', () => {
    expect(AddressIdVO.create('a').equals(AddressIdVO.create('a'))).toBe(true);
  });
});
