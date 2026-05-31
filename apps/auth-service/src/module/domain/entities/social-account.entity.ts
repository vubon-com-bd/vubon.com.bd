/**
 * Social Account Entity - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/social-account.entity
 * 
 * @description
 * Represents a user's social account link for OAuth authentication.
 * Manages provider linking, unlinking, and validation.
 * 
 * Enterprise Rules:
 * ✅ Domain stores only identity information, NOT access tokens
 * ✅ Tokens stored in infrastructure (secure vault)
 * ✅ Support for Bangladesh-specific providers
 * ✅ Provider validation rules
 * ✅ Framework-free (no crypto dependency)
 * ✅ Multi-provider support with primary account
 * 
 * IMPORTANT: OAuth access/refresh tokens are infrastructure concerns.
 * They should be stored in a secure token vault, not in domain entities.
 * This entity only stores the social account identity.
 */

import { BaseEntity, EntityValidationError, type IdGenerator } from './base.entity';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';

// ==================== Enums ====================

/**
 * Social provider enumeration (including Bangladesh-specific)
 */
export enum SocialProvider {
  // International providers
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  LINKEDIN = 'LINKEDIN',
  APPLE = 'APPLE',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  MICROSOFT = 'MICROSOFT',
  
  // Bangladesh-specific providers
  WHATSAPP = 'WHATSAPP',
  IMO = 'IMO',
  TELEGRAM = 'TELEGRAM',
  VIBER = 'VIBER',
  
  // Mobile Financial Services (Bangladesh specific)
  BKASH = 'BKASH',      // Mobile Financial Services auth
  NAGAD = 'NAGAD',      // Mobile Financial Services auth
  ROCKET = 'ROCKET',    // Mobile Financial Services auth
}

/**
 * Social account status
 */
export enum SocialAccountStatus {
  ACTIVE = 'ACTIVE',
  UNLINKED = 'UNLINKED',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED',
}

/**
 * Social account event types
 */
export enum SocialAccountEventType {
  SOCIAL_ACCOUNT_LINKED = 'social_account.linked',
  SOCIAL_ACCOUNT_UNLINKED = 'social_account.unlinked',
  SOCIAL_ACCOUNT_SUSPENDED = 'social_account.suspended',
  SOCIAL_ACCOUNT_REACTIVATED = 'social_account.reactivated',
  SOCIAL_ACCOUNT_INFO_UPDATED = 'social_account.info_updated',
  SOCIAL_ACCOUNT_PRIMARY_CHANGED = 'social_account.primary_changed',
  SOCIAL_ACCOUNT_MERGED = 'social_account.merged',
}

// ==================== Types ====================

/**
 * Social account configuration constants
 */
const SOCIAL_CONFIG = {
  // Maximum linked accounts per user
  MAX_LINKED_ACCOUNTS: 10,
  
  // Provider-specific email domains
  PROVIDER_EMAIL_DOMAINS: {
    [SocialProvider.GOOGLE]: ['gmail.com', 'google.com'],
    [SocialProvider.FACEBOOK]: ['facebook.com', 'fb.com'],
    [SocialProvider.APPLE]: ['apple.com', 'icloud.com', 'me.com'],
    [SocialProvider.MICROSOFT]: ['outlook.com', 'hotmail.com', 'live.com'],
  },
  
  // Minimum name length
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 100,
  
  // Rate limits
  MAX_UNLINK_PER_DAY: 5,
} as const;

/**
 * Provider display names (for UI)
 */
export const PROVIDER_DISPLAY_NAMES: Record<SocialProvider, string> = {
  [SocialProvider.GOOGLE]: 'Google',
  [SocialProvider.FACEBOOK]: 'Facebook',
  [SocialProvider.GITHUB]: 'GitHub',
  [SocialProvider.LINKEDIN]: 'LinkedIn',
  [SocialProvider.APPLE]: 'Apple',
  [SocialProvider.TWITTER]: 'Twitter',
  [SocialProvider.INSTAGRAM]: 'Instagram',
  [SocialProvider.MICROSOFT]: 'Microsoft',
  [SocialProvider.WHATSAPP]: 'WhatsApp',
  [SocialProvider.IMO]: 'Imo',
  [SocialProvider.TELEGRAM]: 'Telegram',
  [SocialProvider.VIBER]: 'Viber',
  [SocialProvider.BKASH]: 'bKash',
  [SocialProvider.NAGAD]: 'Nagad',
  [SocialProvider.ROCKET]: 'Rocket',
};

