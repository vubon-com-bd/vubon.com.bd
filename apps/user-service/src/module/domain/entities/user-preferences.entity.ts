/**
 * UserPreferencesEntity — Aggregate Root
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PreferenceKeyVO } from '../value-objects/primitives/preference-key.vo.js';
import { PreferenceValueVO } from '../value-objects/primitives/preference-value.vo.js';
import { UserPreferencesVO } from '../value-objects/composites/user-preferences.vo.js';

export interface UserPreferencesEntityProps {
  readonly userId: string;
  readonly entries: readonly {
    readonly key: PreferenceKeyVO;
    readonly value: PreferenceValueVO;
  }[];
}

export class UserPreferencesEntity extends AggregateRoot<string> {
  private _entries: Map<string, { key: PreferenceKeyVO; value: PreferenceValueVO }>;
  private readonly _userId: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: UserPreferencesEntityProps,
    deletedAt?: string | null
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._entries = new Map();
    for (const e of props.entries) this._entries.set(e.key.value, e);
  }

  get userId(): string { return this._userId; }

  static create(params: { id: string; userId: string; now: string }): UserPreferencesEntity {
    return new UserPreferencesEntity(params.id, params.now, params.now, { userId: params.userId, entries: [] }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: UserPreferencesEntityProps;
  }): UserPreferencesEntity {
    return new UserPreferencesEntity(params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt);
  }

  set(key: PreferenceKeyVO, value: PreferenceValueVO): void {
    this._entries.set(key.value, { key, value });
    this.incrementVersion();
  }

  get(key: string): PreferenceValueVO | null {
    return this._entries.get(key)?.value ?? null;
  }

  isEnabled(key: string): boolean {
    const v = this._entries.get(key)?.value;
    return v !== undefined && v.isBoolean() && v.toBoolean();
  }

  count(): number { return this._entries.size; }

  toPreferencesVO(): UserPreferencesVO {
    return UserPreferencesVO.create({
      userId: this._userId,
      entries: [...this._entries.values()].map((e) => ({ key: e.key, value: e.value })),
    });
  }
}
