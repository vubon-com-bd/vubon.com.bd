/**
 * PreferenceMergerService Unit Test
 */
import { PreferenceMergerService } from '@domain/services/preference-merger.service';
import { UserPreferencesEntity } from '@domain/entities/user-preferences.entity';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo';

describe('PreferenceMergerService', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildPrefs = () =>
    UserPreferencesEntity.create({ id: 'user-1', userId: 'user-1', now });

  describe('merge', () => {
    it('should return defaults when no user prefs', () => {
      const merged = PreferenceMergerService.merge(
        [{ key: 'newsletter', value: 'true' }],
        buildPrefs()
      );
      expect(merged.newsletter).toBe('true');
    });

    it('should let user prefs override defaults', () => {
      const prefs = buildPrefs();
      prefs.set(PreferenceKeyVO.create('newsletter'), PreferenceValueVO.fromBoolean(false));
      const merged = PreferenceMergerService.merge(
        [{ key: 'newsletter', value: 'true' }],
        prefs
      );
      expect(merged.newsletter).toBe('false');
    });
  });

  describe('applyUserOverrides', () => {
    it('should apply overrides to entity', () => {
      const prefs = buildPrefs();
      PreferenceMergerService.applyUserOverrides(prefs, [
        { key: PreferenceKeyVO.create('promotions'), value: PreferenceValueVO.fromBoolean(true) },
      ]);
      expect(prefs.isEnabled('promotions')).toBe(true);
    });
  });
});
