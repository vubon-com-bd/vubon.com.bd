import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { UserEmailVO } from '../primitives/user-email.vo';
import { UserNameVO } from '../primitives/user-name.vo';
import { UserPhoneVO } from '../primitives/user-phone.vo';
import { UserStatusVO } from '../primitives/user-status.vo';
import { UserTypeVO } from '../primitives/user-type.vo';

export interface UserProps {
  readonly id: UserIdVO;
  readonly email: UserEmailVO;
  readonly name: UserNameVO;
  readonly phone: UserPhoneVO | null;
  readonly status: UserStatusVO;
  readonly type: UserTypeVO;
  readonly emailVerified: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class UserVO extends BaseVO<UserProps> {
  private constructor(props: UserProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserProps): UserVO {
    return new UserVO(props);
  }

  get id(): UserIdVO { return this.value.id; }
  get email(): UserEmailVO { return this.value.email; }
  get name(): UserNameVO { return this.value.name; }
  get phone(): UserPhoneVO | null { return this.value.phone; }
  get status(): UserStatusVO { return this.value.status; }
  get type(): UserTypeVO { return this.value.type; }
  get emailVerified(): boolean { return this.value.emailVerified; }
  get createdAt(): Date { return this.value.createdAt; }
  get updatedAt(): Date { return this.value.updatedAt; }
}
