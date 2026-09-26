/**
 * UserProfileEntity — Public profile of a user
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';

export interface UserProfileEntityProps {
  readonly id: UserId;
  readonly userId: UserId;
  readonly displayName: UserNameVO;
  readonly bio?: string;
  readonly avatarUrl?: string;
  readonly locale: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class UserProfileEntity extends BaseEntity<UserId> {
  private _displayName: UserNameVO;
  private _bio?: string;
  private _avatarUrl?: string;
  private _locale: string;
  readonly userId: UserId;

  private constructor(props: UserProfileEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._displayName = props.displayName;
    this._bio = props.bio;
    this._avatarUrl = props.avatarUrl;
    this._locale = props.locale;
  }

  static create(props: UserProfileEntityProps): UserProfileEntity {
    return new UserProfileEntity(props);
  }

  get displayName(): UserNameVO { return this._displayName; }
  get bio(): string | undefined { return this._bio; }
  get avatarUrl(): string | undefined { return this._avatarUrl; }
  get locale(): string { return this._locale; }

  updateDisplayName(next: UserNameVO): void {
    if (this._displayName.equals(next)) return;
    this._displayName = next;
  }

  updateBio(next?: string): void {
    if (next && next.length > 500) {
      throw new Error('Bio exceeds 500 chars');
    }
    this._bio = next;
  }

  updateAvatar(url?: string): void {
    if (url && url.length > 2048) {
      throw new Error('Avatar URL too long');
    }
    this._avatarUrl = url;
  }
}
