/**
 * Email value object
 * Validates and encapsulates email address logic
 */
import {
  isDisposableEmail,
  isEducationalEmail,
  isValidEmail,
  normalizeEmail,
} from '@repo/auth-utils';

import { ValidatedValueObject, ValueObject, ValueObjectProps } from './base.vo';

export interface EmailProps {
  value: string;
}

export class Email extends ValidatedValueObject<EmailProps> {
  private constructor(value: string) {
    super({ value });
  }

  public static create(
    email: string,
    options?: { allowDisposable?: boolean; allowEducational?: boolean },
  ): Email {
    if (!email || typeof email !== 'string') {
      throw new Error('Email is required');
    }

    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      throw new Error('Invalid email format');
    }

    const { allowDisposable = false, allowEducational = false } = options || {};

    if (!allowDisposable && isDisposableEmail(normalizedEmail, [])) {
      throw new Error('Disposable email addresses are not allowed');
    }

    if (!allowEducational && isEducationalEmail(normalizedEmail)) {
      throw new Error('Educational email addresses are not allowed');
    }

    return new Email(normalizedEmail);
  }

  public static fromString(email: string): Email {
    return Email.create(email);
  }

  public static reconstitute(value: string): Email {
    return new Email(value);
  }

  public override get value(): string {
    return this.props.value;
  }

  protected validate(): void {
    const { value } = this.props;

    if (!value || typeof value !== 'string') {
      throw new Error('Email is required');
    }

    if (value.length > 255) {
      throw new Error('Email must be less than 255 characters');
    }

    if (!isValidEmail(value)) {
      throw new Error('Invalid email format');
    }
  }

  public getDomain(): string {
    const parts = this.value.split('@');
    return parts[1] || '';
  }

  public getLocalPart(): string {
    const parts = this.value.split('@');
    return parts[0] || '';
  }

  public isFromDomain(domain: string): boolean {
    return this.getDomain().toLowerCase() === domain.toLowerCase();
  }

  public isFromAllowedDomains(domains: string[]): boolean {
    if (!domains || domains.length === 0) {
      return true;
    }

    return domains.some((domain) => this.isFromDomain(domain));
  }

  public isDisposable(): boolean {
    return isDisposableEmail(this.value, []);
  }

  public isEducational(): boolean {
    return isEducationalEmail(this.value);
  }

  public obfuscate(): string {
    const [localPart, domain] = this.value.split('@');
    const obfuscatedLocal =
      localPart.length <= 2
        ? localPart[0] + '*'
        : localPart[0] +
          '*'.repeat(Math.min(localPart.length - 2, 4)) +
          localPart[localPart.length - 1];

    return `${obfuscatedLocal}@${domain}`;
  }

  public hasPlusAlias(): boolean {
    return this.getLocalPart().includes('+');
  }

  public stripPlusAlias(): Email {
    if (!this.hasPlusAlias()) {
      return this;
    }

    const [localPart, domain] = this.value.split('@');
    const strippedLocal = localPart.includes('+') ? localPart.split('+')[0] : localPart;

    return new Email(`${strippedLocal}@${domain}`);
  }

  public normalize(): Email {
    return new Email(normalizeEmail(this.value));
  }

  public override equals(other: ValueObject<ValueObjectProps>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this === other) {
      return true;
    }

    if (!(other instanceof Email)) {
      return false;
    }

    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  public override toString(): string {
    return this.value;
  }

  public override toJSON(): string {
    return this.value;
  }
}

export class EmailCollection {
  private readonly emails: Email[];

  private constructor(emails: Email[]) {
    this.emails = [...emails];
  }

  public static create(
    emails: string[],
    options?: { allowDisposable?: boolean; allowEducational?: boolean },
  ): EmailCollection {
    if (!emails || !Array.isArray(emails)) {
      return new EmailCollection([]);
    }

    const emailObjects = emails
      .filter((email) => email && typeof email === 'string')
      .map((email) => Email.create(email, options));

    return new EmailCollection(emailObjects);
  }

  public static fromEmails(emails: Email[]): EmailCollection {
    return new EmailCollection(emails);
  }

  public get length(): number {
    return this.emails.length;
  }

  public isEmpty(): boolean {
    return this.emails.length === 0;
  }

  public contains(email: Email): boolean {
    return this.emails.some((e) => e.equals(email));
  }

  public containsString(email: string): boolean {
    try {
      const emailObj = Email.create(email);
      return this.contains(emailObj);
    } catch {
      return false;
    }
  }

  public add(email: Email): EmailCollection {
    if (this.contains(email)) {
      return this;
    }

    return new EmailCollection([...this.emails, email]);
  }

  public addString(
    email: string,
    options?: { allowDisposable?: boolean; allowEducational?: boolean },
  ): EmailCollection {
    const emailObj = Email.create(email, options);
    return this.add(emailObj);
  }

  public remove(email: Email): EmailCollection {
    return new EmailCollection(this.emails.filter((e) => !e.equals(email)));
  }

  public removeString(email: string): EmailCollection {
    try {
      const emailObj = Email.create(email);
      return this.remove(emailObj);
    } catch {
      return this;
    }
  }

  public getEmails(): Email[] {
    return [...this.emails];
  }

  public getStrings(): string[] {
    return this.emails.map((email) => email.toString());
  }

  public toJSON(): string[] {
    return this.getStrings();
  }

  public toString(): string {
    return this.getStrings().join(', ');
  }

  public equals(other: EmailCollection): boolean {
    if (!other) {
      return false;
    }

    if (this === other) {
      return true;
    }

    if (!(other instanceof EmailCollection)) {
      return false;
    }

    if (this.length !== other.length) {
      return false;
    }

    for (let i = 0; i < this.length; i++) {
      // eslint-disable-next-line security/detect-object-injection
      const currentEmail = this.emails[i];
      // eslint-disable-next-line security/detect-object-injection
      const otherEmail = other.emails[i];
      if (!currentEmail || !otherEmail || !currentEmail.equals(otherEmail)) {
        return false;
      }
    }

    return true;
  }
}
