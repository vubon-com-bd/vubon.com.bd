import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';

export interface UserProfileEntityProps {
  readonly userId: UserIdVO;
  readonly firstName: UserNameVO;
  readonly lastName: UserNameVO;
  readonly bio: string | null;
  readonly avatarUrl: string | null;
  readonly dateOfBirth: Date | null;
  readonly gender: string | null;
}

export class UserProfileEntity extends BaseEntity<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _firstName: UserNameVO;
  private readonly _lastName: UserNameVO;
  private readonly _bio: string | null;
  private readonly _avatarUrl: string | null;
  private readonly _dateOfBirth: Date | null;
  private readonly _gender: string | null;

  private constructor(
    id: UserIdVO,
    props: UserProfileEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._bio = props.bio;
    this._avatarUrl = props.avatarUrl;
    this._dateOfBirth = props.dateOfBirth;
    this._gender = props.gender;
  }

  static create(props: UserProfileEntityProps): UserProfileEntity {
    const now = new Date().toISOString();
    return new UserProfileEntity(props.userId, props, now, now, null);
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

  updateBio(bio: string | null): UserProfileEntity {
    return new UserProfileEntity(
      this.id,
      { ...this._toProps(), bio },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  updateAvatar(avatarUrl: string | null): UserProfileEntity {
    return new UserProfileEntity(
      this.id,
      { ...this._toProps(), avatarUrl },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get firstName(): UserNameVO { return this._firstName; }
  get lastName(): UserNameVO { return this._lastName; }
  get bio(): string | null { return this._bio; }
  get avatarUrl(): string | null { return this._avatarUrl; }
  get dateOfBirth(): Date | null { return this._dateOfBirth; }
  get gender(): string | null { return this._gender; }

  get fullName(): string {
    return `${this._firstName.value} ${this._lastName.value}`.trim();
  }

  private _toProps(): UserProfileEntityProps {
    return {
      userId: this._userId,
      firstName: this._firstName,
      lastName: this._lastName,
      bio: this._bio,
      avatarUrl: this._avatarUrl,
      dateOfBirth: this._dateOfBirth,
      gender: this._gender,
    };
  }
}
