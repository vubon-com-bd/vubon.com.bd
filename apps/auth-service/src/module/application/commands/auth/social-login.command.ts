/**
 * Social Login Command - Pure Command Data Structure
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/social-login.command
 * 
 * @description
 * Command for authenticating a user via social providers (OAuth).
 * Supports international providers and Bangladesh-specific providers.
 * Contains device context for security audit.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ No validation (handled by handler)
 * ✅ Framework-free
 * ✅ Bangladesh specific - Phone-based social login support
 */

import { randomUUID } from 'crypto';

// ============================================================
// Social Provider Enum (including Bangladesh-specific)
// ============================================================

export enum SocialProvider {
  // International providers
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  APPLE = 'APPLE',
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
  MICROSOFT = 'MICROSOFT',
  INSTAGRAM = 'INSTAGRAM',
  
  // Bangladesh-specific providers (Messaging)
  WHATSAPP = 'WHATSAPP',
  IMO = 'IMO',
  TELEGRAM = 'TELEGRAM',
  VIBER = 'VIBER',
  
  // Bangladesh-specific providers (Mobile Financial Services)
  BKASH = 'BKASH',
  NAGAD = 'NAGAD',
  ROCKET = 'ROCKET',
}

// ============================================================
// Device Information Interface
// ============================================================

export interface DeviceInfo {
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  // Bangladesh specific
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  district?: string;
  upazila?: string;
}

// ============================================================
// OAuth Provider Info
// ============================================================

export interface OAuthProviderInfo {
  provider: SocialProvider;
  displayName: string;
  displayNameBn?: string;
  authUrl: string;
  tokenUrl: string;
  userInfoUrl: string;
  scopes: string[];
  isActive: boolean;
  isBangladeshSpecific: boolean;
  requiresPhone?: boolean;
  requiresPin?: boolean;
}

// ============================================================
// Social Login Command
// ============================================================

