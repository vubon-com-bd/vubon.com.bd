import { ContactTypeVO } from '../value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '../value-objects/primitives/contact-value.vo';

export class ContactValidationService {
  static validate(type: ContactTypeVO, value: ContactValueVO): boolean {
    if (type.value === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.value);
    }
    return value.value.length > 0;
  }
}
