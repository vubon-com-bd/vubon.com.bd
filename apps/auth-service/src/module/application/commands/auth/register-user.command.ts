/**
 * CQRS command for user registration
 * Contains all data needed to register a new user
 */
import type { RegisterDto } from '../../dtos/auth/register.dto';

export class RegisterUserCommand {
  public readonly email: string;
  public readonly password: string;
  public readonly confirmPassword: string;
  public readonly firstName?: string;
  public readonly lastName?: string;
  public readonly username?: string;
  public readonly phoneNumber?: string;
  public readonly acceptTerms: boolean;
  public readonly acceptPrivacyPolicy: boolean;
  public readonly referralCode?: string;
  public readonly metadata?: Record<string, unknown>;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;

  constructor(data: RegisterDto & { ipAddress?: string; userAgent?: string }) {
    this.email = data.email;
    this.password = data.password;
    this.confirmPassword = data.confirmPassword;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.phoneNumber = data.phoneNumber;
    this.acceptTerms = data.acceptTerms;
    this.acceptPrivacyPolicy = data.acceptPrivacyPolicy;
    this.referralCode = data.referralCode;
    this.metadata = data.metadata;
    this.ipAddress = data.ipAddress;
    this.userAgent = data.userAgent;
  }

  public validate(): void {
    if (!this.email || this.email.trim().length === 0) {
      throw new Error('Email is required');
    }

    if (!this.password || this.password.length === 0) {
      throw new Error('Password is required');
    }

    if (!this.confirmPassword || this.confirmPassword.length === 0) {
      throw new Error('Confirm password is required');
    }

    if (this.password !== this.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (!this.acceptTerms) {
      throw new Error('You must accept the terms and conditions');
    }

    if (!this.acceptPrivacyPolicy) {
      throw new Error('You must accept the privacy policy');
    }
  }

  public toJSON(): Record<string, unknown> {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      phoneNumber: this.phoneNumber,
      acceptTerms: this.acceptTerms,
      acceptPrivacyPolicy: this.acceptPrivacyPolicy,
      referralCode: this.referralCode,
      metadata: this.metadata,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
    };
  }
}

export class RegisterUserWithSocialCommand {
  public readonly provider: 'google' | 'facebook' | 'github' | 'apple';
  public readonly providerId: string;
  public readonly email: string;
  public readonly firstName?: string;
  public readonly lastName?: string;
  public readonly avatar?: string;
  public readonly acceptTerms: boolean;
  public readonly acceptPrivacyPolicy: boolean;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;

  constructor(data: {
    provider: 'google' | 'facebook' | 'github' | 'apple';
    providerId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    acceptTerms: boolean;
    acceptPrivacyPolicy: boolean;
    ipAddress?: string;
    userAgent?: string;
  }) {
    this.provider = data.provider;
    this.providerId = data.providerId;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.avatar = data.avatar;
    this.acceptTerms = data.acceptTerms;
    this.acceptPrivacyPolicy = data.acceptPrivacyPolicy;
    this.ipAddress = data.ipAddress;
    this.userAgent = data.userAgent;
  }

  public validate(): void {
    if (!this.provider) {
      throw new Error('Provider is required');
    }

    if (!this.providerId || this.providerId.trim().length === 0) {
      throw new Error('Provider ID is required');
    }

    if (!this.email || this.email.trim().length === 0) {
      throw new Error('Email is required');
    }

    if (!this.acceptTerms) {
      throw new Error('You must accept the terms and conditions');
    }

    if (!this.acceptPrivacyPolicy) {
      throw new Error('You must accept the privacy policy');
    }
  }

  public toJSON(): Record<string, unknown> {
    return {
      provider: this.provider,
      providerId: this.providerId,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      avatar: this.avatar,
      acceptTerms: this.acceptTerms,
      acceptPrivacyPolicy: this.acceptPrivacyPolicy,
      ipAddress: this.ipAddress,
      userAgent: this.userAgent,
    };
  }
}

export class RegisterUserCommandResult {
  public readonly id: string;
  public readonly email: string;
  public readonly username: string;
  public readonly firstName: string | null;
  public readonly lastName: string | null;
  public readonly role: string;
  public readonly status: string;
  public readonly isVerified: boolean;
  public readonly createdAt: Date;
  public readonly requiresVerification: boolean;
  public readonly verificationToken?: string;

  constructor(data: {
    id: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    role: string;
    status: string;
    isVerified: boolean;
    createdAt: Date;
    requiresVerification: boolean;
    verificationToken?: string;
  }) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.status = data.status;
    this.isVerified = data.isVerified;
    this.createdAt = data.createdAt;
    this.requiresVerification = data.requiresVerification;
    this.verificationToken = data.verificationToken;
  }

  public toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      status: this.status,
      isVerified: this.isVerified,
      createdAt: this.createdAt,
      requiresVerification: this.requiresVerification,
    };
  }
}
