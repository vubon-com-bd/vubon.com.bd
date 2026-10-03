/**
 * UserSettingsEntity — Aggregate Root
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SettingKeyVO } from '../value-objects/primitives/setting-key.vo.js';
import { SettingValueVO } from '../value-objects/primitives/setting-value.vo.js';

export interface UserSettingsEntityProps {
  readonly userId: string;
  readonly entries: readonly { readonly key: SettingKeyVO; readonly value: SettingValueVO }[];
}

export class UserSettingsEntity extends AggregateRoot<string> {
  private _entries: Map<string, SettingValueVO>;
  private readonly _userId: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: UserSettingsEntityProps,
    deletedAt?: string | null
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._entries = new Map();
    for (const e of props.entries) this._entries.set(e.key.value, e.value);
  }

  get userId(): string { return this._userId; }

  static create(params: { id: string; userId: string; now: string }): UserSettingsEntity {
    return new UserSettingsEntity(
      params.id,
      params.now,
      params.now,
      { userId: params.userId, entries: [] },
      null
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: UserSettingsEntityProps;
  }): UserSettingsEntity {
    return new UserSettingsEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt
    );
  }

  set(key: SettingKeyVO, value: SettingValueVO): void {
    if (value.isEmpty()) throw new Error(`Setting value for "${key.value}" cannot be empty`);
    this._entries.set(key.value, value);
    this.incrementVersion();
  }

  get(key: string): SettingValueVO | null {
    return this._entries.get(key) ?? null;
  }

  remove(key: string): void {
    if (!this._entries.has(key)) return;
    this._entries.delete(key);
    this.incrementVersion();
  }

  reset(): void {
    if (this._entries.size === 0) return;
    this._entries.clear();
    this.incrementVersion();
  }

  count(): number {
    return this._entries.size;
  }
}
