// packages/backend-service/src/auth/module/domain/entities/social-account.entity.ts
import { randomUUID } from 'crypto';
import { BaseEntity } from './base.entity';

/**
 * Social provider types
 */
export type SocialProvider = 'google' | 'facebook' | 'github' | 'apple' | 'linkedin' | 'twitter';

/**
 * Social Account Entity
 * Represents a social account linked to a user
 * Manages OAuth tokens, profile information, and account linking
 */
export class SocialAccount extends BaseEntity {
  private _userId: string;
  private _provider: SocialProvider;
  private _providerUserId: string;
  private _email: string;
  private _name: string;
  private _avatar?: string;
  private _accessToken: string;
  private _refreshToken?: string;
  private _expiresAt?: Date;
  private _lastUsedAt: Date;
  private _isActive: boolean;

  private constructor(
    id: string,
    userId: string,
    provider: SocialProvider,
    providerUserId: string,
    email: string,
    name: string,
    accessToken: string,
    isActive: boolean,
    avatar?: string,
    refreshToken?: string,
    expiresAt?: Date,
    lastUsedAt?: Date,
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
    this._lastUsedAt = lastUsedAt || new Date();
    this._isActive = isActive;
  }

  /**
   * Static factory method to create a new social account
   */
  static create(
    userId: string,
    provider: SocialProvider,
    providerUserId: string,
    email: string,
    name: string,
    accessToken: string,
    refreshToken?: string,
    expiresAt?: Date,
    avatar?: string
  ): SocialAccount {
    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required');
    }

    if (!provider || typeof provider !== 'string') {
      throw new Error('Provider is required');
    }

    if (!providerUserId || typeof providerUserId !== 'string') {
      throw new Error('Provider user ID is required');
    }

    if (!email || typeof email !== 'string') {
      throw new Error('Email is required');
    }

    if (!name || typeof name !== 'string') {
      throw new Error('Name is required');
    }

    if (!accessToken || typeof accessToken !== 'string') {
      throw new Error('Access token is required');
    }

    const validProviders: SocialProvider[] = [
      'google',
      'facebook',
      'github',
      'apple',
      'linkedin',
      'twitter',
    ];
    if (!validProviders.includes(provider as SocialProvider)) {
      throw new Error(`Invalid provider: ${provider}`);
    }

    return new SocialAccount(
      randomUUID(),
      userId,
      provider,
      providerUserId,
      email.trim().toLowerCase(),
      name.trim(),
      accessToken,
      true,
      avatar,
      refreshToken,
      expiresAt,
      new Date()
    );
  }

  /**
   * Reconstruct a SocialAccount entity from persistence
   */
  static reconstitute(
    id: string,
    userId: string,
    provider: SocialProvider,
    providerUserId: string,
    email: string,
    name: string,
    accessToken: string,
    isActive: boolean,
    avatar?: string,
    refreshToken?: string,
    expiresAt?: Date,
    lastUsedAt?: Date,
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
      isActive,
      avatar,
      refreshToken,
      expiresAt,
      lastUsedAt,
      createdAt,
      updatedAt
    );
  }

  // Getters
  get userId(): string {
    return this._userId;
  }

  get provider(): SocialProvider {
    return this._provider;
  }

  get providerUserId(): string {
    return this._providerUserId;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get avatar(): string | undefined {
    return this._avatar;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get refreshToken(): string | undefined {
    return this._refreshToken;
  }

  get expiresAt(): Date | undefined {
    return this._expiresAt ? new Date(this._expiresAt) : undefined;
  }

  get lastUsedAt(): Date {
    return new Date(this._lastUsedAt);
  }

  get isActive(): boolean {
    return this._isActive;
  }

  // Business Logic Methods
  isExpired(graceSeconds: number = 60): boolean {
    if (!this._expiresAt) {
      return false;
    }

    const graceMs = graceSeconds * 1000;
    const now = Date.now();
    const expiryTime = this._expiresAt.getTime();

    return now + graceMs >= expiryTime;
  }

  refreshTokens(newAccessToken: string, newRefreshToken?: string, newExpiresAt?: Date): void {
    if (!this._isActive) {
      throw new Error('Cannot refresh tokens for inactive social account');
    }

    if (!newAccessToken || typeof newAccessToken !== 'string') {
      throw new Error('New access token is required');
    }

    this._accessToken = newAccessToken;

    if (newRefreshToken) {
      this._refreshToken = newRefreshToken;
    }

    if (newExpiresAt) {
      this._expiresAt = newExpiresAt;
    }

    this.touch();
  }

  updateProfile(email: string, name: string, avatar?: string): void {
    if (!this._isActive) {
      throw new Error('Cannot update profile for inactive social account');
    }

    if (!email || typeof email !== 'string') {
      throw new Error('Email is required');
    }

    if (!name || typeof name !== 'string') {
      throw new Error('Name is required');
    }

    this._email = email.trim().toLowerCase();
    this._name = name.trim();

    if (avatar !== undefined) {
      this._avatar = avatar;
    }

    this.touch();
  }

  recordUsage(): void {
    if (!this._isActive) {
      return;
    }

    this._lastUsedAt = new Date();
    this.touch();
  }

  deactivate(): void {
    if (!this._isActive) {
      throw new Error('Social account is already inactive');
    }

    this._isActive = false;
    this.touch();
  }

  activate(): void {
    if (this._isActive) {
      throw new Error('Social account is already active');
    }

    this._isActive = true;
    this.touch();
  }

  getTimeRemainingSeconds(): number {
    if (!this._expiresAt) {
      return 0;
    }

    const now = Date.now();
    const expiryTime = this._expiresAt.getTime();
    const remaining = Math.floor((expiryTime - now) / 1000);

    return Math.max(0, remaining);
  }

  getSummary(): {
    id: string;
    userId: string;
    provider: SocialProvider;
    providerUserId: string;
    email: string;
    name: string;
    avatar?: string;
    isActive: boolean;
    isExpired: boolean;
    lastUsedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      userId: this._userId,
      provider: this._provider,
      providerUserId: this._providerUserId,
      email: this._email,
      name: this._name,
      avatar: this._avatar,
      isActive: this._isActive,
      isExpired: this.isExpired(),
      lastUsedAt: this._lastUsedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  getPublicProfile(): {
    provider: SocialProvider;
    email: string;
    name: string;
    avatar?: string;
  } {
    return {
      provider: this._provider,
      email: this._email,
      name: this._name,
      avatar: this._avatar,
    };
  }

  equals(other: SocialAccount | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof SocialAccount)) {
      return false;
    }

    return this.id === other.id;
  }

  clone(): SocialAccount {
    return new SocialAccount(
      this.id,
      this._userId,
      this._provider,
      this._providerUserId,
      this._email,
      this._name,
      this._accessToken,
      this._isActive,
      this._avatar,
      this._refreshToken,
      this._expiresAt ? new Date(this._expiresAt) : undefined,
      new Date(this._lastUsedAt),
      new Date(this.createdAt),
      new Date(this.updatedAt)
    );
  }
}
