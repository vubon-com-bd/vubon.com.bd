/**
 * UserContactVO — Composite VO
 * @module user-service/domain/value-objects/composites
 *
 * NOTE: `BaseVO.value` is the props object.
 * Hence we expose `contactValue` for the ContactValueVO to avoid collision.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ContactIdVO } from '../primitives/contact-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { ContactTypeVO } from '../primitives/contact-type.vo.js';
import { ContactValueVO } from '../primitives/contact-value.vo.js';

export interface UserContactVOProps {
  readonly id: ContactIdVO;
  readonly userId: UserIdVO;
  readonly type: ContactTypeVO;
  readonly contactValue: ContactValueVO;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
}

export class UserContactVO extends BaseVO<UserContactVOProps> {
  private constructor(props: UserContactVOProps) {
    super(props);
  }

  static create(props: UserContactVOProps): UserContactVO {
    if (!props.id) throw new Error('UserContactVO: id required');
    if (!props.userId) throw new Error('UserContactVO: userId required');
    if (!props.type) throw new Error('UserContactVO: type required');
    if (!props.contactValue) throw new Error('UserContactVO: contactValue required');
    return new UserContactVO(props);
  }

  get id(): ContactIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): ContactTypeVO { return this.value.type; }
  get contactValue(): ContactValueVO { return this.value.contactValue; }
  get isPrimary(): boolean { return this.value.isPrimary; }
  get isVerified(): boolean { return this.value.isVerified; }

  isEmail(): boolean {
    return this.value.type.isEmail();
  }

  isPhone(): boolean {
    return this.value.type.isPhone();
  }

  canBeUsedForLogin(): boolean {
    return this.value.isVerified && this.value.isPrimary;
  }
}
