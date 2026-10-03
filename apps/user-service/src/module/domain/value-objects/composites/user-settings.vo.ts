/**
 * UserSettingsVO — Composite VO
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SettingKeyVO } from '../primitives/setting-key.vo.js';
import { SettingValueVO } from '../primitives/setting-value.vo.js';

export interface SettingEntry {
  readonly key: SettingKeyVO;
  readonly value: SettingValueVO;
}

export interface UserSettingsVOProps {
  readonly userId: string;
  readonly entries: readonly SettingEntry[];
}

export class UserSettingsVO extends BaseVO<UserSettingsVOProps> {
  private constructor(props: UserSettingsVOProps) {
    super(props);
  }

  static create(props: UserSettingsVOProps): UserSettingsVO {
    if (!props.userId) throw new Error('UserSettingsVO: userId required');
    const seen = new Set<string>();
    for (const entry of props.entries) {
      const k = entry.key.value;
      if (seen.has(k)) {
        throw new Error(`UserSettingsVO: duplicate key "${k}"`);
      }
      seen.add(k);
    }
    return new UserSettingsVO(props);
  }

  get userId(): string { return this.value.userId; }
  get entries(): readonly SettingEntry[] { return this.value.entries; }

  get count(): number {
    return this.value.entries.length;
  }

  getValue(key: string): string | null {
    const found = this.value.entries.find((e) => e.key.value === key);
    return found ? found.value.value : null;
  }

  has(key: string): boolean {
    return this.value.entries.some((e) => e.key.value === key);
  }
}
