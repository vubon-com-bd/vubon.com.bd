/**
 * PreferenceMergerService — Domain Service
 */
import { UserPreferencesEntity } from '../entities/user-preferences.entity.js';
import { PreferenceKeyVO } from '../value-objects/primitives/preference-key.vo.js';
import { PreferenceValueVO } from '../value-objects/primitives/preference-value.vo.js';

export interface PreferenceDefault {
  readonly key: string;
  readonly value: string;
}

export class PreferenceMergerService {
  /**
   * Merge defaults with user overrides (user wins).
   */
  static merge(
    defaults: readonly PreferenceDefault[],
    userPrefs: UserPreferencesEntity
  ): Readonly<Record<string, string>> {
    const merged: Record<string, string> = {};
    for (const d of defaults) merged[d.key] = d.value;

    for (const d of defaults) {
      const userValue = userPrefs.get(d.key);
      if (userValue !== null) merged[d.key] = userValue.value;
    }
    return Object.freeze(merged);
  }

  /**
   * Apply only known preference keys, ignore unknown.
   */
  static applyUserOverrides(
    entity: UserPreferencesEntity,
    overrides: readonly { key: PreferenceKeyVO; value: PreferenceValueVO }[]
  ): void {
    for (const o of overrides) {
      entity.set(o.key, o.value);
    }
  }
}
