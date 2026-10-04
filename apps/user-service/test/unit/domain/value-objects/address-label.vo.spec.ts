import { AddressLabelVO } from '@domain/value-objects/primitives/address-label.vo';

describe('AddressLabelVO', () => {
  it('should create valid label', () => {
    expect(AddressLabelVO.create('home').value).toBe('home');
  });
  it('should trim', () => {
    expect(AddressLabelVO.create('  work  ').value).toBe('work');
  });
  it('should throw on empty', () => {
    expect(() => AddressLabelVO.create('')).toThrow();
  });
  it('should throw on too-long', () => {
    expect(() => AddressLabelVO.create('a'.repeat(100))).toThrow();
  });
});
