/**
 * UserContactEntity — Additional contact channels
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo';

export interface UserContactEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly email?: UserEmailVO;
  readonly phone?: UserPhoneVO;
  readonly verified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class UserContactEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _email?: UserEmailVO;
  private _phone?: UserPhoneVO;
  private _verified: boolean;

  private constructor(props: UserContactEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._email = props.email;
    this._phone = props.phone;
    this._verified = props.verified;
  }

  static create(props: UserContactEntityProps): UserContactEntity {
    if (!props.email && !props.phone) {
      throw new Error('Contact must have email or phone');
    }
    return new UserContactEntity(props);
  }

  get email(): UserEmailVO | undefined { return this._email; }
  get phone(): UserPhoneVO | undefined { return this._phone; }
  get verified(): boolean { return this._verified; }

  markVerified(): void { this._verified = true; }
  markUnverified(): void { this._verified = false; }
}
