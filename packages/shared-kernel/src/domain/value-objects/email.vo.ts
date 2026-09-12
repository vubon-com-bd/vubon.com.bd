import { ValueObject } from '../base/base.vo';
import { REGEX } from '@vubon/shared-constants';

export class Email extends ValueObject<string> {
  protected validate(): void {
    if (!REGEX.EMAIL.test(this._value)) {
      throw new Error('Invalid email format');
    }
  }

  get domain(): string {
    const parts = this._value.split('@');
    return parts[1] || '';
  }

  get username(): string {
    const parts = this._value.split('@');
    return parts[0] || '';
  }

  isGmail(): boolean {
    return this.domain.toLowerCase() === 'gmail.com';
  }

  isFromDomain(domain: string): boolean {
    return this.domain.toLowerCase() === domain.toLowerCase();
  }

  normalize(): Email {
    const [username, domain] = this._value.toLowerCase().split('@');
    if (domain === 'gmail.com') {
      return new Email(`${username.replace(/\./g, '')}@${domain}`);
    }
    return new Email(`${username}@${domain}`);
  }

  mask(): string {
    const [username, domain] = this._value.split('@');
    const maskedUsername =
      username.length <= 3
        ? username[0] + '***'
        : username.slice(0, 2) + '***' + username.slice(-2);
    return `${maskedUsername}@${domain}`;
  }
}
