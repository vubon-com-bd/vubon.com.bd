// packages/backend-service/src/auth/module/domain/entities/social-account.entity.ts

// ✅ Shared packages
import type { SocialProvider } from '@vubon/shared-types';

// ✅ Relative paths
import { BaseEntity } from './base.entity';
import type { UserId } from '../value-objects/user-id.vo';
import type { Email } from '../value-objects/email.vo';

/**
 * Social Account Entity
 * Represents a social account linked to a user
 * Tracks OAuth tokens, profile information, and expiration
 */
export class SocialAccount extends BaseEntity {
  private _userId: UserId;
  private _provider: SocialProvider;
  private _providerUserId: string;
  private _email: Email;
  private _name: string;
  private _avatar: string | null;
  private _accessToken: string;
  private _refreshToken: string | null;
  private _expiresAt: Date | null;
  private _isActive: boolean;
  private _emailVerified: boolean;

  private constructor(
    id: string,
    userId: UserId,
    provider: SocialProvider,
    providerUserId: string,
    email: Email,
    name: string,
    accessToken: string,
    refreshToken: string | null = null,
    expiresAt: Date | null = null,
    isActive: boolean = true,
    emailVerified: boolean = false,
    avatar: string | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this._userId = userId;
    this._provider = provider;
    this._providerUserId = providerUserId;
    this._email = email;
    this._name = name;
    this._avatar = avatar;
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._expiresAt = expiresAt;
    this._isActive = isActive;
    this._emailVerified = emailVerified;
  }

  /**
   * Create a new social account
   */
  static create(
    id: string,
    userId: UserId,
    provider: SocialProvider,
    providerUserId: string,
    email: Email,
    name: string,
    accessToken: string,
    refreshToken: string | null = null,
    expiresAt: Date | null = null,
    avatar: string | null = null,
    emailVerified: boolean = false
  ): SocialAccount {
    const now = new Date();
    return new SocialAccount(
      id,
      userId,
      provider,
      providerUserId,
      email,
      name,
      accessToken,
      refreshToken,
      expiresAt,
      true,
      emailVerified,
      avatar,
      now,
      now
    );
  }

  /**
   * Reconstruct a social account from persistence
   */
  static reconstruct(
    id: string,
    userId: UserId,
    provider: SocialProvider,
    providerUserId: string,
    email: Email,
    name: string,
    accessToken: string,
    refreshToken: string | null = null,
    expiresAt: Date | null = null,
    isActive: boolean = true,
    emailVerified: boolean = false,
    avatar: string | null = null,
    createdAt?: Date,
    updatedAt?: Date
  ): SocialAccount {
    return new SocialAccount(
      id,
      userId,
      provider,
      providerUserId,
      email,
      name,
      accessToken,
      refreshToken,
      expiresAt,
      isActive,
      emailVerified,
      avatar,
      createdAt,
      updatedAt
    );
  }

  // ──────────────────────────────────────
  // Getters
  // ──────────────────────────────────────

  get userId(): UserId {
    return this._userId;
  }

  get provider(): SocialProvider {
    return this._provider;
  }

  get providerUserId(): string {
    return this._providerUserId;
  }

