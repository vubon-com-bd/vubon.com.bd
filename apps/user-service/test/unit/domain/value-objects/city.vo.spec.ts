import { CityVO } from '@domain/value-objects/primitives/city.vo';

describe('CityVO', () => {
  it('should create valid city', () => {
    expect(CityVO.create('Dhaka').value).toBe('Dhaka');
  });
  it('should trim', () => {
    expect(CityVO.create('  Dhaka  ').value).toBe('Dhaka');
  });
  it('should throw on too-short', () => {
    expect(() => CityVO.create('D')).toThrow();
  });
  it('should throw on too-long', () => {
    expect(() => CityVO.create('a'.repeat(200))).toThrow();
  });
});
