/**
 * UserVO — Composite identity of a user (immutable snapshot)
 * @module auth-service/domain/value-objects/composites
 *
 * Bundles the core identifying attributes of a user into one VO.
 * Used by events and read models — NOT the aggregate root.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { UserEmailVO } from '../primitives/user-email.vo';
import { UserNameVO } from '../primitives/user-name.vo';
import { UserStatusVO } from '../primitives/user-status.vo';
import { UserTypeVO } from '../primitives/user-type.vo';

export interface UserVOProps {
  readonly id: UserIdVO;
  readonly email: UserEmailVO;
  readonly name: UserNameVO;
  readonly status: UserStatusVO;
  readonly type: UserTypeVO;
}

export class UserVO extends BaseVO<UserVOProps> {
  private constructor(props: UserVOProps) {
    super(props);
  }

  static of(props: UserVOProps): UserVO {
    return new UserVO(props);
  }

  get id(): UserIdVO { return this.value.id; }
  get email(): UserEmailVO { return this.value.email; }
  get name(): UserNameVO { return this.value.name; }
  get status(): UserStatusVO { return this.value.status; }
  get type(): UserTypeVO { return this.value.type; }

  isActive(): boolean {
    return this.status.isActive();
  }

  canLogin(): boolean {
    return this.status.isLoginAllowed();
  }

  sameIdentity(other: UserVO): boolean {
    return this.id.equals(other.id);
  }
}
