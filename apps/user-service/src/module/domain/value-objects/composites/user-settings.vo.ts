import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SettingKeyVO } from '../primitives/setting-key.vo';
import { SettingValueVO } from '../primitives/setting-value.vo';

export interface UserSettingsEntry {
  readonly key: SettingKeyVO;
  readonly value: SettingValueVO;
}

export interface UserSettingsProps {
  readonly userId: UserIdVO;
  readonly entries: readonly UserSettingsEntry[];
}

export class UserSettingsVO extends BaseVO<UserSettingsProps> {
  private constructor(props: UserSettingsProps) {
    super(Object.freeze({
      ...props,
      entries: Object.freeze([...props.entries]),
    }));
  }

  static create(props: UserSettingsProps): UserSettingsVO {
    return new UserSettingsVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get entries(): readonly UserSettingsEntry[] { return this.value.entries; }

  get(key: string): SettingValueVO | null {
    const entry = this.value.entries.find((e) => e.key.value === key);
    return entry ? entry.value : null;
  }
}