export class SocialLoginCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Social provider name */
    public readonly provider: SocialProvider,
    /** OAuth access token from provider */
    public readonly accessToken: string,
    /** Device context for security audit */
    public readonly deviceInfo?: DeviceInfo,
    /** Remember me for extended session */
    public readonly rememberMe?: boolean,
    /** OAuth state parameter for CSRF protection */
    public readonly state?: string,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string,
    /** Phone number for WhatsApp/Imo (Bangladesh specific) */
    public readonly phoneNumber?: string,
    /** OTP code for WhatsApp/Imo (Bangladesh specific) */
    public readonly otpCode?: string,
    /** PIN for bKash/Nagad/Rocket (Bangladesh specific) */
    public readonly pin?: string,
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.rememberMe = rememberMe ?? false;
  }
  
  /**
   * Check if this is a Bangladesh-specific provider
   */
  public isBangladeshProvider(): boolean {
    const bangladeshProviders = [
      SocialProvider.WHATSAPP,
      SocialProvider.IMO,
      SocialProvider.TELEGRAM,
      SocialProvider.VIBER,
      SocialProvider.BKASH,
      SocialProvider.NAGAD,
      SocialProvider.ROCKET,
    ];
    return bangladeshProviders.includes(this.provider);
  }
  
  /**
   * Check if this is a messaging provider (WhatsApp, Imo, Telegram)
   */
  public isMessagingProvider(): boolean {
    const messagingProviders = [
      SocialProvider.WHATSAPP,
      SocialProvider.IMO,
      SocialProvider.TELEGRAM,
      SocialProvider.VIBER,
    ];
    return messagingProviders.includes(this.provider);
  }
  
  /**
   * Check if this is an MFS provider (bKash, Nagad, Rocket)
   */
  public isMFSProvider(): boolean {
    const mfsProviders = [
      SocialProvider.BKASH,
      SocialProvider.NAGAD,
      SocialProvider.ROCKET,
    ];
    return mfsProviders.includes(this.provider);
  }
  
  /**
   * Check if this is an international provider
   */
  public isInternationalProvider(): boolean {
    return !this.isBangladeshProvider();
  }
  
  /**
   * Get IP address for audit
   */
  public getIpAddress(): string | undefined {
    return this.deviceInfo?.ipAddress;
  }
  
  /**
   * Get user agent for device fingerprinting
   */
  public getUserAgent(): string | undefined {
    return this.deviceInfo?.userAgent;
  }
  
  /**
   * Get device ID for tracking
   */
  public getDeviceId(): string | undefined {
    return this.deviceInfo?.deviceId;
  }
  
  /**
   * Get mobile operator (Bangladesh specific)
   */
  public getMobileOperator(): string | undefined {
    return this.deviceInfo?.mobileOperator;
  }
  
  /**
   * Get network type (Bangladesh specific)
   */
  public getNetworkType(): string | undefined {
    return this.deviceInfo?.networkType;
  }
  
  /**
   * Get district (Bangladesh specific)
   */
  public getDistrict(): string | undefined {
    return this.deviceInfo?.district;
  }
  
  /**
   * Get upazila (Bangladesh specific)
   */
  public getUpazila(): string | undefined {
    return this.deviceInfo?.upazila;
  }
  
  /**
   * Check if state parameter is provided (for CSRF)
   */
  public hasState(): boolean {
    return !!this.state;
  }
  
  /**
   * Check if phone number is provided (for WhatsApp/Imo)
   */
  public hasPhoneNumber(): boolean {
    return !!this.phoneNumber;
  }
  
  /**
   * Check if OTP code is provided (for WhatsApp/Imo)
   */
  public hasOtpCode(): boolean {
    return !!this.otpCode;
  }
  
  /**
   * Check if PIN is provided (for MFS providers)
   */
  public hasPin(): boolean {
    return !!this.pin;
  }
  
  /**
   * Check if this is a complete OAuth flow (with token)
   */
  public isOAuthFlow(): boolean {
    return !this.isMessagingProvider() && !this.isMFSProvider();
  }
  
  /**
   * Get provider display name
   */
  public getProviderDisplayName(): string {
    const displayNames: Record<SocialProvider, string> = {
      [SocialProvider.GOOGLE]: 'Google',
      [SocialProvider.FACEBOOK]: 'Facebook',
      [SocialProvider.GITHUB]: 'GitHub',
      [SocialProvider.APPLE]: 'Apple',
      [SocialProvider.TWITTER]: 'Twitter',
      [SocialProvider.LINKEDIN]: 'LinkedIn',
      [SocialProvider.MICROSOFT]: 'Microsoft',
      [SocialProvider.INSTAGRAM]: 'Instagram',
      [SocialProvider.WHATSAPP]: 'WhatsApp',
      [SocialProvider.IMO]: 'Imo',
      [SocialProvider.TELEGRAM]: 'Telegram',
      [SocialProvider.VIBER]: 'Viber',
      [SocialProvider.BKASH]: 'bKash',
      [SocialProvider.NAGAD]: 'Nagad',
      [SocialProvider.ROCKET]: 'Rocket',
    };
    return displayNames[this.provider] || this.provider;
  }
  
  /**
   * Get provider display name in Bengali
   */
  public getProviderDisplayNameBn(): string {
    const displayNamesBn: Record<SocialProvider, string> = {
      [SocialProvider.GOOGLE]: 'গুগল',
      [SocialProvider.FACEBOOK]: 'ফেসবুক',
      [SocialProvider.GITHUB]: 'গিটহাব',
      [SocialProvider.APPLE]: 'অ্যাপল',
      [SocialProvider.TWITTER]: 'টুইটার',
      [SocialProvider.LINKEDIN]: 'লিংকডইন',
      [SocialProvider.MICROSOFT]: 'মাইক্রোসফট',
      [SocialProvider.INSTAGRAM]: 'ইনস্টাগ্রাম',
      [SocialProvider.WHATSAPP]: 'হোয়াটসঅ্যাপ',
      [SocialProvider.IMO]: 'আইএমও',
      [SocialProvider.TELEGRAM]: 'টেলিগ্রাম',
      [SocialProvider.VIBER]: 'ভাইবার',
      [SocialProvider.BKASH]: 'বিকাশ',
      [SocialProvider.NAGAD]: 'নগদ',
      [SocialProvider.ROCKET]: 'রকেট',
    };
    return displayNamesBn[this.provider] || this.provider;
  }
  
  /**
   * Get required scopes for the provider
   */
  public getRequiredScopes(): string[] {
    const scopes: Record<SocialProvider, string[]> = {
      [SocialProvider.GOOGLE]: ['openid', 'email', 'profile'],
      [SocialProvider.FACEBOOK]: ['email', 'public_profile'],
      [SocialProvider.GITHUB]: ['read:user', 'user:email'],
      [SocialProvider.APPLE]: ['name', 'email'],
      [SocialProvider.TWITTER]: ['users.read', 'tweet.read'],
      [SocialProvider.LINKEDIN]: ['openid', 'profile', 'email'],
      [SocialProvider.MICROSOFT]: ['openid', 'email', 'profile', 'User.Read'],
      [SocialProvider.INSTAGRAM]: ['user_profile', 'user_email'],
      [SocialProvider.WHATSAPP]: [],
      [SocialProvider.IMO]: [],
      [SocialProvider.TELEGRAM]: [],
      [SocialProvider.VIBER]: [],
      [SocialProvider.BKASH]: [],
      [SocialProvider.NAGAD]: [],
      [SocialProvider.ROCKET]: [],
    };
    return scopes[this.provider] || [];
  }
  
  /**
   * Get OAuth authorization URL for the provider
   */
  public getOAuthUrl(redirectUri: string, state: string): string {
    const urls: Record<SocialProvider, string> = {
      [SocialProvider.GOOGLE]: 'https://accounts.google.com/o/oauth2/v2/auth',
      [SocialProvider.FACEBOOK]: 'https://www.facebook.com/v18.0/dialog/oauth',
      [SocialProvider.GITHUB]: 'https://github.com/login/oauth/authorize',
      [SocialProvider.APPLE]: 'https://appleid.apple.com/auth/authorize',
      [SocialProvider.TWITTER]: 'https://twitter.com/i/oauth2/authorize',
      [SocialProvider.LINKEDIN]: 'https://www.linkedin.com/oauth/v2/authorization',
      [SocialProvider.MICROSOFT]: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      [SocialProvider.INSTAGRAM]: 'https://api.instagram.com/oauth/authorize',
      [SocialProvider.WHATSAPP]: '',
      [SocialProvider.IMO]: '',
      [SocialProvider.TELEGRAM]: '',
      [SocialProvider.VIBER]: '',
      [SocialProvider.BKASH]: '',
      [SocialProvider.NAGAD]: '',
      [SocialProvider.ROCKET]: '',
    };
    
    const baseUrl = urls[this.provider];
    if (!baseUrl) return '';
    
    const params = new URLSearchParams({
      client_id: process.env[`${this.provider}_CLIENT_ID`] || '',
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: this.getRequiredScopes().join(' '),
      state,
    });
    
    // Add provider-specific params
    if (this.provider === SocialProvider.GOOGLE) {
      params.append('access_type', 'offline');
      params.append('prompt', 'select_account');
    }
    
    if (this.provider === SocialProvider.APPLE) {
      params.append('response_mode', 'form_post');
    }
    
    return `${baseUrl}?${params.toString()}`;
  }
  
  /**
   * Get provider icon name for UI
   */
  public getIconName(): string {
    const icons: Record<SocialProvider, string> = {
      [SocialProvider.GOOGLE]: 'google',
      [SocialProvider.FACEBOOK]: 'facebook',
      [SocialProvider.GITHUB]: 'github',
      [SocialProvider.APPLE]: 'apple',
      [SocialProvider.TWITTER]: 'twitter',
      [SocialProvider.LINKEDIN]: 'linkedin',
      [SocialProvider.MICROSOFT]: 'microsoft',
      [SocialProvider.INSTAGRAM]: 'instagram',
      [SocialProvider.WHATSAPP]: 'whatsapp',
      [SocialProvider.IMO]: 'imo',
      [SocialProvider.TELEGRAM]: 'telegram',
      [SocialProvider.VIBER]: 'viber',
      [SocialProvider.BKASH]: 'bkash',
      [SocialProvider.NAGAD]: 'nagad',
      [SocialProvider.ROCKET]: 'rocket',
    };
    return icons[this.provider] || 'link';
  }
  
  /**
   * Get provider color for UI
   */
  public getColor(): string {
    const colors: Record<SocialProvider, string> = {
      [SocialProvider.GOOGLE]: '#4285F4',
      [SocialProvider.FACEBOOK]: '#1877F2',
      [SocialProvider.GITHUB]: '#333333',
      [SocialProvider.APPLE]: '#000000',
      [SocialProvider.TWITTER]: '#1DA1F2',
      [SocialProvider.LINKEDIN]: '#0077B5',
      [SocialProvider.MICROSOFT]: '#00A4EF',
      [SocialProvider.INSTAGRAM]: '#E4405F',
      [SocialProvider.WHATSAPP]: '#25D366',
      [SocialProvider.IMO]: '#6DA9F2',
      [SocialProvider.TELEGRAM]: '#26A5E4',
      [SocialProvider.VIBER]: '#7360F2',
      [SocialProvider.BKASH]: '#E2136E',
      [SocialProvider.NAGAD]: '#F26B21',
      [SocialProvider.ROCKET]: '#1E88E5',
    };
    return colors[this.provider] || '#888888';
  }
  
  /**
   * Get command summary for logging
   */
  public getSummary(): string {
    return `SocialLoginCommand(provider=${this.provider}, userId=${this.deviceInfo?.deviceId || 'unknown'}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { DeviceInfo as DeviceInfoType, OAuthProviderInfo as OAuthProviderInfoType };
