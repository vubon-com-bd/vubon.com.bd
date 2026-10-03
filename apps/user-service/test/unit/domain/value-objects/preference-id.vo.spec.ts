import { PreferenceIdVO } from '@domain/value-objects/primitives/preference-id.vo';

describe('PreferenceIdVO', () => {
  it('should create valid id', () => {
    expect(PreferenceIdVO.create('p-1').value).toBe('p-1');
  });
  it('should trim whitespace', () => {
    expect(PreferenceIdVO.create('  p-1  ').value).toBe('p-1');
  });
  it('should throw on empty', () => {
    expect(() => PreferenceIdVO.create('')).toThrow();
  });
});
