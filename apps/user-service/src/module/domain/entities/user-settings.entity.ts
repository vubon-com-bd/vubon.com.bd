import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { SettingKeyVO } from '../value-objects/primitives/setting-key.vo';
import { SettingValueVO } from '../value-objects/primitives/setting-value.vo';
import { SettingsUpdatedEvent } from '../events/user-settings.events';

export interface SettingEntry {
  readonly key: SettingKeyVO;
  readonly value: SettingValueVO;
}

export interface UserSettingsEntityProps {
  readonly userId: UserIdVO;
  readonly entries: readonly SettingEntry[];
}

export class UserSettingsEntity extends AggregateRoot<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _entries: readonly SettingEntry[];

  private constructor(
    id: UserIdVO,
    props: UserSettingsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._entries = Object.freeze([...props.entries]);
  }

  static create(props: UserSettingsEntityProps): UserSettingsEntity {
    const now = new Date().toISOString();
    return new UserSettingsEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: UserSettingsEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserSettingsEntity {
    return new UserSettingsEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  setEntry(key: SettingKeyVO, value: SettingValueVO): UserSettingsEntity {
    const filtered = this._entries.filter((e) => e.key.value !== key.value);
    const updated = new UserSettingsEntity(
      this.id,
      { userId: this._userId, entries: [...filtered, { key, value }] },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new SettingsUpdatedEvent(this.id.value, this.id.value, [key.value], this.version + 1),
    );
    return updated;
  }

  removeEntry(key: SettingKeyVO): UserSettingsEntity {
    const filtered = this._entries.filter((e) => e.key.value !== key.value);
    return new UserSettingsEntity(
      this.id,
      { userId: this._userId, entries: filtered },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get entries(): readonly SettingEntry[] { return this._entries; }

  get(key: string): SettingValueVO | null {
    const entry = this._entries.find((e) => e.key.value === key);
    return entry ? entry.value : null;
  }
}
