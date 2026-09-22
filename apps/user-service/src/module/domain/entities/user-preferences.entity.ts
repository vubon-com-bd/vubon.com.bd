import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { PreferenceKeyVO } from '../value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '../value-objects/primitives/preference-value.vo';
import { PreferenceUpdatedEvent } from '../events/user-preferences.events';

export interface PreferenceEntry {
  readonly key: PreferenceKeyVO;
  readonly value: PreferenceValueVO;
}

export interface UserPreferencesEntityProps {
  readonly userId: UserIdVO;
  readonly entries: readonly PreferenceEntry[];
}

export class UserPreferencesEntity extends AggregateRoot<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _entries: readonly PreferenceEntry[];

  private constructor(
    id: UserIdVO,
    props: UserPreferencesEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._entries = Object.freeze([...props.entries]);
  }

  static create(props: UserPreferencesEntityProps): UserPreferencesEntity {
    const now = new Date().toISOString();
    return new UserPreferencesEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: UserPreferencesEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserPreferencesEntity {
    return new UserPreferencesEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  setEntry(key: PreferenceKeyVO, value: PreferenceValueVO): UserPreferencesEntity {
    const filtered = this._entries.filter((e) => e.key.value !== key.value);
    const updated = new UserPreferencesEntity(
      this.id,
      { userId: this._userId, entries: [...filtered, { key, value }] },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new PreferenceUpdatedEvent(this.id.value, this.id.value, key.value, this.version + 1),
    );
    return updated;
  }

  get userId(): UserIdVO { return this._userId; }
  get entries(): readonly PreferenceEntry[] { return this._entries; }

  get(key: string): PreferenceValueVO | null {
    const entry = this._entries.find((e) => e.key.value === key);
    return entry ? entry.value : null;
  }
}
