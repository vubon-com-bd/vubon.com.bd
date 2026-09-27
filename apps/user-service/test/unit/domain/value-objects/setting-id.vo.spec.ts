import { SettingIdVO } from '@domain/value-objects/primitives/setting-id.vo';

describe('SettingIdVO', () => {
  it('should create valid id', () => {
    expect(SettingIdVO.create('s-1').value).toBe('s-1');
  });
  it('should throw on empty', () => {
    expect(() => SettingIdVO.create('')).toThrow();
  });
});
