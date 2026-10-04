/**
 * ContactType Value Object
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { USER_CONTACT_TYPE } from '@vubon/shared-constants/user';

export type ContactTypeType = (typeof USER_CONTACT_TYPE)[keyof typeof USER_CONTACT_TYPE];

const CONTACT_TYPE_VALUES: ReadonlySet<string> = new Set(Object.values(USER_CONTACT_TYPE));

export class ContactTypeVO extends BaseTypeVO<ContactTypeType> {
  private constructor(value: ContactTypeType) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return CONTACT_TYPE_VALUES;
  }

  static create(raw: string): ContactTypeVO {
    if (typeof raw !== 'string') {
      throw new Error('ContactType must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!CONTACT_TYPE_VALUES.has(normalized)) {
      throw new Error(
        `Invalid contact type: "${raw}". Allowed: ${[...CONTACT_TYPE_VALUES].join(', ')}`
      );
    }
    return new ContactTypeVO(normalized as ContactTypeType);
  }

  isEmail(): boolean {
    return this.value === USER_CONTACT_TYPE.EMAIL;
  }

  isPhone(): boolean {
    return this.value === USER_CONTACT_TYPE.PHONE;
  }
}
