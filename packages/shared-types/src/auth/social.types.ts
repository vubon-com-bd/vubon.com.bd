/**
 * Social Auth Types - Pure TypeScript type contracts for OAuth
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/auth/social.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO OAuth implementation, token exchange logic
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type {
  SOCIAL_PROVIDERS
} from '@vubon/shared-constants';

// ============================================================
// Social Provider Types (Based on constants - NO enums)
// ============================================================
export type SocialProvider = typeof SOCIAL_PROVIDERS[keyof typeof SOCIAL_PROVIDERS];

// Extended social providers for Bangladesh market
export type ExtendedSocialProvider = 
  | SocialProvider
  | 'whatsapp'
  | 'imo'
  | 'telegram'
  | 'viber'
  | 'instagram'
  | 'tiktok'
  | 'snapchat'
  | 'phone_otp'
  | 'whatsapp_otp'
  | 'imo_otp'
  | 'bkash'
  | 'nagad'
  | 'rocket';

// ============================================================
// Provider Category Types
// ============================================================
export type SocialProviderCategory = 
  | 'oauth'
  | 'otp_based'
  | 'mfs_auth'
  | 'social_media';

// ============================================================
// Social Account Entity (Core domain model)
// ============================================================
export interface SocialAccount {
  readonly id: string;
  readonly userId: string;
  readonly provider: ExtendedSocialProvider;
  readonly providerUserId: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly phoneNumber?: string;
  readonly phoneVerified?: boolean;
  readonly name: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly avatar: string | null;
  readonly locale?: string;
  readonly providerData: SocialProviderData;
  readonly connectedAt: Date;
  readonly lastUsedAt: Date | null;
  readonly disconnectedAt: Date | null;
  readonly isPrimary: boolean;
  readonly metadata: SocialAccountMetadata;
}

// ============================================================
// Social Account Metadata
// ============================================================
export interface SocialAccountMetadata {
  readonly lastSyncAt?: Date;
  readonly syncErrors?: number;
  readonly tokenExpiresAt?: Date;
  readonly refreshToken?: string;
  readonly scopesGranted?: readonly string[];
  readonly ipAddressConnected?: string;
  readonly userAgentConnected?: string;
}

// ============================================================
// Provider-Specific Data (Discriminated union)
// ============================================================
export type SocialProviderData = 
  | GoogleProviderData
  | GitHubProviderData
  | FacebookProviderData
  | AppleProviderData
  | TwitterProviderData
  | LinkedInProviderData
  | MicrosoftProviderData
  | InstagramProviderData
  | TikTokProviderData
  | WhatsAppProviderData
  | ImoProviderData
  | TelegramProviderData
  | MFSProviderData;

// International Providers
export interface GoogleProviderData {
  readonly provider: 'google';
  readonly sub: string;
  readonly emailVerified: boolean;
  readonly givenName: string;
  readonly familyName: string;
  readonly locale: string;
  readonly picture?: string;
  readonly hd?: string;
}

export interface GitHubProviderData {
  readonly provider: 'github';
  readonly login: string;
  readonly bio: string | null;
  readonly company: string | null;
  readonly location: string | null;
  readonly publicRepos: number;
  readonly followers: number;
  readonly following: number;
  readonly createdAt: string;
}

export interface FacebookProviderData {
  readonly provider: 'facebook';
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly birthday?: string;
  readonly gender?: string;
  readonly location?: string;
  readonly timezone?: number;
  readonly verified: boolean;
}

export interface AppleProviderData {
  readonly provider: 'apple';
  readonly sub: string;
  readonly emailVerified: boolean;
  readonly isPrivateEmail: boolean;
  readonly realUserStatus: number;
  readonly name?: string;
}

export interface TwitterProviderData {
  readonly provider: 'twitter';
  readonly id: string;
  readonly screenName: string;
  readonly name: string;
  readonly followersCount: number;
  readonly friendsCount: number;
  readonly verified: boolean;
  readonly location?: string;
}

export interface LinkedInProviderData {
  readonly provider: 'linkedin';
  readonly id: string;
  readonly localizedFirstName: string;
  readonly localizedLastName: string;
  readonly headline: string | null;
  readonly vanityName: string;
  readonly profilePicture?: string;
}

export interface MicrosoftProviderData {
  readonly provider: 'microsoft';
  readonly id: string;
  readonly displayName: string;
  readonly givenName: string;
  readonly surname: string;
  readonly userPrincipalName: string;
  readonly mail?: string;
}

export interface InstagramProviderData {
  readonly provider: 'instagram';
  readonly id: string;
  readonly username: string;
  readonly accountType: 'personal' | 'business' | 'creator';
  readonly followersCount: number;
  readonly followingCount: number;
  readonly mediaCount: number;
}

export interface TikTokProviderData {
  readonly provider: 'tiktok';
  readonly openId: string;
  readonly unionId: string;
  readonly displayName: string;
  readonly avatarUrl: string;
  readonly bioDescription: string;
  readonly followerCount: number;
  readonly followingCount: number;
  readonly likeCount: number;
}

// Bangladesh Specific Providers
export interface WhatsAppProviderData {
  readonly provider: 'whatsapp';
  readonly phoneNumber: string;
  readonly verified: boolean;
  readonly businessAccount: boolean;
  readonly displayName: string;
}

export interface ImoProviderData {
  readonly provider: 'imo';
  readonly userId: string;
  readonly phoneNumber: string;
  readonly verified: boolean;
  readonly displayName: string;
}

export interface TelegramProviderData {
  readonly provider: 'telegram';
  readonly id: number;
  readonly firstName: string;
  readonly lastName?: string;
  readonly username?: string;
  readonly phoneNumber?: string;
  readonly photoUrl?: string;
}

export interface MFSProviderData {
  readonly provider: 'bkash' | 'nagad' | 'rocket';
  readonly accountNumber: string;
  readonly maskedAccountNumber: string;
  readonly verified: boolean;
  readonly verifiedAt: Date;
  readonly accountType: 'personal' | 'merchant';
  readonly accountHolderName: string;
}

// ============================================================
// OAuth Authorization Request/Response
// ============================================================
export interface OAuthAuthorizationRequest {
  readonly provider: ExtendedSocialProvider;
  readonly redirectUri: string;
  readonly state: string;
  readonly scopes?: readonly string[];
  readonly codeChallenge?: string;
  readonly codeChallengeMethod?: 'S256' | 'plain';
}

export interface OAuthAuthorizationResponse {
  readonly url: string;
  readonly state: string;
  readonly codeVerifier?: string;
}

// ============================================================
// OAuth Callback Request/Response
// ============================================================
export interface OAuthCallbackRequest {
  readonly provider: ExtendedSocialProvider;
  readonly code: string;
  readonly state: string;
  readonly codeVerifier?: string;
  readonly error?: string;
  readonly errorDescription?: string;
}

export interface OAuthCallbackResponse {
  readonly success: boolean;
  readonly user?: SocialUserInfo;
  readonly existingUser?: {
    readonly userId: string;
    readonly email: string;
    readonly isLinked: boolean;
  };
  readonly isNewUser: boolean;
  readonly isNewConnection: boolean;
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly expiresIn?: number;
  readonly requiresEmailVerification?: boolean;
  readonly requiresPhoneVerification?: boolean;
}

// ============================================================
// Social User Info (Normalized from provider)
// ============================================================
export interface SocialUserInfo {
  readonly email: string;
  readonly emailVerified: boolean;
  readonly phoneNumber?: string;
  readonly phoneVerified?: boolean;
  readonly name: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly avatar?: string;
  readonly provider: ExtendedSocialProvider;
  readonly providerUserId: string;
  readonly locale?: string;
  readonly rawData: Record<string, unknown>;
}

// ============================================================
// Connect Social Account Request
// ============================================================
export interface ConnectSocialAccountRequest {
  readonly userId: string;
  readonly provider: ExtendedSocialProvider;
  readonly code: string;
  readonly redirectUri?: string;
  readonly makePrimary?: boolean;
  readonly metadata?: Record<string, unknown>;
}

export interface ConnectSocialAccountResponse {
  readonly success: boolean;
  readonly socialAccount: SocialAccountDTO;
  readonly message?: string;
}

// ============================================================
// Disconnect Social Account Request
// ============================================================
export interface DisconnectSocialAccountRequest {
  readonly userId: string;
  readonly provider: ExtendedSocialProvider;
  readonly reason?: string;
  readonly keepData?: boolean;
}

export interface DisconnectSocialAccountResponse {
  readonly success: boolean;
  readonly message: string;
  readonly hadPrimaryRole: boolean;
  readonly newPrimaryProvider?: ExtendedSocialProvider;
}

// ============================================================
// Social Account DTO (API Response)
// ============================================================
export interface SocialAccountDTO {
  readonly id: string;
  readonly provider: ExtendedSocialProvider;
  readonly providerDisplayName: string;
  readonly email: string;
  readonly name: string;
  readonly avatar: string | null;
  readonly connectedAt: string;
  readonly lastUsedAt: string | null;
  readonly isPrimary: boolean;
  readonly iconName: string;
  readonly color: string;
}

// ============================================================
// OAuth Provider Configuration
// ============================================================
export interface OAuthProviderConfig {
  readonly provider: ExtendedSocialProvider;
  readonly providerCategory: SocialProviderCategory;
  readonly clientId: string;
  readonly clientSecret?: string;
  readonly authUrl: string;
  readonly tokenUrl: string;
  readonly userInfoUrl: string;
  readonly revokeUrl?: string;
  readonly scopes: readonly string[];
  readonly isEnabled: boolean;
  readonly isDevelopment: boolean;
  readonly redirectUri: string;
  readonly responseType: 'code' | 'token';
  readonly grantType: 'authorization_code' | 'client_credentials';
  readonly pkceRequired: boolean;
  readonly stateRequired: boolean;
}

// ============================================================
// OAuth State Data (Stored temporarily)
// ============================================================
export interface OAuthStateData {
  readonly state: string;
  readonly provider: ExtendedSocialProvider;
  readonly redirectUri: string;
  readonly userId?: string;
  readonly action: 'login' | 'connect' | 'disconnect';
  readonly codeVerifier?: string;
  readonly createdAt: Date;
  readonly expiresAt: Date;
  readonly ipAddress: string;
  readonly userAgent: string;
}

// ============================================================
// Social Login Options
// ============================================================
export interface SocialLoginOptions {
  readonly provider: ExtendedSocialProvider;
  readonly redirectUri?: string;
  readonly scopes?: readonly string[];
  readonly autoCreateUser?: boolean;
  readonly linkExistingUser?: boolean;
  readonly returnUserInfo?: boolean;
}

// ============================================================
// Social Account Link Request (Merge accounts)
// ============================================================
export interface LinkSocialAccountsRequest {
  readonly userId: string;
  readonly sourceProvider: ExtendedSocialProvider;
  readonly targetProvider: ExtendedSocialProvider;
  readonly confirmed: boolean;
}

export interface LinkSocialAccountsResponse {
  readonly success: boolean;
  readonly primaryAccount: SocialAccountDTO;
  readonly mergedAccounts: readonly SocialAccountDTO[];
  readonly message: string;
}

// ============================================================
// Social Account Statistics (For admin)
// ============================================================
export interface SocialAuthStatistics {
  readonly totalConnections: number;
  readonly uniqueUsersWithSocial: number;
  readonly connectionsByProvider: Record<ExtendedSocialProvider, number>;
  readonly newConnectionsLastWeek: number;
  readonly newConnectionsLastMonth: number;
  
  readonly loginSuccessRate: Record<ExtendedSocialProvider, number>;
  readonly loginAttemptsByProvider: Record<ExtendedSocialProvider, number>;
  
  readonly topConnectingCountries: Array<{
    readonly country: string;
    readonly count: number;
  }>;
  
  readonly mfsConnections: number;
  readonly whatsappConnections: number;
  readonly imoConnections: number;
}

// ============================================================
// Social Account Filter Options
// ============================================================
export interface SocialAccountFilterOptions {
  readonly userId?: string;
  readonly provider?: ExtendedSocialProvider;
  readonly email?: string;
  readonly isPrimary?: boolean;
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: 'connectedAt' | 'lastUsedAt' | 'provider';
  readonly sortOrder?: 'asc' | 'desc';
}

// ============================================================
// Social Auth Events (For audit)
// ============================================================
export type SocialAuthEventType = 
  | 'social.login.success'
  | 'social.login.failed'
  | 'social.account.connected'
  | 'social.account.disconnected'
  | 'social.account.linked'
  | 'social.account.unlinked'
  | 'social.account.set_primary'
  | 'social.token.refreshed'
  | 'social.token.expired'
  | 'social.provider.disabled';

export interface SocialAuthEvent {
  readonly id: string;
  readonly eventType: SocialAuthEventType;
  readonly userId?: string;
  readonly provider: ExtendedSocialProvider;
  readonly timestamp: Date;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// OTP Verification for Social Login (Bangladesh specific)
// ============================================================
export interface SocialOTPRequest {
  readonly phoneNumber: string;
  readonly provider: 'whatsapp' | 'imo' | 'phone_otp';
  readonly method: 'sms' | 'whatsapp' | 'imo';
  readonly locale?: 'en' | 'bn';
}

export interface SocialOTPResponse {
  readonly success: boolean;
  readonly otpSent: boolean;
  readonly expiresAt: Date;
  readonly remainingAttempts: number;
  readonly resendCooldownSeconds: number;
}

export interface SocialOTPVerificationRequest {
  readonly phoneNumber: string;
  readonly provider: ExtendedSocialProvider;
  readonly otpCode: string;
  readonly sessionId?: string;
}

// ============================================================
// MFS Auth Request (bKash/Nagad/Rocket - Bangladesh specific)
// ============================================================
export interface MFSAuthRequest {
  readonly provider: 'bkash' | 'nagad' | 'rocket';
  readonly accountNumber: string;
  readonly pin?: string;
  readonly otpCode?: string;
  readonly callbackUrl?: string;
}

export interface MFSAuthResponse {
  readonly success: boolean;
  readonly authenticated: boolean;
  readonly requiresOTP: boolean;
  readonly requiresPin: boolean;
  readonly sessionId?: string;
  readonly userInfo?: SocialUserInfo;
  readonly errorMessage?: string;
}

// ============================================================
// Social Provider Priority (For UI display order - Bangladesh optimized)
// ============================================================
export interface SocialProviderPriority {
  readonly provider: ExtendedSocialProvider;
  readonly priority: number;
  readonly isVisible: boolean;
  readonly defaultEnabled: boolean;
}

// ============================================================
// Social Login Button Configuration (For UI)
// ============================================================
export interface SocialLoginButtonConfig {
  readonly provider: ExtendedSocialProvider;
  readonly displayName: string;
  readonly displayNameBn?: string;
  readonly iconName: string;
  readonly color: string;
  readonly priority: number;
  readonly isEnabled: boolean;
  readonly category: SocialProviderCategory;
}
