import { UserSettingsVO } from '@domain/value-objects/composites/user-settings.vo';
import { SettingKeyVO } from '@domain/value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '@domain/value-objects/primitives/setting-value.vo';

describe('UserSettingsVO', () => {
  const entry = (key: string, value: string) => ({
    key: SettingKeyVO.create(key),
    value: SettingValueVO.create(value),
  });

  it('creates empty settings', () => {
    const vo = UserSettingsVO.create({ userId: 'u-1', entries: [] });
    expect(vo.count).toBe(0);
  });

  it('creates with entries', () => {
    const vo = UserSettingsVO.create({
      userId: 'u-1',
      entries: [entry('theme', 'dark'), entry('language', 'bn')],
    });
    expect(vo.count).toBe(2);
    expect(vo.getValue('theme')).toBe('dark');
  });

  it('has returns true for existing key', () => {
    const vo = UserSettingsVO.create({ userId: 'u-1', entries: [entry('theme', 'dark')] });
    expect(vo.has('theme')).toBe(true);
    expect(vo.has('missing')).toBe(false);
  });

  it('getValue returns null for missing', () => {
    expect(UserSettingsVO.create({ userId: 'u-1', entries: [] }).getValue('theme')).toBeNull();
  });

  it('throws on duplicate key', () => {
    expect(() =>
      UserSettingsVO.create({
        userId: 'u-1',
        entries: [entry('theme', 'dark'), entry('theme', 'light')],
      })
    ).toThrow();
  });

  it('throws when userId missing', () => {
    expect(() => UserSettingsVO.create({ userId: '', entries: [] })).toThrow();
  });
});
