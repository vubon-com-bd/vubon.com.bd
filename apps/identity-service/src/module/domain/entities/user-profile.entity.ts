/**
 * UserProfileEntity — BaseEntity
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { UserNameVO } from '../value-objects/primitives/user-name.vo.js';

export interface UserProfileEntityProps {
  readonly userId: UserIdVO;
  readonly firstName?: UserNameVO;
  readonly lastName?: UserNameVO;
  readonly displayName?: string;
  readonly bio?: string;
  readonly avatarUrl?: string;
  readonly coverUrl?: string;
  readonly dateOfBirth?: string;
  readonly gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  readonly website?: string;
  readonly language?: string;
  readonly locale?: string;
  readonly timezone?: string;
}

export class UserProfileEntity extends BaseEntity<string> {
  private props: UserProfileEntityProps;

  private constructor(id: string, createdAt: string, updatedAt: string, props: UserProfileEntityProps) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  get userId(): UserIdVO { return this.props.userId; }
  get firstName(): UserNameVO | undefined { return this.props.firstName; }
  get lastName(): UserNameVO | undefined { return this.props.lastName; }
  get displayName(): string | undefined { return this.props.displayName; }
  get bio(): string | undefined { return this.props.bio; }
  get avatarUrl(): string | undefined { return this.props.avatarUrl; }
  get coverUrl(): string | undefined { return this.props.coverUrl; }
  get dateOfBirth(): string | undefined { return this.props.dateOfBirth; }
  get gender(): string | undefined { return this.props.gender; }
  get website(): string | undefined { return this.props.website; }
  get language(): string | undefined { return this.props.language; }
  get locale(): string | undefined { return this.props.locale; }
  get timezone(): string | undefined { return this.props.timezone; }

  get fullName(): string {
    if (this.props.firstName && this.props.lastName) {
      return `${this.props.firstName.value} ${this.props.lastName.value}`;
    }
    return this.props.displayName ?? this.props.firstName?.value ?? '';
  }

  update(props: Partial<UserProfileEntityProps>, now: string = new Date().toISOString()): void {
    this.props = { ...this.props, ...props };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    userId: UserIdVO;
    firstName?: UserNameVO;
    lastName?: UserNameVO;
    displayName?: string;
    now: string;
  }): UserProfileEntity {
    return new UserProfileEntity(params.id, params.now, params.now, {
      userId: params.userId,
      firstName: params.firstName,
      lastName: params.lastName,
      displayName: params.displayName,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: UserProfileEntityProps;
  }): UserProfileEntity {
    return new UserProfileEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}
