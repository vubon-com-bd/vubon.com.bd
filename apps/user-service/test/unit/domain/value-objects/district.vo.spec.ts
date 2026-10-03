import { DistrictVO } from '@domain/value-objects/primitives/district.vo';

describe('DistrictVO', () => {
  it('should create valid district', () => {
    expect(DistrictVO.create('dhaka').value).toBe('dhaka');
  });
  it('should lowercase', () => {
    expect(DistrictVO.create('DHAKA').value).toBe('dhaka');
  });
  it('should throw on invalid district', () => {
    expect(() => DistrictVO.create('invalid-district')).toThrow();
  });
  it('should check isDistrict static', () => {
    expect(DistrictVO.isDistrict('dhaka')).toBe(true);
  });
});
