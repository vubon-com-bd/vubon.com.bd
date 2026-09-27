import { AddressLineVO } from '@domain/value-objects/primitives/address-line.vo';

describe('AddressLineVO', () => {
  it('should create valid line', () => {
    expect(AddressLineVO.create('123 Main Street').value).toBe('123 Main Street');
  });
  it('should trim', () => {
    expect(AddressLineVO.create('  123 Main  ').value).toBe('123 Main');
  });
  it('should throw on too-short', () => {
    expect(() => AddressLineVO.create('ab')).toThrow();
  });
  it('should throw on too-long', () => {
    expect(() => AddressLineVO.create('a'.repeat(300))).toThrow();
  });
  it('should count words', () => {
    expect(AddressLineVO.create('123 Main Street').getWordCount()).toBe(3);
  });
});
