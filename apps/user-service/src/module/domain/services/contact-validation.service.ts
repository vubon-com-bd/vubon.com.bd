/**
 * ContactValidationService — Domain Service
 */
import { REGEX } from '@vubon/shared-constants/common';
import { ContactTypeVO } from '../value-objects/primitives/contact-type.vo.js';
import { ContactValueVO } from '../value-objects/primitives/contact-value.vo.js';
import { InvalidContactValueError } from '../errors/contact.errors.js';

export class ContactValidationService {
  static validateForType(type: ContactTypeVO, value: ContactValueVO): void {
    const v = value.value;
    if (type.isEmail()) {
      if (!REGEX.EMAIL.test(v)) {
        throw new InvalidContactValueError('email', v);
      }
      return;
    }
    if (type.isPhone()) {
      if (!REGEX.PHONE_BD.test(v) && !REGEX.PHONE_INTL.test(v)) {
        throw new InvalidContactValueError('phone', v);
      }
      return;
    }
    if (type.value === 'website') {
      if (!REGEX.URL.test(v)) {
        throw new InvalidContactValueError('url', v);
      }
      return;
    }
    // whatsapp / telegram / messenger / skype / social
    if (v.trim().length < 2) {
      throw new InvalidContactValueError(type.value, v);
    }
  }

  static canBeLoginIdentifier(type: ContactTypeVO): boolean {
    return type.isEmail() || type.isPhone();
  }

  static requiresVerification(type: ContactTypeVO): boolean {
    return type.isEmail() || type.isPhone();
  }
}
