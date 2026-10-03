/**
 * UserVO — Composite VO
 * @module user-service/domain/value-objects/composites
 *
 * Aggregates core user identity VOs (no business logic — pure data).
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { UserEmailVO } from '../primitives/user-email.vo.js';
import { UserNameVO } from '../primitives/user-name.vo.js';
import { UserPhoneVO } from '../primitives/user-phone.vo.js';
import { UserStatusVO } from '../primitives/user-status.vo.js';
import { UserTypeVO } from '../primitives/user-type.vo.js';

export interface UserVOProps {
  readonly id: UserIdVO;
  readonly email: UserEmailVO;
  readonly name: UserNameVO;
  readonly phone: UserPhoneVO | null;
  readonly status: UserStatusVO;
  readonly type: UserTypeVO;
}

export class UserVO extends BaseVO<UserVOProps> {
  private constructor(props: UserVOProps) {
    super(props);
  }

  static create(props: UserVOProps): UserVO {
    if (!props.id) throw new Error('UserVO: id required');
    if (!props.email) throw new Error('UserVO: email required');
    if (!props.name) throw new Error('UserVO: name required');
    if (!props.status) throw new Error('UserVO: status required');
    if (!props.type) throw new Error('UserVO: type required');
    return new UserVO(props);
  }

  get id(): UserIdVO { return this.value.id; }
  get email(): UserEmailVO { return this.value.email; }
  get name(): UserNameVO { return this.value.name; }
  get phone(): UserPhoneVO | null { return this.value.phone; }
  get status(): UserStatusVO { return this.value.status; }
  get type(): UserTypeVO { return this.value.type; }

  hasPhone(): boolean {
    return this.value.phone !== null;
  }

  isAdmin(): boolean {
    return this.value.type.isAdmin();
  }

  isActive(): boolean {
    return this.value.status.isActive();
  }
}
