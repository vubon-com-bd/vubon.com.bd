/**
 * UserContactVO
 * @module identity-service/domain/value-objects/composites
 *
 * ⚠️ Uses `contactValue` (not `value`) to avoid BaseVO.value collision
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

import { UserIdVO } from '../primitives/user-id.vo.js';
import { UserEmailVO } from '../primitives/user-email.vo.js';
import { UserPhoneVO } from '../primitives/user-phone.vo.js';

export type ContactTypeValue = 'email' | 'phone' | 'whatsapp' | 'telegram' | 'other';

export interface UserContactVOProps {
  readonly id: string;
  readonly userId: UserIdVO;
  readonly contactType: ContactTypeValue;
  readonly email?: UserEmailVO;
  readonly phone?: UserPhoneVO;
  readonly contactValue: string;
  readonly label?: string;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
  readonly verifiedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class UserContactVO extends BaseVO<UserContactVOProps> {
  private constructor(props: UserContactVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: UserContactVOProps): UserContactVO {
    const vo = new UserContactVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: UserContactVOProps): UserContactVO {
    return new UserContactVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.contactType === 'email' && !v.email) {
      throw new Error('Email contact requires email field');
    }
    if (v.contactType === 'phone' && !v.phone) {
      throw new Error('Phone contact requires phone field');
    }
  }

  get id(): string { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get contactType(): ContactTypeValue { return this.value.contactType; }
  get email(): UserEmailVO | undefined { return this.value.email; }
  get phone(): UserPhoneVO | undefined { return this.value.phone; }
  get contactValue(): string { return this.value.contactValue; }
  get label(): string | undefined { return this.value.label; }
  get isPrimary(): boolean { return this.value.isPrimary; }
  get isVerified(): boolean { return this.value.isVerified; }
  get verifiedAt(): string | undefined { return this.value.verifiedAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isEmail(): boolean { return this.value.contactType === 'email'; }
  isPhone(): boolean { return this.value.contactType === 'phone'; }
}
