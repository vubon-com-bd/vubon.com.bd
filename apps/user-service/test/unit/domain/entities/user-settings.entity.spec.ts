/**
 * UserSettingsEntity Unit Test
 */
import { UserSettingsEntity } from '@domain/entities/user-settings.entity';
import { SettingKeyVO } from '@domain/value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '@domain/value-objects/primitives/setting-value.vo';

describe('UserSettingsEntity', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildSettings = () =>
    UserSettingsEntity.create({ id: 'user-1', userId: 'user-1', now });

  it('should start with empty entries', () => {
    const s = buildSettings();
    expect(s.count()).toBe(0);
  });

  it('should set and get a value', () => {
    const s = buildSettings();
    s.set(SettingKeyVO.create('theme'), SettingValueVO.create('dark'));
    expect(s.count()).toBe(1);
    expect(s.get('theme')?.value).toBe('dark');
  });

  it('should overwrite on set again', () => {
    const s = buildSettings();
    s.set(SettingKeyVO.create('theme'), SettingValueVO.create('dark'));
    s.set(SettingKeyVO.create('theme'), SettingValueVO.create('light'));
    expect(s.count()).toBe(1);
    expect(s.get('theme')?.value).toBe('light');
  });

  it('should remove a key', () => {
    const s = buildSettings();
    s.set(SettingKeyVO.create('theme'), SettingValueVO.create('dark'));
    s.remove('theme');
    expect(s.count()).toBe(0);
    expect(s.get('theme')).toBeNull();
  });

  it('should reset all', () => {
    const s = buildSettings();
    s.set(SettingKeyVO.create('theme'), SettingValueVO.create('dark'));
    s.set(SettingKeyVO.create('language'), SettingValueVO.create('bn'));
    s.reset();
    expect(s.count()).toBe(0);
  });
});
