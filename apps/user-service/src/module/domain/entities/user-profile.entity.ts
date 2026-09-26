import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { UserAvatarVO } from '../value-objects/primitives/user-avatar.vo';
import { UserBioVO } from '../value-objects/primitives/user-bio.vo';
import { ProfileVisibilityVO } from '../value-objects/primitives/profile-visibility.vo';
import {
  ProfileCreatedEvent,
  ProfileUpdatedEvent,
} from '../events/user-profile.events';

export interface UserProfileEntityProps {
  readonly userId: UserIdVO;
  readonly avatar: UserAvatarVO | null;
  readonly bio: UserBioVO | null;
  readonly visibility: ProfileVisibilityVO;
}

export class UserProfileEntity extends AggregateRoot<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _avatar: UserAvatarVO | null;
  private readonly _bio: UserBioVO | null;
  private readonly _visibility: ProfileVisibilityVO;

  private constructor(
    id: UserIdVO,
    props: UserProfileEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._avatar = props.avatar;
    this._bio = props.bio;
    this._visibility = props.visibility;
  }

  static create(props: UserProfileEntityProps): UserProfileEntity {
    const now = new Date().toISOString();
    const entity = new UserProfileEntity(props.userId, props, now, now, null);
    entity.addDomainEvent(
      new ProfileCreatedEvent(props.userId.value, props.userId.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: UserIdVO,
    props: UserProfileEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserProfileEntity {
    return new UserProfileEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateAvatar(avatar: UserAvatarVO | null): UserProfileEntity {
    const updated = new UserProfileEntity(
      this.id,
      { ...this._toProps(), avatar },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ProfileUpdatedEvent(this.id.value, this.id.value, ['avatar'], this.version + 1),
    );
    return updated;
  }

  updateBio(bio: UserBioVO | null): UserProfileEntity {
    const updated = new UserProfileEntity(
      this.id,
      { ...this._toProps(), bio },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ProfileUpdatedEvent(this.id.value, this.id.value, ['bio'], this.version + 1),
    );
    return updated;
  }

  changeVisibility(visibility: ProfileVisibilityVO): UserProfileEntity {
    const updated = new UserProfileEntity(
      this.id,
      { ...this._toProps(), visibility },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ProfileUpdatedEvent(this.id.value, this.id.value, ['visibility'], this.version + 1),
    );
    return updated;
  }

  get userId(): UserIdVO { return this._userId; }
  get avatar(): UserAvatarVO | null { return this._avatar; }
  get bio(): UserBioVO | null { return this._bio; }
  get visibility(): ProfileVisibilityVO { return this._visibility; }

  private _toProps(): UserProfileEntityProps {
    return {
      userId: this._userId,
      avatar: this._avatar,
      bio: this._bio,
      visibility: this._visibility,
    };
  }
}
