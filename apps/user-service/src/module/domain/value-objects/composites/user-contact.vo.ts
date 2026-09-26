import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ContactIdVO } from '../primitives/contact-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { ContactTypeVO } from '../primitives/contact-type.vo';
import { ContactValueVO } from '../primitives/contact-value.vo';

export interface UserContactProps {
  readonly id: ContactIdVO;
  readonly userId: UserIdVO;
  readonly type: ContactTypeVO;
  readonly contactValue: ContactValueVO;
  readonly verified: boolean;
}

export class UserContactVO extends BaseVO<UserContactProps> {
  private constructor(props: UserContactProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserContactProps): UserContactVO {
    return new UserContactVO(props);
  }

  get id(): ContactIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): ContactTypeVO { return this.value.type; }
  get contactValue(): ContactValueVO { return this.value.contactValue; }
  get verified(): boolean { return this.value.verified; }
}