// ==================== Social Account Entity ====================

/**
 * Social Account Entity
 * 
 * Manages user's linked social accounts (identity only)
 */
export class SocialAccount extends BaseEntity {
  private _userId: string;
  private _provider: SocialProvider;
  private _providerUserId: string;
  private _providerEmail: Email | null;
  private _providerPhone: Phone | null;
  private _providerName: string | undefined;
  private _status: SocialAccountStatus;
  private _linkedAt: Date;
  private _unlinkedAt: Date | undefined;
  private _suspendedAt: Date | undefined;
  private _suspendedReason: string | undefined;
  private _profilePictureUrl: string | undefined;
  private _profileUrl: string | undefined;
  private _lastSyncAt: Date | undefined;
  private _unlinkCount: number;
  private _isPrimary: boolean;
  private _mergedFrom?: string;  // If merged from another account

  private constructor(
    id: string,
    userId: string,
    provider: SocialProvider,
    providerUserId: string,
    providerEmail: Email | null,
    providerPhone: Phone | null,
    providerName: string | undefined,
    status: SocialAccountStatus,
    linkedAt: Date,
    unlinkedAt: Date | undefined,
    suspendedAt: Date | undefined,
    suspendedReason: string | undefined,
    profilePictureUrl: string | undefined,
    profileUrl: string | undefined,
    lastSyncAt: Date | undefined,
    unlinkCount: number,
    isPrimary: boolean,
    mergedFrom: string | undefined,
    createdAt: Date,
    updatedAt: Date,
    version: number
  ) {
    super({ id, createdAt, updatedAt, version });
    
    this._userId = userId;
    this._provider = provider;
    this._providerUserId = providerUserId;
    this._providerEmail = providerEmail;
    this._providerPhone = providerPhone;
    this._providerName = providerName;
    this._status = status;
    this._linkedAt = linkedAt;
    this._unlinkedAt = unlinkedAt;
    this._suspendedAt = suspendedAt;
    this._suspendedReason = suspendedReason;
    this._profilePictureUrl = profilePictureUrl;
    this._profileUrl = profileUrl;
    this._lastSyncAt = lastSyncAt;
    this._unlinkCount = unlinkCount;
    this._isPrimary = isPrimary;
    this._mergedFrom = mergedFrom;
    
    this.validate();
  }

