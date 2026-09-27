/**
 * UserPreferencesVO — Composite VO
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PreferenceKeyVO } from '../primitives/preference-key.vo.js';
import { PreferenceValueVO } from '../primitives/preference-value.vo.js';

export interface PreferenceEntry {
  readonly key: PreferenceKeyVO;
  readonly value: PreferenceValueVO;
}

export interface UserPreferencesVOProps {
  readonly userId: string;
  readonly entries: readonly PreferenceEntry[];
}

export class UserPreferencesVO extends BaseVO<UserPreferencesVOProps> {
  private constructor(props: UserPreferencesVOProps) {
    super(props);
  }

  static create(props: UserPreferencesVOProps): UserPreferencesVO {
    if (!props.userId) throw new Error('UserPreferencesVO: userId required');
    const seen = new Set<string>();
    for (const e of props.entries) {
      const k = e.key.value;
      if (seen.has(k)) throw new Error(`UserPreferencesVO: duplicate key "${k}"`);
      seen.add(k);
    }
    return new UserPreferencesVO(props);
  }

  get userId(): string { return this.value.userId; }
  get entries(): readonly PreferenceEntry[] { return this.value.entries; }

  getBoolean(key: string): boolean | null {
    const found = this.value.entries.find((e) => e.key.value === key);
    if (!found) return null;
    if (!found.value.isBoolean()) return null;
    return found.value.toBoolean();
  }

  isNotificationEnabled(key: string): boolean {
    return this.getBoolean(key) === true;
  }
}
