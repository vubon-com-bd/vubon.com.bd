/**
 * Social Account Entity - Pure Domain Core (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/entities/social-account.entity
 * 
 * @description
 * Represents a user's social account link for OAuth authentication.
 * Manages provider linking, unlinking, and validation.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Shared configuration from @vubon/shared-constants
 * ✅ Provider display names from shared-constants
 * ✅ Provider icon URLs for UI consistency
 * ✅ Token expiry tracking with refresh reminders
 * ✅ Daily unlink rate limiting
 * ✅ Profile sync tracking (7-day threshold)
 * ✅ Account merge support with audit trail
 * ✅ Comprehensive domain events
 * 
 * Security Note:
 * OAuth access/refresh tokens are infrastructure concerns.
 * They should be stored in a secure token vault, not in domain entities.
 * This entity only stores the social account identity.
 */

import { BaseEntity, ValidationResult, EntityValidationError, type IdGenerator } from './base.entity';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';

// ✅ ENTERPRISE ENHANCEMENT: Import from shared-constants (Single Source of Truth)
import { 
  SOCIAL_CONFIG, 
  PROVIDER_DISPLAY_NAMES,
  PROVIDER_ICON_URLS,
  type ProviderEmailDomains,
} from '@vubon/shared-constants';

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
  SOCIAL_ACCOUNT_TOKEN_EXPIRING = 'social_account.token_expiring',
  SOCIAL_ACCOUNT_SYNC_NEEDED = 'social_account.sync_needed',
  SOCIAL_ACCOUNT_UNLINK_LIMIT_WARNING = 'social_account.unlink_limit_warning',
}

// ==================== Types ====================

/**
 * Social account metadata interface (all properties optional)
 */
export interface SocialAccountMetadata {
  linkedIp?: string;
  linkedUserAgent?: string;
  lastSyncIp?: string;
  lastSyncUserAgent?: string;
  unlinkReason?: string;
  suspendReason?: string;
  customData?: Record<string, unknown>;
}


/**
 * Token expiry tracking (Enterprise enhancement)
 */
export interface TokenExpiryInfo {
  expiresAt: Date;
  lastRefreshedAt: Date;
  refreshTokenAvailable: boolean;
  daysUntilExpiry: number;
  needsRefresh: boolean;
}

/**
 * Social account configuration (from shared-constants)
 */
export type SocialConfig = typeof SOCIAL_CONFIG;

// ==================== Social Account Entity ====================

