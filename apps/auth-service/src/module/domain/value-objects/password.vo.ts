/**
 * Password value object
 * Validates and encapsulates password logic with strength requirements
 */
import {
  getPasswordErrors,
  getPasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthScore,
  getPasswordStrengthText,
  isPasswordStrong,
  PASSWORD_POLICY,
} from '@vubon/auth-shared-utils';

import { ValidatedValueObject, ValueObject } from './base.vo';
import type { ValueObjectProps } from './base.vo';

export interface PasswordProps extends ValueObjectProps {
  value: string;
  hashed?: boolean;
  [key: string]: unknown;
}

export class Password extends ValidatedValueObject<PasswordProps> {
  private constructor(value: string, hashed: boolean = false) {
    super({ value, hashed });
  }

  public static create(password: string): Password {
    if (!password || typeof password !== 'string') {
      throw new Error('Password is required');
    }

    if (password.length < PASSWORD_POLICY.MIN_LENGTH) {
      throw new Error(`Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`);
    }

    if (password.length > PASSWORD_POLICY.MAX_LENGTH) {
      throw new Error(`Password must be less than ${PASSWORD_POLICY.MAX_LENGTH} characters`);
    }

    if (!isPasswordStrong(password)) {
      const errors = getPasswordErrors(password);
      throw new Error(`Password is not strong enough: ${errors.join(', ')}`);
    }

    return new Password(password);
  }

  public static fromHashed(hashedPassword: string): Password {
    if (!hashedPassword || typeof hashedPassword !== 'string') {
      throw new Error('Hashed password is required');
    }

    if (hashedPassword.length < 32) {
      throw new Error('Invalid hashed password format');
    }

    return new Password(hashedPassword, true);
  }

  public static createWeak(password: string): Password {
    if (!password || typeof password !== 'string') {
      throw new Error('Password is required');
    }

    if (password.length < PASSWORD_POLICY.MIN_LENGTH) {
      throw new Error(`Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`);
    }

    return new Password(password);
  }

  public static reconstitute(props: PasswordProps): Password {
    return new Password(props.value, props.hashed || false);
  }

  public override get value(): PasswordProps {
    return this.props;
  }

  public get passwordString(): string {
    return this.props.value;
  }

  public isHashed(): boolean {
    return this.props.hashed || false;
  }

  protected validate(): void {
    const { value, hashed } = this.props;

    if (!value || typeof value !== 'string') {
      throw new Error('Password is required');
    }

    if (!hashed) {
      if (value.length < PASSWORD_POLICY.MIN_LENGTH) {
        throw new Error(`Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`);
      }

      if (value.length > PASSWORD_POLICY.MAX_LENGTH) {
        throw new Error(`Password must be less than ${PASSWORD_POLICY.MAX_LENGTH} characters`);
      }

      if (!isPasswordStrong(value)) {
        const errors = getPasswordErrors(value);
        throw new Error(`Password is not strong enough: ${errors.join(', ')}`);
      }
    }
  }

  public getStrength(): 'weak' | 'medium' | 'strong' {
    if (this.isHashed()) {
      return 'strong';
    }
    return getPasswordStrength(this.passwordString);
  }

  public getStrengthScore(): number {
    if (this.isHashed()) {
      return 6;
    }
    return getPasswordStrengthScore(this.passwordString);
  }

  public getStrengthText(): string {
    if (this.isHashed()) {
      return 'Hashed';
    }
    return getPasswordStrengthText(this.passwordString);
  }

  public getStrengthColor(): string {
    if (this.isHashed()) {
      return '#00FF00';
    }
    return getPasswordStrengthColor(this.passwordString);
  }

  public getErrors(): string[] {
    if (this.isHashed()) {
      return [];
    }
    return getPasswordErrors(this.passwordString);
  }

  public override isValid(): boolean {
    try {
      this.validate();
      return true;
    } catch {
      return false;
    }
  }

  public isStrong(): boolean {
    if (this.isHashed()) {
      return true;
    }
    return isPasswordStrong(this.passwordString);
  }

  public hasUppercase(): boolean {
    if (this.isHashed()) {
      return true;
    }
    return /[A-Z]/.test(this.passwordString);
  }

  public hasLowercase(): boolean {
    if (this.isHashed()) {
      return true;
    }
    return /[a-z]/.test(this.passwordString);
  }

