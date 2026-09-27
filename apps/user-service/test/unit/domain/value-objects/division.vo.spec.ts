import { DivisionVO } from '@domain/value-objects/primitives/division.vo';

describe('DivisionVO', () => {
  it('should create valid division', () => {
    expect(DivisionVO.create('dhaka').value).toBe('dhaka');
  });
  it('should lowercase', () => {
    expect(DivisionVO.create('SYLHET').value).toBe('sylhet');
  });
  it('should identify Dhaka', () => {
    expect(DivisionVO.create('dhaka').isDhaka()).toBe(true);
  });
  it('should throw on invalid', () => {
    expect(() => DivisionVO.create('invalid')).toThrow();
  });
});
