/**
 * UserProfileEntity — Aggregate Root
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import type { Timestamp } from '@vubon/shared-types/common';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { UserAvatarVO } from '../value-objects/primitives/user-avatar.vo.js';
import { UserBioVO } from '../value-objects/primitives/user-bio.vo.js';
import { ProfileVisibilityVO } from '../value-objects/primitives/profile-visibility.vo.js';
import { UserProfileVO } from '../value-objects/composites/user-profile.vo.js';
import { ProfileUpdatedEvent } from '../events/user-profile.events.js';

export interface UserProfileEntityProps {
  readonly userId: UserIdVO;
  readonly avatar: UserAvatarVO;
  readonly bio: UserBioVO;
  readonly visibility: ProfileVisibilityVO;
}

export class UserProfileEntity extends AggregateRoot<string> {
  private _avatar: UserAvatarVO;
  private _bio: UserBioVO;
  private _visibility: ProfileVisibilityVO;
  private readonly _userId: UserIdVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: UserProfileEntityProps,
    deletedAt?: string | null
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._avatar = props.avatar;
    this._bio = props.bio;
    this._visibility = props.visibility;
    this._userId = props.userId;
  }

  get userId(): UserIdVO { return this._userId; }
  get avatar(): UserAvatarVO { return this._avatar; }
  get bio(): UserBioVO { return this._bio; }
  get visibility(): ProfileVisibilityVO { return this._visibility; }

  static create(params: {
    id: string;
    userId: UserIdVO;
    now: string;
  }): UserProfileEntity {
    return new UserProfileEntity(
      params.id,
      params.now,
      params.now,
      {
        userId: params.userId,
        avatar: UserAvatarVO.empty(),
        bio: UserBioVO.empty(),
        visibility: ProfileVisibilityVO.create('public'),
      },
      null
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: UserProfileEntityProps;
  }): UserProfileEntity {
    return new UserProfileEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt
    );
  }

  updateAvatar(avatar: UserAvatarVO, now: string): void {
    this._avatar = avatar;
    this.emitUpdate(['avatar'], now);
  }

  updateBio(bio: UserBioVO, now: string): void {
    this._bio = bio;
    this.emitUpdate(['bio'], now);
  }

  updateVisibility(v: ProfileVisibilityVO, now: string): void {
    this._visibility = v;
    this.emitUpdate(['visibility'], now);
  }

  isComplete(): boolean {
    return !this._avatar.isEmpty() && !this._bio.isEmpty();
  }

  completionScore(): number {
    let s = 0;
    if (!this._avatar.isEmpty()) s += 50;
    if (!this._bio.isEmpty()) s += 50;
    return s;
  }

  toProfileVO(): UserProfileVO {
    return UserProfileVO.create({
      userId: this._userId,
      avatar: this._avatar,
      bio: this._bio,
      visibility: this._visibility,
    });
  }

  private emitUpdate(fields: string[], now: string): void {
    this.addDomainEvent(
      new ProfileUpdatedEvent({
        id: `${this.id}:updated:${Date.now()}`,
        aggregateId: this.id,
        payload: { userId: this._userId.value, changedFields: fields },
        occurredAt: now as unknown as Timestamp,
        version: this.version + 1,
      })
    );
    this.incrementVersion();
  }
}
