/**
 * UserVO — Composite of User identity
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { UserIdVO } from '../primitives/user-id.vo.js';
import { UserEmailVO } from '../primitives/user-email.vo.js';
import { UserPhoneVO } from '../primitives/user-phone.vo.js';
import { UserNameVO } from '../primitives/user-name.vo.js';
import { UserStatusVO } from '../primitives/user-status.vo.js';
import { UserTypeVO } from '../primitives/user-type.vo.js';
import { UserRoleVO } from '../primitives/user-role.vo.js';

export interface UserVOProps {
  readonly id: UserIdVO;
  readonly email: UserEmailVO;
  readonly phone?: UserPhoneVO;
  readonly firstName?: UserNameVO;
  readonly lastName?: UserNameVO;
  readonly username?: string;
  readonly status: UserStatusVO;
  readonly type: UserTypeVO;
  readonly roles: readonly UserRoleVO[];
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly isMfaEnabled: boolean;
  readonly lastLoginAt?: string;
  readonly lastActiveAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class UserVO extends BaseVO<UserVOProps> {
  private constructor(props: UserVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: UserVOProps): UserVO {
    const vo = new UserVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: UserVOProps): UserVO {
    return new UserVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.roles.length === 0) {
      throw new ValidationError('User must have at least one role', 'roles');
    }
    if (v.isMfaEnabled && !v.emailVerified && !v.phoneVerified) {
      throw new ValidationError(
        'MFA requires email or phone verification',
        'isMfaEnabled',
      );
    }
  }

  // Getters
  get id(): UserIdVO { return this.value.id; }
  get email(): UserEmailVO { return this.value.email; }
  get phone(): UserPhoneVO | undefined { return this.value.phone; }
  get firstName(): UserNameVO | undefined { return this.value.firstName; }
  get lastName(): UserNameVO | undefined { return this.value.lastName; }
  get username(): string | undefined { return this.value.username; }
  get status(): UserStatusVO { return this.value.status; }
  get type(): UserTypeVO { return this.value.type; }
  get roles(): readonly UserRoleVO[] { return this.value.roles; }
  get emailVerified(): boolean { return this.value.emailVerified; }
  get phoneVerified(): boolean { return this.value.phoneVerified; }
  get isMfaEnabled(): boolean { return this.value.isMfaEnabled; }
  get lastLoginAt(): string | undefined { return this.value.lastLoginAt; }
  get lastActiveAt(): string | undefined { return this.value.lastActiveAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  get displayName(): string {
    if (this.value.firstName && this.value.lastName) {
      return `${this.value.firstName.value} ${this.value.lastName.value}`;
    }
    return this.value.firstName?.value ?? this.value.username ?? this.value.email.value;
  }

  // Business predicates
  isActive(): boolean { return this.status.isActive(); }
  isSuspended(): boolean { return this.status.isSuspended(); }
  isDeleted(): boolean { return this.status.isDeleted(); }
  isFullyVerified(): boolean { return this.emailVerified && this.phoneVerified; }
  hasRole(role: string): boolean {
    return this.roles.some((r) => r.value === role);
  }
  isAdmin(): boolean {
    return this.roles.some((r) => r.isAdmin());
  }
  requiresKyc(): boolean { return this.type.requiresKyc(); }
}