  public hasNumber(): boolean {
    if (this.isHashed()) {
      return true;
    }
    return /\d/.test(this.passwordString);
  }

  public hasSpecialCharacter(): boolean {
    if (this.isHashed()) {
      return true;
    }
    return /[!@#$%^&*()_+\-=[\]{};:'",.<>/?]/.test(this.passwordString);
  }

  public getLength(): number {
    return this.passwordString.length;
  }

  public meetsMinLength(): boolean {
    return this.passwordString.length >= PASSWORD_POLICY.MIN_LENGTH;
  }

  public meetsMaxLength(): boolean {
    return this.passwordString.length <= PASSWORD_POLICY.MAX_LENGTH;
  }

  public override equals(other: ValueObject<ValueObjectProps>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this === other) {
      return true;
    }

    if (!(other instanceof Password)) {
      return false;
    }

    if (this.isHashed() && other.isHashed()) {
      return this.passwordString === other.passwordString;
    }

    return false;
  }

  public comparePlaintext(plaintext: string): boolean {
    if (this.isHashed()) {
      return false;
    }

    return this.passwordString === plaintext;
  }

  public toHashed(): Password {
    if (this.isHashed()) {
      return this;
    }

    return new Password(this.passwordString, true);
  }

  public override toString(): string {
    if (this.isHashed()) {
      return this.passwordString;
    }
    return '********';
  }

  public override toJSON(): ValueObjectProps {
    if (this.isHashed()) {
      return { value: this.passwordString, hashed: true };
    }
    return { value: '********', hashed: false };
  }

  public getMaskedValue(): string {
    if (this.isHashed()) {
      return this.passwordString;
    }
    return '*'.repeat(Math.min(this.passwordString.length, 8));
  }
}

export class PasswordCollection {
  private readonly passwords: Password[];

  private constructor(passwords: Password[]) {
    this.passwords = [...passwords];
  }

  public static create(passwords: string[]): PasswordCollection {
    if (!passwords || !Array.isArray(passwords)) {
      return new PasswordCollection([]);
    }

    const passwordObjects = passwords
      .filter((password) => password && typeof password === 'string')
      .map((password) => Password.create(password));

    return new PasswordCollection(passwordObjects);
  }

  public static fromPasswords(passwords: Password[]): PasswordCollection {
    return new PasswordCollection(passwords);
  }

  public get length(): number {
    return this.passwords.length;
  }

  public isEmpty(): boolean {
    return this.passwords.length === 0;
  }

  public contains(password: Password): boolean {
    return this.passwords.some((p) => p.equals(password));
  }

  public add(password: Password): PasswordCollection {
    if (this.contains(password)) {
      return this;
    }

    return new PasswordCollection([...this.passwords, password]);
  }

  public remove(password: Password): PasswordCollection {
    return new PasswordCollection(this.passwords.filter((p) => !p.equals(password)));
  }

  public getPasswords(): Password[] {
    return [...this.passwords];
  }

  public getStrongest(): Password | null {
    if (this.isEmpty()) {
      return null;
    }

    return this.passwords.reduce(
      (strongest, current) => {
        if (!strongest) {
          return current;
        }
        return current.getStrengthScore() > strongest.getStrengthScore() ? current : strongest;
      },
      null as Password | null,
    );
  }

  public getWeakest(): Password | null {
    if (this.isEmpty()) {
      return null;
    }

    return this.passwords.reduce(
      (weakest, current) => {
        if (!weakest) {
          return current;
        }
        return current.getStrengthScore() < weakest.getStrengthScore() ? current : weakest;
      },
      null as Password | null,
    );
  }

  public toJSON(): ValueObjectProps[] {
    return this.passwords.map((password) => password.toJSON());
  }

  public toString(): string {
    return this.passwords.map((password) => password.toString()).join(', ');
  }

  public equals(other: PasswordCollection): boolean {
    if (!other) {
      return false;
    }

    if (this === other) {
      return true;
    }

    if (!(other instanceof PasswordCollection)) {
      return false;
    }

    if (this.length !== other.length) {
      return false;
    }

    for (let i = 0; i < this.length; i++) {
      // eslint-disable-next-line security/detect-object-injection
      const currentPassword = this.passwords[i];
      // eslint-disable-next-line security/detect-object-injection
      const otherPassword = other.passwords[i];
      if (!currentPassword || !otherPassword || !currentPassword.equals(otherPassword)) {
        return false;
      }
    }

    return true;
  }
}
