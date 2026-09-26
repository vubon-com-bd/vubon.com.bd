import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { PreferenceKeyVO } from '../primitives/preference-key.vo';
import { PreferenceValueVO } from '../primitives/preference-value.vo';

export interface UserPreferencesEntry {
  readonly key: PreferenceKeyVO;
  readonly value: PreferenceValueVO;
}

export interface UserPreferencesProps {
  readonly userId: UserIdVO;
  readonly entries: readonly UserPreferencesEntry[];
}

export class UserPreferencesVO extends BaseVO<UserPreferencesProps> {
  private constructor(props: UserPreferencesProps) {
    super(Object.freeze({
      ...props,
      entries: Object.freeze([...props.entries]),
    }));
  }

  static create(props: UserPreferencesProps): UserPreferencesVO {
    return new UserPreferencesVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get entries(): readonly UserPreferencesEntry[] { return this.value.entries; }

  get(key: string): PreferenceValueVO | null {
    const entry = this.value.entries.find((e) => e.key.value === key);
    return entry ? entry.value : null;
  }
}