  /**
   * Validate entity invariants
   */
  protected validate(): void {
    if (!this._userId) {
      throw new EntityValidationError('Social account requires a user ID');
    }
    if (!this._provider) {
      throw new EntityValidationError('Social account requires a provider');
    }
    if (!this._providerUserId) {
      throw new EntityValidationError('Social account requires a provider user ID');
    }
    if (!this._providerEmail && !this._providerPhone) {
      throw new EntityValidationError('Social account requires either email or phone');
    }
    if (this._unlinkCount < 0) {
      throw new EntityValidationError('Unlink count cannot be negative');
    }
    if (this._unlinkCount > SOCIAL_CONFIG.MAX_UNLINK_PER_DAY) {
      throw new EntityValidationError('Unlink count exceeds daily limit');
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Link a social account (factory method)
   */
  public static linkProvider(
    userId: string,
    provider: SocialProvider,
    providerUserId: string,
    providerEmail: Email | null,
    providerPhone: Phone | null,
    idGenerator: IdGenerator,
    providerName?: string,
    profilePictureUrl?: string,
    profileUrl?: string,
    isPrimary: boolean = false,
    currentLinkedCount: number = 0
  ): SocialAccount {
    const now = new Date();
    
    // Check maximum linked accounts
    if (currentLinkedCount >= SOCIAL_CONFIG.MAX_LINKED_ACCOUNTS) {
      throw new EntityValidationError(
        `Maximum linked accounts (${SOCIAL_CONFIG.MAX_LINKED_ACCOUNTS}) reached`
      );
    }
    
    // Validate provider-specific rules
    SocialAccount.validateProviderInfo(provider, providerEmail, providerPhone, providerUserId);
    
    const account = new SocialAccount(
      idGenerator.generate(),
      userId,
      provider,
      providerUserId,
      providerEmail,
      providerPhone,
      providerName,
      SocialAccountStatus.ACTIVE,
      now,
      undefined,
      undefined,
      undefined,
      profilePictureUrl,
      profileUrl,
      undefined,
      0,
      isPrimary,
      undefined,
      now,
      now,
      1
    );
    
    account.addDomainEvent({
      eventId: generateEventId(),
      eventType: SocialAccountEventType.SOCIAL_ACCOUNT_LINKED,
      aggregateId: account.id,
      occurredOn: now,
      version: 1,
      metadata: {
        userId,
        provider,
        providerUserId,
        providerEmail: providerEmail?.getValue(),
        providerPhone: providerPhone?.getE164(),
        isPrimary,
      },
    });
    
    return account;
  }

  /**
   * Reconstitute from persistence
   */
  public static reconstitute(data: {
    id: string;
    userId: string;
    provider: SocialProvider;
    providerUserId: string;
    providerEmail?: Email;
    providerPhone?: Phone;
    providerName?: string;
    status: SocialAccountStatus;
    linkedAt: Date;
    unlinkedAt?: Date;
    suspendedAt?: Date;
    suspendedReason?: string;
    profilePictureUrl?: string;
    profileUrl?: string;
    lastSyncAt?: Date;
    unlinkCount: number;
    isPrimary: boolean;
    mergedFrom?: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }): SocialAccount {
    return new SocialAccount(
      data.id,
      data.userId,
      data.provider,
      data.providerUserId,
      data.providerEmail || null,
      data.providerPhone || null,
      data.providerName,
      data.status,
      data.linkedAt,
      data.unlinkedAt,
      data.suspendedAt,
      data.suspendedReason,
      data.profilePictureUrl,
      data.profileUrl,
      data.lastSyncAt,
      data.unlinkCount,
      data.isPrimary,
      data.mergedFrom,
      data.createdAt,
      data.updatedAt,
      data.version
    );
  }

  // ============================================================
  // Private Helpers
  // ============================================================

  /**
   * Validate provider-specific information
   */
  private static validateProviderInfo(
    provider: SocialProvider,
    email: Email | null,
    phone: Phone | null,
    providerUserId: string
  ): void {
    // Check provider-specific email domain
    const allowedDomains = SOCIAL_CONFIG.PROVIDER_EMAIL_DOMAINS[provider as keyof typeof SOCIAL_CONFIG.PROVIDER_EMAIL_DOMAINS];
    if (allowedDomains && email) {
      const emailDomain = email.getDomain();
      if (!allowedDomains.includes(emailDomain)) {
        throw new EntityValidationError(
          `Email domain ${emailDomain} is not valid for ${provider}`
        );
      }
    }
    
    // Provider-specific user ID validation
    switch (provider) {
      case SocialProvider.GOOGLE:
        if (!providerUserId || providerUserId.length < 10) {
          throw new EntityValidationError('Invalid Google user ID format');
        }
        break;
      case SocialProvider.GITHUB:
        if (!providerUserId.match(/^[a-zA-Z0-9-]+$/)) {
          throw new EntityValidationError('Invalid GitHub username format');
        }
        break;
      case SocialProvider.WHATSAPP:
      case SocialProvider.IMO:
      case SocialProvider.TELEGRAM:
      case SocialProvider.VIBER:
        if (!phone || !phone.getE164()) {
          throw new EntityValidationError(`${provider} requires a phone number`);
        }
        break;
      case SocialProvider.BKASH:
      case SocialProvider.NAGAD:
      case SocialProvider.ROCKET:
        if (!phone || !phone.getE164()) {
          throw new EntityValidationError(`${provider} requires a phone number`);
        }
        if (!providerUserId.match(/^\d{10,15}$/)) {
          throw new EntityValidationError(`Invalid ${provider} account number format`);
        }
        break;
    }
  }

  // ============================================================
  // Business Methods
  // ============================================================

  /**
   * Unlink social account
   */
  public unlinkProvider(reason?: string): void {
    if (this._status !== SocialAccountStatus.ACTIVE) {
      throw new EntityValidationError(
        `Cannot unlink account with status: ${this._status}`
      );
    }
    
    this._status = SocialAccountStatus.UNLINKED;
    this._unlinkedAt = new Date();
    this._unlinkCount++;
    this._isPrimary = false;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SocialAccountEventType.SOCIAL_ACCOUNT_UNLINKED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        provider: this._provider,
        reason: reason || 'User initiated',
      },
    });
  }

  /**
   * Suspend social account (admin action)
   */
  public suspend(reason: string): void {
    if (this._status !== SocialAccountStatus.ACTIVE) {
      throw new EntityValidationError(
        `Cannot suspend account with status: ${this._status}`
      );
    }
    
    this._status = SocialAccountStatus.SUSPENDED;
    this._suspendedAt = new Date();
    this._suspendedReason = reason;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SocialAccountEventType.SOCIAL_ACCOUNT_SUSPENDED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        provider: this._provider,
        reason,
      },
    });
  }

  /**
   * Reactivate suspended account
   */
  public reactivate(): void {
    if (this._status !== SocialAccountStatus.SUSPENDED) {
      throw new EntityValidationError(
        `Cannot reactivate account with status: ${this._status}`
      );
    }
    
    this._status = SocialAccountStatus.ACTIVE;
    this._suspendedAt = undefined;
    this._suspendedReason = undefined;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SocialAccountEventType.SOCIAL_ACCOUNT_REACTIVATED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        provider: this._provider,
      },
    });
  }

  /**
   * Update profile information (from provider sync)
   */
  public updateProfile(
    name?: string,
    profilePictureUrl?: string,
    profileUrl?: string
  ): void {
    if (name) {
      if (name.length < SOCIAL_CONFIG.MIN_NAME_LENGTH || 
          name.length > SOCIAL_CONFIG.MAX_NAME_LENGTH) {
        throw new EntityValidationError(
          `Name length must be between ${SOCIAL_CONFIG.MIN_NAME_LENGTH} and ${SOCIAL_CONFIG.MAX_NAME_LENGTH}`
        );
      }
      this._providerName = name;
    }
    
    if (profilePictureUrl) {
      this._profilePictureUrl = profilePictureUrl;
    }
    
    if (profileUrl) {
      this._profileUrl = profileUrl;
    }
    
    this._lastSyncAt = new Date();
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SocialAccountEventType.SOCIAL_ACCOUNT_INFO_UPDATED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        provider: this._provider,
      },
    });
  }

  /**
   * Set as primary social account
   */
  public setPrimary(isPrimary: boolean): void {
    if (this._isPrimary === isPrimary) {
      return;
    }
    
    this._isPrimary = isPrimary;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SocialAccountEventType.SOCIAL_ACCOUNT_PRIMARY_CHANGED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        provider: this._provider,
        isPrimary,
      },
    });
  }

  /**
   * Merge another social account into this one
   */
  public mergeFrom(otherId: string): void {
    this._mergedFrom = otherId;
    this.touch();
    
    this.addDomainEvent({
      eventId: generateEventId(),
      eventType: SocialAccountEventType.SOCIAL_ACCOUNT_MERGED,
      aggregateId: this.id,
      occurredOn: new Date(),
      version: this.version,
      metadata: {
        userId: this._userId,
        provider: this._provider,
        mergedFrom: otherId,
      },
    });
  }

  // ============================================================
  // Query Methods
  // ============================================================

  /**
   * Check if account is active
   */
  public isActive(): boolean {
    return this._status === SocialAccountStatus.ACTIVE;
  }

  /**
   * Check if account is linked
   */
  public isLinked(): boolean {
    return this._status === SocialAccountStatus.ACTIVE;
  }

  /**
   * Check if account is suspended
   */
  public isSuspended(): boolean {
    return this._status === SocialAccountStatus.SUSPENDED;
  }

  /**
   * Check if this is the primary account
   */
  public isPrimary(): boolean {
    return this._isPrimary;
  }

  /**
   * Check if account needs profile sync (older than 7 days)
   */
  public needsSync(): boolean {
    if (!this._lastSyncAt) return true;
    const daysSinceSync = (new Date().getTime() - this._lastSyncAt.getTime()) / (24 * 60 * 60 * 1000);
    return daysSinceSync > 7;
  }

  /**
   * Get display name for the provider
   */
  public getProviderDisplayName(): string {
    return PROVIDER_DISPLAY_NAMES[this._provider];
  }

  /**
   * Get days since linked
   */
  public getDaysSinceLinked(): number {
    const days = (new Date().getTime() - this._linkedAt.getTime()) / (24 * 60 * 60 * 1000);
    return Math.floor(days);
  }

  // ============================================================
  // Getters
  // ============================================================

  public getUserId(): string { return this._userId; }
  public getProvider(): SocialProvider { return this._provider; }
  public getProviderUserId(): string { return this._providerUserId; }
  public getProviderEmail(): Email | null { return this._providerEmail; }
  public getProviderPhone(): Phone | null { return this._providerPhone; }
  public getProviderName(): string | undefined { return this._providerName; }
  public getStatus(): SocialAccountStatus { return this._status; }
  public getLinkedAt(): Date { return new Date(this._linkedAt); }
  public getUnlinkedAt(): Date | undefined { return this._unlinkedAt ? new Date(this._unlinkedAt) : undefined; }
  public getSuspendedAt(): Date | undefined { return this._suspendedAt ? new Date(this._suspendedAt) : undefined; }
  public getSuspendedReason(): string | undefined { return this._suspendedReason; }
  public getProfilePictureUrl(): string | undefined { return this._profilePictureUrl; }
  public getProfileUrl(): string | undefined { return this._profileUrl; }
  public getLastSyncAt(): Date | undefined { return this._lastSyncAt ? new Date(this._lastSyncAt) : undefined; }
  public getUnlinkCount(): number { return this._unlinkCount; }
  public getMergedFrom(): string | undefined { return this._mergedFrom; }

  // ============================================================
  // JSON Serialization
  // ============================================================

  /**
   * Convert to JSON serializable object
   */
  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      userId: this._userId,
      provider: this._provider,
      providerDisplayName: this.getProviderDisplayName(),
      providerUserId: this._providerUserId,
      providerEmail: this._providerEmail?.getValue(),
      providerPhone: this._providerPhone?.getE164(),
      providerName: this._providerName,
      status: this._status,
      linkedAt: this._linkedAt.toISOString(),
      unlinkedAt: this._unlinkedAt?.toISOString(),
      suspendedAt: this._suspendedAt?.toISOString(),
      suspendedReason: this._suspendedReason,
      profilePictureUrl: this._profilePictureUrl,
      profileUrl: this._profileUrl,
      lastSyncAt: this._lastSyncAt?.toISOString(),
      isActive: this.isActive(),
      isLinked: this.isLinked(),
      isSuspended: this.isSuspended(),
      isPrimary: this._isPrimary,
      needsSync: this.needsSync(),
      daysSinceLinked: this.getDaysSinceLinked(),
      mergedFrom: this._mergedFrom,
      // ⚠️ Tokens are NOT included - they are stored in infrastructure
    };
  }
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Generate event ID (pure domain function)
 */
function generateEventId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  const counter = (generateEventId.counter = (generateEventId.counter || 0) + 1);
  return `evt_${timestamp}_${random}_${counter}`;
}

namespace generateEventId {
  export let counter = 0;
}

// ============================================================
// Type Exports
// ============================================================

export type { SocialAccountConfig };