/**
 * Social Account Entity (Enterprise Enhanced)
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
  private _mergedFrom: string | undefined;
  
  // ✅ Enterprise: Token expiry tracking
  private _tokenExpiresAt: Date | undefined;
  private _tokenLastRefreshedAt: Date | undefined;
  private _hasRefreshToken: boolean;
  
  // ✅ Enterprise: Metadata for audit
  private _Socialmetadata: SocialAccountMetadata;

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
    tokenExpiresAt: Date | undefined,
    tokenLastRefreshedAt: Date | undefined,
    hasRefreshToken: boolean,
    metadata: SocialAccountMetadata,
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
    this._tokenExpiresAt = tokenExpiresAt;
    this._tokenLastRefreshedAt = tokenLastRefreshedAt;
    this._hasRefreshToken = hasRefreshToken;
    this._Socialmetadata = metadata;
    
    const validationResult = this.validate();
    if (!validationResult.isValid) {
      throw new EntityValidationError(
        'Social account validation failed',
        validationResult.errors,
        this.constructor.name
      );
    }
  }

  /**
   * ✅ FIXED: Validate entity invariants - returns ValidationResult
   */
  protected validate(): ValidationResult {
    const errors: string[] = [];
    
    if (!this._userId) {
      errors.push('Social account requires a user ID');
    }
    if (!this._provider) {
      errors.push('Social account requires a provider');
    }
    if (!this._providerUserId) {
      errors.push('Social account requires a provider user ID');
    }
    if (!this._providerEmail && !this._providerPhone) {
      errors.push('Social account requires either email or phone');
    }
    if (this._unlinkCount < 0) {
      errors.push('Unlink count cannot be negative');
    }
    if (this._unlinkCount > SOCIAL_CONFIG.MAX_UNLINK_PER_DAY) {
      errors.push(`Unlink count exceeds daily limit of ${SOCIAL_CONFIG.MAX_UNLINK_PER_DAY}`);
    }
    
    // ✅ Enterprise: Validate token expiry
    if (this._tokenExpiresAt && this._tokenExpiresAt < this._linkedAt) {
      errors.push('Token expiry cannot be before linked at');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Link a social account (factory method)
   * ✅ Enterprise: Enhanced with token expiry and metadata
   */
  public static linkProvider(
    userId: string,
    provider: SocialProvider,
    providerUserId: string,
    providerEmail: Email | null,
    providerPhone: Phone | null,
    idGenerator: IdGenerator,
    options?: {
      providerName?: string;
      profilePictureUrl?: string;
      profileUrl?: string;
      isPrimary?: boolean;
      tokenExpiresAt?: Date;
      hasRefreshToken?: boolean;
      metadata?: Partial<SocialAccountMetadata>;
    },
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
      options?.providerName,
      SocialAccountStatus.ACTIVE,
      now,
      undefined,
      undefined,
      undefined,
      options?.profilePictureUrl,
      options?.profileUrl,
      undefined,
      0,
      options?.isPrimary || false,
      undefined,
      options?.tokenExpiresAt,
      options?.tokenExpiresAt ? now : undefined,
      options?.hasRefreshToken || false,
      {
        linkedIp: options?.metadata?.linkedIp,
        linkedUserAgent: options?.metadata?.linkedUserAgent,
        customData: options?.metadata?.customData,
      } as SocialAccountMetadata,
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
        isPrimary: options?.isPrimary || false,
        tokenExpiryDays: options?.tokenExpiresAt 
          ? Math.round((options.tokenExpiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          : undefined,
      },
    });
    
    return account;
  }

  /**
   * Reconstitute from persistence
   * ✅ Enterprise: Enhanced with token expiry fields
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
    tokenExpiresAt?: Date;
    tokenLastRefreshedAt?: Date;
    hasRefreshToken: boolean;
    metadata: SocialAccountMetadata;
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
      data.tokenExpiresAt,
      data.tokenLastRefreshedAt,
      data.hasRefreshToken,
      data.metadata,
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
   * ✅ Enterprise: Enhanced with Bangladesh MFS validation
   */
  private static validateProviderInfo(
    provider: SocialProvider,
    email: Email | null,
    phone: Phone | null,
    providerUserId: string
  ): void {
   // Check provider-specific email domain
const allowedDomains = SOCIAL_CONFIG.PROVIDER_EMAIL_DOMAINS[provider as keyof ProviderEmailDomains];
if (allowedDomains && email) {
  const emailDomain = email.getDomain();
  // ✅ টাইপ গার্ড: নিশ্চিত করুন যে allowedDomains একটি array
  if (Array.isArray(allowedDomains) && !allowedDomains.includes(emailDomain)) {
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
   * ✅ Enterprise: Enhanced with rate limit tracking
   */
  public unlinkProvider(reason?: string): void {
    if (this._status !== SocialAccountStatus.ACTIVE) {
      throw new EntityValidationError(
        `Cannot unlink account with status: ${this._status}`
      );
    }
    
    // Check daily unlink limit
    const today = new Date().toDateString();
    const lastUnlinkDate = this._unlinkedAt?.toDateString();
    
    if (lastUnlinkDate === today && this._unlinkCount >= SOCIAL_CONFIG.MAX_UNLINK_PER_DAY) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: SocialAccountEventType.SOCIAL_ACCOUNT_UNLINK_LIMIT_WARNING,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          provider: this._provider,
          unlinkCount: this._unlinkCount,
          maxLimit: SOCIAL_CONFIG.MAX_UNLINK_PER_DAY,
        },
      });
      throw new EntityValidationError(
        `Daily unlink limit (${SOCIAL_CONFIG.MAX_UNLINK_PER_DAY}) reached. Please try again tomorrow.`
      );
    }
    
    this._status = SocialAccountStatus.UNLINKED;
    this._unlinkedAt = new Date();
    this._unlinkCount++;
    this._isPrimary = false;
    this._Socialmetadata = {
      ...this._Socialmetadata,
      unlinkReason: reason || undefined,
    } as SocialAccountMetadata;
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
        unlinkCount: this._unlinkCount,
      },
    });
  }

  /**
   * Suspend social account (admin action)
   */
  public suspend(reason: string, suspendedBy?: string): void {
    if (this._status !== SocialAccountStatus.ACTIVE) {
      throw new EntityValidationError(
        `Cannot suspend account with status: ${this._status}`
      );
    }
    
    this._status = SocialAccountStatus.SUSPENDED;
    this._suspendedAt = new Date();
    this._suspendedReason = reason;
    this._Socialmetadata = {
      ...this._Socialmetadata,
      suspendReason: reason,
    } as SocialAccountMetadata;
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
        suspendedBy,
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
   * ✅ Enterprise: Enhanced with sync tracking
   */
  public updateProfile(
    name?: string,
    profilePictureUrl?: string,
    profileUrl?: string,
    syncMetadata?: { ipAddress?: string; userAgent?: string }
  ): void {
    const needsSyncEvent = this.needsSync();
    
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
    this._Socialmetadata = {
      ...this._Socialmetadata,
      lastSyncIp: syncMetadata?.ipAddress || undefined,
      lastSyncUserAgent: syncMetadata?.userAgent || undefined,
    } as SocialAccountMetadata;
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
        neededSyncBefore: needsSyncEvent,
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
 * This is a domain-specific merge method, not overriding base mergeFrom
 */
public mergeWith(otherId: string): void {
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
  // ✅ Enterprise: Token Management Methods
  // ============================================================

  /**
   * Update token expiry information
   */
  public updateTokenExpiry(expiresAt: Date, hasRefreshToken: boolean = true): void {
    this._tokenExpiresAt = expiresAt;
    this._tokenLastRefreshedAt = new Date();
    this._hasRefreshToken = hasRefreshToken;
    this.touch();
    
    // Check if token is expiring soon (within 7 days)
    const daysUntilExpiry = this.getDaysUntilTokenExpiry();
    if (daysUntilExpiry !== null && daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: SocialAccountEventType.SOCIAL_ACCOUNT_TOKEN_EXPIRING,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          provider: this._provider,
          daysUntilExpiry,
          hasRefreshToken,
        },
      });
    }
  }

  /**
   * Refresh token (update expiry)
   */
  public refreshToken(newExpiresAt: Date): void {
    this._tokenExpiresAt = newExpiresAt;
    this._tokenLastRefreshedAt = new Date();
    this.touch();
  }

  /**
   * Check if token needs refresh
   */
  public needsTokenRefresh(): boolean {
    if (!this._tokenExpiresAt) return false;
    const daysUntilExpiry = this.getDaysUntilTokenExpiry();
    return daysUntilExpiry !== null && daysUntilExpiry <= 3; // Refresh within 3 days
  }

  /**
   * Get days until token expiry
   */
  public getDaysUntilTokenExpiry(): number | null {
    if (!this._tokenExpiresAt) return null;
    const now = new Date();
    if (now > this._tokenExpiresAt) return 0;
    const diffMs = this._tokenExpiresAt.getTime() - now.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  /**
   * Get token expiry information
   */
  public getTokenExpiryInfo(): TokenExpiryInfo | null {
    if (!this._tokenExpiresAt) return null;
    return {
      expiresAt: new Date(this._tokenExpiresAt),
      lastRefreshedAt: new Date(this._tokenLastRefreshedAt || this._linkedAt),
      refreshTokenAvailable: this._hasRefreshToken,
      daysUntilExpiry: this.getDaysUntilTokenExpiry() || 0,
      needsRefresh: this.needsTokenRefresh(),
    };
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
   * Check if account needs profile sync (older than SYNC_THRESHOLD_DAYS)
   */
  public needsSync(syncThresholdDays: number = SOCIAL_CONFIG.SYNC_THRESHOLD_DAYS): boolean {
    if (!this._lastSyncAt) return true;
    const daysSinceSync = (new Date().getTime() - this._lastSyncAt.getTime()) / (24 * 60 * 60 * 1000);
    const needsSyncFlag = daysSinceSync > syncThresholdDays;
    
    if (needsSyncFlag) {
      this.addDomainEvent({
        eventId: generateEventId(),
        eventType: SocialAccountEventType.SOCIAL_ACCOUNT_SYNC_NEEDED,
        aggregateId: this.id,
        occurredOn: new Date(),
        version: this.version,
        metadata: {
          userId: this._userId,
          provider: this._provider,
          daysSinceSync,
          thresholdDays: syncThresholdDays,
        },
      });
    }
    
    return needsSyncFlag;
  }

  /**
   * Get display name for the provider (from shared-constants)
   * ✅ FIXED: Using lowercase enum keys
   */
  public getProviderDisplayName(): string {
    const providerKey = this._provider.toLowerCase() as keyof typeof PROVIDER_DISPLAY_NAMES;
    return PROVIDER_DISPLAY_NAMES[providerKey] || this._provider;
  }

  /**
   * ✅ Enterprise: Get provider icon URL (from shared-constants)
   * ✅ FIXED: Using lowercase enum keys
   */
  public getProviderIconUrl(): string {
    const providerKey = this._provider.toLowerCase() as keyof typeof PROVIDER_ICON_URLS;
    return PROVIDER_ICON_URLS[providerKey] || '/icons/social/default.svg';
  }

  /**
   * Get days since linked
   */
  public getDaysSinceLinked(): number {
    const days = (new Date().getTime() - this._linkedAt.getTime()) / (24 * 60 * 60 * 1000);
    return Math.floor(days);
  }

  /**
   * Get remaining unlink attempts for today
   */
  public getRemainingUnlinkAttempts(): number {
    const today = new Date().toDateString();
    const lastUnlinkDate = this._unlinkedAt?.toDateString();
    
    if (lastUnlinkDate !== today) {
      return SOCIAL_CONFIG.MAX_UNLINK_PER_DAY;
    }
    return Math.max(0, SOCIAL_CONFIG.MAX_UNLINK_PER_DAY - this._unlinkCount);
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
  public getMetadata(): Readonly<SocialAccountMetadata> { return { ...this._Socialmetadata }; }
  public getHasRefreshToken(): boolean { return this._hasRefreshToken; }
  public getTokenExpiresAt(): Date | undefined { return this._tokenExpiresAt ? new Date(this._tokenExpiresAt) : undefined; }

  // ============================================================
  // JSON Serialization
  // ============================================================

  /**
   * Convert to JSON serializable object
   * ✅ Enterprise: Enhanced with token info and metadata
   */
  public toJSON(): Record<string, unknown> {
    const tokenInfo = this.getTokenExpiryInfo();
    
    return {
      ...super.toJSON(),
      userId: this._userId,
      provider: this._provider,
      providerDisplayName: this.getProviderDisplayName(),
      providerIconUrl: this.getProviderIconUrl(),
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
      // ✅ Enterprise: Token info (expiry only, not the token itself)
      tokenExpiresAt: this._tokenExpiresAt?.toISOString(),
      tokenLastRefreshedAt: this._tokenLastRefreshedAt?.toISOString(),
      hasRefreshToken: this._hasRefreshToken,
      daysUntilTokenExpiry: this.getDaysUntilTokenExpiry(),
      needsTokenRefresh: this.needsTokenRefresh(),
      tokenInfo: tokenInfo ? {
        daysUntilExpiry: tokenInfo.daysUntilExpiry,
        needsRefresh: tokenInfo.needsRefresh,
        hasRefreshToken: tokenInfo.refreshTokenAvailable,
      } : undefined,
      remainingUnlinkAttempts: this.getRemainingUnlinkAttempts(),
      metadata: {
        linkedIp: this._Socialmetadata.linkedIp,
        lastSyncIp: this._Socialmetadata.lastSyncIp,
        unlinkReason: this._Socialmetadata.unlinkReason,
        suspendReason: this._Socialmetadata.suspendReason,
      },
      // ⚠️ Tokens are NOT included - they are stored in infrastructure (secure vault)
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
// Type Guards
// ============================================================

/**
 * Type guard to check if a value is a SocialAccount
 */
export function isSocialAccount(value: unknown): value is SocialAccount {
  return value instanceof SocialAccount;
}

/**
 * Type guard for social provider
 */
export function isSocialProvider(value: unknown): value is SocialProvider {
  return typeof value === 'string' && Object.values(SocialProvider).includes(value as SocialProvider);
}