  get email(): Email {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get avatar(): string | null {
    return this._avatar;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get refreshTokenValue(): string | null {
    return this._refreshToken;
  }

  get expiresAt(): Date | null {
    return this._expiresAt ? new Date(this._expiresAt) : null;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get emailVerified(): boolean {
    return this._emailVerified;
  }

  /**
   * Check if the access token has expired
   */
  isExpired(): boolean {
    if (this._expiresAt === null) {
      return false;
    }
    return this._expiresAt < new Date();
  }

  /**
   * Check if the account has a refresh token
   */
  hasRefreshToken(): boolean {
    return this._refreshToken !== null && this._refreshToken.length > 0;
  }

  /**
   * Refresh the access token
   */
  refreshAccessToken(newAccessToken: string, newExpiresAt: Date | null = null): void {
    if (!newAccessToken || typeof newAccessToken !== 'string') {
      throw new Error('New access token is required');
    }

    if (newAccessToken.length < 8) {
      throw new Error('New access token must be at least 8 characters');
    }

    if (newExpiresAt && newExpiresAt <= new Date()) {
      throw new Error('New expiry date must be in the future');
    }

    this._accessToken = newAccessToken;
    this._expiresAt = newExpiresAt;
    this.touch();
  }

  /**
   * Update the refresh token
   */
  updateRefreshToken(newRefreshToken: string | null): void {
    if (newRefreshToken !== null && typeof newRefreshToken !== 'string') {
      throw new Error('Refresh token must be a string or null');
    }

    if (newRefreshToken !== null && newRefreshToken.length < 8) {
      throw new Error('Refresh token must be at least 8 characters');
    }

    this._refreshToken = newRefreshToken;
    this.touch();
  }

  /**
   * Update profile information
   */
  updateProfile(data: {
    name?: string;
    avatar?: string | null;
    email?: Email;
    emailVerified?: boolean;
  }): void {
    if (data.name !== undefined) {
      if (!data.name || typeof data.name !== 'string') {
        throw new Error('Name must be a non-empty string');
      }
      if (data.name.length > 100) {
        throw new Error('Name cannot exceed 100 characters');
      }
      this._name = data.name;
    }

    if (data.avatar !== undefined) {
      if (data.avatar !== null && typeof data.avatar !== 'string') {
        throw new Error('Avatar must be a string or null');
      }
      if (data.avatar !== null && data.avatar.length > 500) {
        throw new Error('Avatar URL cannot exceed 500 characters');
      }
      this._avatar = data.avatar;
    }

    if (data.email !== undefined) {
      this._email = data.email;
    }

    if (data.emailVerified !== undefined) {
      if (typeof data.emailVerified !== 'boolean') {
        throw new Error('Email verified must be a boolean');
      }
      this._emailVerified = data.emailVerified;
    }

    this.touch();
  }

  /**
   * Deactivate the social account
   */
  deactivate(): void {
    if (!this._isActive) {
      throw new Error('Social account is already deactivated');
    }

    this._isActive = false;
    this.touch();
  }

  /**
   * Reactivate the social account
   */
  reactivate(): void {
    if (this._isActive) {
      throw new Error('Social account is already active');
    }

    this._isActive = true;
    this.touch();
  }

  /**
   * Get the provider display name
   * Only includes providers defined in SocialProvider type from shared-types
   */
  getProviderDisplayName(): string {
    const providerNames: Record<SocialProvider, string> = {
      google: 'Google',
      facebook: 'Facebook',
      github: 'GitHub',
      apple: 'Apple',
      linkedin: 'LinkedIn',
      twitter: 'Twitter/X',
      microsoft: 'Microsoft',
      discord: 'Discord',
    };
    return providerNames[this._provider] || this._provider;
  }

  /**
   * Get time remaining until token expiry in seconds
   */
  getTimeRemainingSeconds(): number {
    if (this._expiresAt === null) {
      return 0;
    }

    const now = Date.now();
    const expiry = this._expiresAt.getTime();
    const remaining = Math.floor((expiry - now) / 1000);
    return Math.max(0, remaining);
  }

  /**
   * Get social account summary
   */
  getSummary(): {
    id: string;
    userId: string;
    provider: SocialProvider;
    providerDisplayName: string;
    providerUserId: string;
    email: string;
    name: string;
    avatar: string | null;
    isActive: boolean;
    emailVerified: boolean;
    isExpired: boolean;
    hasRefreshToken: boolean;
    expiresAt: Date | null;
    remainingSeconds: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId.value,
      provider: this._provider,
      providerDisplayName: this.getProviderDisplayName(),
      providerUserId: this._providerUserId,
      email: this._email.toString(),
      name: this._name,
      avatar: this._avatar,
      isActive: this._isActive,
      emailVerified: this._emailVerified,
      isExpired: this.isExpired(),
      hasRefreshToken: this.hasRefreshToken(),
      expiresAt: this._expiresAt,
      remainingSeconds: this.getTimeRemainingSeconds(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compare two SocialAccount entities
   */
  equals(other: SocialAccount | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (!(other instanceof SocialAccount)) {
      return false;
    }
    return this.id === other.id;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `SocialAccount(id=${this.id}, userId=${this._userId.value}, provider=${this._provider}, email=${this._email.toString()})`;
  }
}
