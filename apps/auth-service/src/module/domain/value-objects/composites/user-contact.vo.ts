import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { UserPhoneVO } from '../primitives/user-phone.vo';
import { UserEmailVO } from '../primitives/user-email.vo';

export interface UserContactProps {
  readonly userId: UserIdVO;
  readonly phone: UserPhoneVO;
  readonly email: UserEmailVO;
  readonly alternatePhone: UserPhoneVO | null;
  readonly alternateEmail: UserEmailVO | null;
}

export class UserContactVO extends BaseVO<UserContactProps> {
  private constructor(props: UserContactProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserContactProps): UserContactVO {
    return new UserContactVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get phone(): UserPhoneVO { return this.value.phone; }
  get email(): UserEmailVO { return this.value.email; }
  get alternatePhone(): UserPhoneVO | null { return this.value.alternatePhone; }
  get alternateEmail(): UserEmailVO | null { return this.value.alternateEmail; }
}
