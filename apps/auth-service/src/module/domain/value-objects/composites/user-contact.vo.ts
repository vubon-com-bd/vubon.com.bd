/**
 * UserContactVO — A user's contact channels
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { UserEmailVO } from '../primitives/user-email.vo';
import { UserPhoneVO } from '../primitives/user-phone.vo';

export interface UserContactVOProps {
  readonly userId: UserIdVO;
  readonly primaryEmail: UserEmailVO;
  readonly primaryPhone: UserPhoneVO;
  readonly alternateEmail?: UserEmailVO;
  readonly alternatePhone?: UserPhoneVO;
}

export class UserContactVO extends BaseVO<UserContactVOProps> {
  private constructor(props: UserContactVOProps) {
    super(props);
  }

  static of(props: UserContactVOProps): UserContactVO {
    if (
      props.alternateEmail
      && props.alternateEmail.equals(props.primaryEmail)
    ) {
      throw new Error('Alternate email must differ from primary');
    }
    if (
      props.alternatePhone
      && props.alternatePhone.equals(props.primaryPhone)
    ) {
      throw new Error('Alternate phone must differ from primary');
    }
    return new UserContactVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get primaryEmail(): UserEmailVO { return this.value.primaryEmail; }
  get primaryPhone(): UserPhoneVO { return this.value.primaryPhone; }

  hasAlternateEmail(): boolean {
    return this.value.alternateEmail !== undefined;
  }

  hasAlternatePhone(): boolean {
    return this.value.alternatePhone !== undefined;
  }
}
