import { UserPreferencesEntity, PreferenceEntry } from '../entities/user-preferences.entity';

export class PreferenceMergerService {
  static merge(
    current: UserPreferencesEntity,
    updates: readonly PreferenceEntry[],
  ): UserPreferencesEntity {
    let result = current;
    for (const entry of updates) {
      result = result.setEntry(entry.key, entry.value);
    }
    return result;
  }
}
