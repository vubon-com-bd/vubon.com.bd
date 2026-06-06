/**
 * Social Auth Constants - Pure immutable OAuth configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/social.constants
 * 
 * RULES:
 * ✅ NO OAuth implementation, token exchange logic
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ ONLY pure readonly constants
 */

// ============================================================
// Social Provider Configurations (Extended for Bangladesh)
// ============================================================
export const SOCIAL_PROVIDERS = {
  // International providers
  GOOGLE: 'google',
  GITHUB: 'github',
  FACEBOOK: 'facebook',
  APPLE: 'apple',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  MICROSOFT: 'microsoft',
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  SNAPCHAT: 'snapchat',
  
  // Bangladesh specific (Most popular)
  WHATSAPP: 'whatsapp',
  IMO: 'imo',
  TELEGRAM: 'telegram',
  VIBER: 'viber',
  
  // Mobile number based (Bangladesh specific)
  PHONE_OTP: 'phone_otp',          // Login with phone number via OTP
  WHATSAPP_OTP: 'whatsapp_otp',    // OTP via WhatsApp
  IMO_OTP: 'imo_otp',              // OTP via Imo (Bangladesh specific)
  
  // Bangladesh mobile financial services as auth
  BKASH: 'bkash',                  // Login with bKash
  NAGAD: 'nagad',                  // Login with Nagad
  ROCKET: 'rocket',                // Login with Rocket
} as const;

export type SocialProvider = typeof SOCIAL_PROVIDERS[keyof typeof SOCIAL_PROVIDERS];

// ============================================================
// Provider Categories
// ============================================================
export const SOCIAL_PROVIDER_CATEGORIES = {
  OAUTH: 'oauth',                   // Standard OAuth providers
  OTP_BASED: 'otp_based',           // OTP based login (WhatsApp, Imo, Phone)
  MFS_AUTH: 'mfs_auth',             // Mobile Financial Services as auth
  SOCIAL_MEDIA: 'social_media',     // Social media platforms
} as const;

export type SocialProviderCategory = typeof SOCIAL_PROVIDER_CATEGORIES[keyof typeof SOCIAL_PROVIDER_CATEGORIES];

// ============================================================
// Provider to Category Mapping
// ============================================================
export const PROVIDER_TO_CATEGORY = {
  [SOCIAL_PROVIDERS.GOOGLE]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
  [SOCIAL_PROVIDERS.GITHUB]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
  [SOCIAL_PROVIDERS.FACEBOOK]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
  [SOCIAL_PROVIDERS.APPLE]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
  [SOCIAL_PROVIDERS.TWITTER]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
  [SOCIAL_PROVIDERS.LINKEDIN]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
  [SOCIAL_PROVIDERS.MICROSOFT]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
  [SOCIAL_PROVIDERS.INSTAGRAM]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
  [SOCIAL_PROVIDERS.TIKTOK]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
  [SOCIAL_PROVIDERS.SNAPCHAT]: SOCIAL_PROVIDER_CATEGORIES.OAUTH,
  [SOCIAL_PROVIDERS.WHATSAPP]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
  [SOCIAL_PROVIDERS.IMO]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
  [SOCIAL_PROVIDERS.TELEGRAM]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
  [SOCIAL_PROVIDERS.VIBER]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
  [SOCIAL_PROVIDERS.PHONE_OTP]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
  [SOCIAL_PROVIDERS.IMO_OTP]: SOCIAL_PROVIDER_CATEGORIES.OTP_BASED,
  [SOCIAL_PROVIDERS.BKASH]: SOCIAL_PROVIDER_CATEGORIES.MFS_AUTH,
  [SOCIAL_PROVIDERS.NAGAD]: SOCIAL_PROVIDER_CATEGORIES.MFS_AUTH,
  [SOCIAL_PROVIDERS.ROCKET]: SOCIAL_PROVIDER_CATEGORIES.MFS_AUTH,
} as const;

export type ProviderToCategory = typeof PROVIDER_TO_CATEGORY;

// ============================================================
// OAuth Scopes by Provider (Enhanced)
// ============================================================
export const OAUTH_SCOPES = {
  [SOCIAL_PROVIDERS.GOOGLE]: [
    'email',
    'profile',
    'openid',
  ],
  [SOCIAL_PROVIDERS.GITHUB]: [
    'read:user',
    'user:email',
  ],
  [SOCIAL_PROVIDERS.FACEBOOK]: [
    'email',
    'public_profile',
    'user_birthday',
    'user_gender',
  ],
  [SOCIAL_PROVIDERS.APPLE]: [
    'email',
    'name',
  ],
  [SOCIAL_PROVIDERS.TWITTER]: [
    'users.read',
    'tweet.read',
  ],
  [SOCIAL_PROVIDERS.LINKEDIN]: [
    'r_emailaddress',
    'r_liteprofile',
  ],
  [SOCIAL_PROVIDERS.MICROSOFT]: [
    'openid',
    'email',
    'profile',
    'User.Read',
  ],
  [SOCIAL_PROVIDERS.INSTAGRAM]: [
    'user_profile',
    'user_email',
  ],
  [SOCIAL_PROVIDERS.TIKTOK]: [
    'user.info.basic',
    'user.info.email',
  ],
  [SOCIAL_PROVIDERS.SNAPCHAT]: [
    'user.display_name',
    'user.email',
  ],
} as const;

export type OAuthScopes = typeof OAUTH_SCOPES;

// ============================================================
// Social Callback Routes
// ============================================================
export const SOCIAL_CALLBACK_ROUTES = {
  [SOCIAL_PROVIDERS.GOOGLE]: '/auth/google/callback',
  [SOCIAL_PROVIDERS.GITHUB]: '/auth/github/callback',
  [SOCIAL_PROVIDERS.FACEBOOK]: '/auth/facebook/callback',
  [SOCIAL_PROVIDERS.APPLE]: '/auth/apple/callback',
  [SOCIAL_PROVIDERS.TWITTER]: '/auth/twitter/callback',
  [SOCIAL_PROVIDERS.LINKEDIN]: '/auth/linkedin/callback',
  [SOCIAL_PROVIDERS.MICROSOFT]: '/auth/microsoft/callback',
  [SOCIAL_PROVIDERS.INSTAGRAM]: '/auth/instagram/callback',
  [SOCIAL_PROVIDERS.TIKTOK]: '/auth/tiktok/callback',
  [SOCIAL_PROVIDERS.SNAPCHAT]: '/auth/snapchat/callback',
  
  // OTP based providers (no callback - verification endpoints)
  [SOCIAL_PROVIDERS.WHATSAPP]: '/auth/whatsapp/verify',
  [SOCIAL_PROVIDERS.IMO]: '/auth/imo/verify',
  [SOCIAL_PROVIDERS.TELEGRAM]: '/auth/telegram/verify',
  [SOCIAL_PROVIDERS.VIBER]: '/auth/viber/verify',
  [SOCIAL_PROVIDERS.PHONE_OTP]: '/auth/phone/verify',
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: '/auth/whatsapp-otp/verify',
  [SOCIAL_PROVIDERS.IMO_OTP]: '/auth/imo-otp/verify',
  
  // MFS auth callbacks
  [SOCIAL_PROVIDERS.BKASH]: '/auth/bkash/callback',
  [SOCIAL_PROVIDERS.NAGAD]: '/auth/nagad/callback',
  [SOCIAL_PROVIDERS.ROCKET]: '/auth/rocket/callback',
} as const;

export type SocialCallbackRoutes = typeof SOCIAL_CALLBACK_ROUTES;

// ============================================================
// Social Button Display Names (English)
// ============================================================
export const SOCIAL_DISPLAY_NAMES = {
  [SOCIAL_PROVIDERS.GOOGLE]: 'Google',
  [SOCIAL_PROVIDERS.GITHUB]: 'GitHub',
  [SOCIAL_PROVIDERS.FACEBOOK]: 'Facebook',
  [SOCIAL_PROVIDERS.APPLE]: 'Apple',
  [SOCIAL_PROVIDERS.TWITTER]: 'Twitter',
  [SOCIAL_PROVIDERS.LINKEDIN]: 'LinkedIn',
  [SOCIAL_PROVIDERS.MICROSOFT]: 'Microsoft',
  [SOCIAL_PROVIDERS.INSTAGRAM]: 'Instagram',
  [SOCIAL_PROVIDERS.TIKTOK]: 'TikTok',
  [SOCIAL_PROVIDERS.SNAPCHAT]: 'Snapchat',
  
  // Bangladesh specific
  [SOCIAL_PROVIDERS.WHATSAPP]: 'WhatsApp',
  [SOCIAL_PROVIDERS.IMO]: 'Imo',
  [SOCIAL_PROVIDERS.TELEGRAM]: 'Telegram',
  [SOCIAL_PROVIDERS.VIBER]: 'Viber',
  [SOCIAL_PROVIDERS.PHONE_OTP]: 'Phone Number (OTP)',
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: 'WhatsApp (OTP)',
  [SOCIAL_PROVIDERS.IMO_OTP]: 'Imo (OTP)',
  
  // MFS
  [SOCIAL_PROVIDERS.BKASH]: 'bKash',
  [SOCIAL_PROVIDERS.NAGAD]: 'Nagad',
  [SOCIAL_PROVIDERS.ROCKET]: 'Rocket',
} as const;

export type SocialDisplayNames = typeof SOCIAL_DISPLAY_NAMES;

// ============================================================
// Social Button Display Names (Bangla)
// ============================================================
export const SOCIAL_DISPLAY_NAMES_BN = {
  [SOCIAL_PROVIDERS.GOOGLE]: 'গুগল',
  [SOCIAL_PROVIDERS.FACEBOOK]: 'ফেসবুক',
  [SOCIAL_PROVIDERS.WHATSAPP]: 'হোয়াটসঅ্যাপ',
  [SOCIAL_PROVIDERS.IMO]: 'আইএমও',
  [SOCIAL_PROVIDERS.TELEGRAM]: 'টেলিগ্রাম',
  [SOCIAL_PROVIDERS.PHONE_OTP]: 'মোবাইল নম্বর',
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: 'হোয়াটসঅ্যাপ (ওটিপি)',
  [SOCIAL_PROVIDERS.IMO_OTP]: 'আইএমও (ওটিপি)',
  [SOCIAL_PROVIDERS.BKASH]: 'বিকাশ',
  [SOCIAL_PROVIDERS.NAGAD]: 'নগদ',
  [SOCIAL_PROVIDERS.ROCKET]: 'রকেট',
} as const;

export type SocialDisplayNamesBn = typeof SOCIAL_DISPLAY_NAMES_BN;

// ============================================================
// Social Provider Colors (UI)
// ============================================================
export const SOCIAL_COLORS = {
  [SOCIAL_PROVIDERS.GOOGLE]: '#4285F4',
  [SOCIAL_PROVIDERS.GITHUB]: '#333333',
  [SOCIAL_PROVIDERS.FACEBOOK]: '#1877F2',
  [SOCIAL_PROVIDERS.APPLE]: '#000000',
  [SOCIAL_PROVIDERS.TWITTER]: '#1DA1F2',
  [SOCIAL_PROVIDERS.LINKEDIN]: '#0077B5',
  [SOCIAL_PROVIDERS.MICROSOFT]: '#00A4EF',
  [SOCIAL_PROVIDERS.INSTAGRAM]: '#E4405F',
  [SOCIAL_PROVIDERS.TIKTOK]: '#000000',
  [SOCIAL_PROVIDERS.SNAPCHAT]: '#FFFC00',
  
  // Bangladesh specific
  [SOCIAL_PROVIDERS.WHATSAPP]: '#25D366',
  [SOCIAL_PROVIDERS.IMO]: '#6DA9F2',
  [SOCIAL_PROVIDERS.TELEGRAM]: '#26A5E4',
  [SOCIAL_PROVIDERS.VIBER]: '#7360F2',
  [SOCIAL_PROVIDERS.PHONE_OTP]: '#10B981',
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: '#25D366',
  [SOCIAL_PROVIDERS.IMO_OTP]: '#6DA9F2',
  
  // MFS
  [SOCIAL_PROVIDERS.BKASH]: '#E2136E',
  [SOCIAL_PROVIDERS.NAGAD]: '#F26B21',
  [SOCIAL_PROVIDERS.ROCKET]: '#1E88E5',
} as const;

export type SocialColors = typeof SOCIAL_COLORS;

// ============================================================
// Social Icon Names (For UI components)
// ============================================================
export const SOCIAL_ICONS = {
  [SOCIAL_PROVIDERS.GOOGLE]: 'google',
  [SOCIAL_PROVIDERS.GITHUB]: 'github',
  [SOCIAL_PROVIDERS.FACEBOOK]: 'facebook',
  [SOCIAL_PROVIDERS.APPLE]: 'apple',
  [SOCIAL_PROVIDERS.TWITTER]: 'twitter',
  [SOCIAL_PROVIDERS.LINKEDIN]: 'linkedin',
  [SOCIAL_PROVIDERS.MICROSOFT]: 'microsoft',
  [SOCIAL_PROVIDERS.INSTAGRAM]: 'instagram',
  [SOCIAL_PROVIDERS.TIKTOK]: 'tiktok',
  [SOCIAL_PROVIDERS.SNAPCHAT]: 'snapchat',
  
  // Bangladesh specific
  [SOCIAL_PROVIDERS.WHATSAPP]: 'whatsapp',
  [SOCIAL_PROVIDERS.IMO]: 'imo',
  [SOCIAL_PROVIDERS.TELEGRAM]: 'telegram',
  [SOCIAL_PROVIDERS.VIBER]: 'viber',
  [SOCIAL_PROVIDERS.PHONE_OTP]: 'phone',
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: 'whatsapp',
  [SOCIAL_PROVIDERS.IMO_OTP]: 'imo',
  
  // MFS
  [SOCIAL_PROVIDERS.BKASH]: 'bkash',
  [SOCIAL_PROVIDERS.NAGAD]: 'nagad',
  [SOCIAL_PROVIDERS.ROCKET]: 'rocket',
} as const;

export type SocialIcons = typeof SOCIAL_ICONS;

// ============================================================
// Provider Priority (For UI display order in Bangladesh)
// ============================================================
export const SOCIAL_PROVIDER_PRIORITY = {
  // Bangladesh specific priority (Facebook first, then WhatsApp, then bKash)
  [SOCIAL_PROVIDERS.FACEBOOK]: 1,
  [SOCIAL_PROVIDERS.WHATSAPP]: 2,
  [SOCIAL_PROVIDERS.GOOGLE]: 3,
  [SOCIAL_PROVIDERS.BKASH]: 4,
  [SOCIAL_PROVIDERS.NAGAD]: 5,
  [SOCIAL_PROVIDERS.PHONE_OTP]: 6,
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: 6.5,
  [SOCIAL_PROVIDERS.IMO]: 7,
  [SOCIAL_PROVIDERS.IMO_OTP]: 7.5,
  [SOCIAL_PROVIDERS.TELEGRAM]: 8,
  [SOCIAL_PROVIDERS.APPLE]: 9,
  [SOCIAL_PROVIDERS.GITHUB]: 10,
  [SOCIAL_PROVIDERS.TWITTER]: 11,
  [SOCIAL_PROVIDERS.LINKEDIN]: 12,
  [SOCIAL_PROVIDERS.MICROSOFT]: 13,
  [SOCIAL_PROVIDERS.INSTAGRAM]: 14,
  [SOCIAL_PROVIDERS.TIKTOK]: 15,
  [SOCIAL_PROVIDERS.SNAPCHAT]: 16,
  [SOCIAL_PROVIDERS.ROCKET]: 17,
  [SOCIAL_PROVIDERS.VIBER]: 18,
} as const;

export type SocialProviderPriority = typeof SOCIAL_PROVIDER_PRIORITY;

// ============================================================
// Provider Trust Levels (For security scoring)
// ============================================================
export const SOCIAL_PROVIDER_TRUST_LEVELS = {
  // High trust (Verified, established providers)
  [SOCIAL_PROVIDERS.GOOGLE]: 95,
  [SOCIAL_PROVIDERS.APPLE]: 95,
  [SOCIAL_PROVIDERS.MICROSOFT]: 90,
  [SOCIAL_PROVIDERS.FACEBOOK]: 85,
  
  // Medium trust
  [SOCIAL_PROVIDERS.GITHUB]: 80,
  [SOCIAL_PROVIDERS.LINKEDIN]: 80,
  [SOCIAL_PROVIDERS.TWITTER]: 75,
  
  // OTP based (Phone number verified)
  [SOCIAL_PROVIDERS.PHONE_OTP]: 70,
  [SOCIAL_PROVIDERS.WHATSAPP]: 65,
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: 65,
  [SOCIAL_PROVIDERS.IMO]: 60,
  [SOCIAL_PROVIDERS.IMO_OTP]: 60,
  [SOCIAL_PROVIDERS.TELEGRAM]: 60,
  
  // MFS Auth
  [SOCIAL_PROVIDERS.BKASH]: 75,
  [SOCIAL_PROVIDERS.NAGAD]: 75,
  [SOCIAL_PROVIDERS.ROCKET]: 70,
  
  // Lower trust (Social media, entertainment)
  [SOCIAL_PROVIDERS.INSTAGRAM]: 50,
  [SOCIAL_PROVIDERS.TIKTOK]: 45,
  [SOCIAL_PROVIDERS.SNAPCHAT]: 40,
  [SOCIAL_PROVIDERS.VIBER]: 55,
} as const;

export type SocialProviderTrustLevels = typeof SOCIAL_PROVIDER_TRUST_LEVELS;

// ============================================================
// SOCIAL_AUTH_RATE_LIMITS - Provider-specific limits only
// ============================================================
export const SOCIAL_AUTH_RATE_LIMITS = {
  // Per provider rate limits (requests per hour) - API call limits
  [SOCIAL_PROVIDERS.GOOGLE]: 100,
  [SOCIAL_PROVIDERS.FACEBOOK]: 200,
  [SOCIAL_PROVIDERS.WHATSAPP]: 50,
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: 50,
  [SOCIAL_PROVIDERS.PHONE_OTP]: 20,
  [SOCIAL_PROVIDERS.IMO]: 30,
  [SOCIAL_PROVIDERS.IMO_OTP]: 30,
  [SOCIAL_PROVIDERS.BKASH]: 100,
  [SOCIAL_PROVIDERS.NAGAD]: 100,
  [SOCIAL_PROVIDERS.ROCKET]: 80,
  
  // Default limit
  DEFAULT: 50,
  
  // Global rate limit per IP for social auth
  GLOBAL_PER_IP: 200,
  GLOBAL_WINDOW_MINUTES: 60,
  
  // OTP specific limits (per phone number, per IP)
  OTP_MAX_PER_PHONE_PER_HOUR: 5,
  OTP_MAX_PER_IP_PER_HOUR: 10,
} as const;

export type SocialAuthRateLimits = typeof SOCIAL_AUTH_RATE_LIMITS;

// ============================================================
// Account Linking Rules
// ============================================================
export const SOCIAL_ACCOUNT_LINKING = {
  MAX_LINKED_ACCOUNTS: 10,
  ALLOW_MULTIPLE_PROVIDERS: true,
  ALLOW_MULTIPLE_SAME_PROVIDER: false,
  AUTO_LINK_BY_EMAIL: true,
  REQUIRE_VERIFICATION_BEFORE_LINK: true,
  VERIFICATION_METHODS: ['email', 'phone'],
  ALLOW_UNLINKING: true,
  REQUIRE_ALTERNATIVE_LOGIN_METHOD: true,
  
  // Which provider combinations are allowed
  ALLOWED_COMBINATIONS: {
    GOOGLE_AND_FACEBOOK: true,
    GOOGLE_AND_PHONE: true,
    FACEBOOK_AND_WHATSAPP: true,
    BKASH_AND_PHONE: true,
    NAGAD_AND_PHONE: true,
  },
} as const;

export type SocialAccountLinking = typeof SOCIAL_ACCOUNT_LINKING;

// ============================================================
// OAuth State Parameters (Security)
// ============================================================
export const OAUTH_STATE_CONFIG = {
  STATE_LENGTH: 32,
  STATE_EXPIRY_SECONDS: 300,  // 5 minutes
  ENABLE_PKCE: true,
  PKCE_VERIFIER_LENGTH: 64,
  PKCE_CHALLENGE_METHOD: 'S256',
  
  // Nonce length (for OpenID Connect)
  NONCE_LENGTH: 32,
  NONCE_EXPIRY_SECONDS: 300,
} as const;

export type OAuthStateConfig = typeof OAUTH_STATE_CONFIG;

// ============================================================
// Social Provider Features
// ============================================================
export const SOCIAL_PROVIDER_FEATURES = {
  SUPPORTS_EMAIL: {
    [SOCIAL_PROVIDERS.GOOGLE]: true,
    [SOCIAL_PROVIDERS.FACEBOOK]: true,
    [SOCIAL_PROVIDERS.GITHUB]: true,
    [SOCIAL_PROVIDERS.APPLE]: true,
    [SOCIAL_PROVIDERS.MICROSOFT]: true,
    [SOCIAL_PROVIDERS.LINKEDIN]: true,
    [SOCIAL_PROVIDERS.WHATSAPP]: false,
    [SOCIAL_PROVIDERS.WHATSAPP_OTP]: false,
    [SOCIAL_PROVIDERS.IMO]: false,
    [SOCIAL_PROVIDERS.IMO_OTP]: false,
    [SOCIAL_PROVIDERS.PHONE_OTP]: false,
    [SOCIAL_PROVIDERS.BKASH]: true,
    [SOCIAL_PROVIDERS.NAGAD]: true,
    [SOCIAL_PROVIDERS.ROCKET]: true,
  },
  
  SUPPORTS_AVATAR: {
    [SOCIAL_PROVIDERS.GOOGLE]: true,
    [SOCIAL_PROVIDERS.FACEBOOK]: true,
    [SOCIAL_PROVIDERS.GITHUB]: true,
    [SOCIAL_PROVIDERS.APPLE]: false,
    [SOCIAL_PROVIDERS.MICROSOFT]: true,
  },
  
  SUPPORTS_REFRESH_TOKEN: {
    [SOCIAL_PROVIDERS.GOOGLE]: true,
    [SOCIAL_PROVIDERS.FACEBOOK]: true,
    [SOCIAL_PROVIDERS.GITHUB]: true,
    [SOCIAL_PROVIDERS.APPLE]: true,
    [SOCIAL_PROVIDERS.MICROSOFT]: true,
  },
  
  REQUIRE_REDIRECT_WHITELIST: [
    SOCIAL_PROVIDERS.GOOGLE,
    SOCIAL_PROVIDERS.FACEBOOK,
    SOCIAL_PROVIDERS.GITHUB,
    SOCIAL_PROVIDERS.APPLE,
    SOCIAL_PROVIDERS.MICROSOFT,
    SOCIAL_PROVIDERS.LINKEDIN,
  ],
} as const;

export type SocialProviderFeatures = typeof SOCIAL_PROVIDER_FEATURES;

// ============================================================
// Social Auth Events
// ============================================================
export const SOCIAL_AUTH_EVENTS = {
  // Authentication events
  SOCIAL_LOGIN_SUCCESS: 'social.login.success',
  SOCIAL_LOGIN_FAILED: 'social.login.failed',
  SOCIAL_REGISTER_SUCCESS: 'social.register.success',
  SOCIAL_REGISTER_FAILED: 'social.register.failed',
  
  // Account linking events
  ACCOUNT_LINKED: 'social.account.linked',
  ACCOUNT_UNLINKED: 'social.account.unlinked',
  ACCOUNT_MERGE_REQUESTED: 'social.account.merge.requested',
  ACCOUNT_MERGE_COMPLETED: 'social.account.merge.completed',
  
  // OTP events (Bangladesh specific)
  OTP_SENT: 'social.otp.sent',
  OTP_VERIFIED: 'social.otp.verified',
  OTP_FAILED: 'social.otp.failed',
  OTP_RESENT: 'social.otp.resend',
  
  // Provider specific events
  PROVIDER_ADDED: 'social.provider.added',
  PROVIDER_REMOVED: 'social.provider.removed',
  PROVIDER_EXPIRED: 'social.provider.expired',
  
  // MFS auth events (Bangladesh specific)
  MFS_AUTH_SUCCESS: 'mfs.auth.success',
  MFS_AUTH_FAILED: 'mfs.auth.failed',
  
  // Security events
  SUSPICIOUS_SOCIAL_LOGIN: 'social.suspicious.login',
  SOCIAL_TOKEN_REFRESHED: 'social.token.refreshed',
  SOCIAL_TOKEN_EXPIRED: 'social.token.expired',
} as const;

export type SocialAuthEvents = typeof SOCIAL_AUTH_EVENTS;

// ============================================================
// Social Provider Metadata (For dynamic configuration)
// ============================================================
export const SOCIAL_PROVIDER_METADATA = {
  [SOCIAL_PROVIDERS.FACEBOOK]: {
    type: 'oauth',
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    userInfoUrl: 'https://graph.facebook.com/me',
    responseType: 'code',
    grantType: 'authorization_code',
    version: 'v18.0',
  },
  [SOCIAL_PROVIDERS.GOOGLE]: {
    type: 'oauth',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    responseType: 'code',
    grantType: 'authorization_code',
    version: 'v2',
  },
  [SOCIAL_PROVIDERS.WHATSAPP]: {
    type: 'otp_based',
    otpLength: 6,
    otpExpirySeconds: 300,
    messageTemplate: 'Your {{app_name}} verification code is: {{code}}',
    resendCooldownSeconds: 30,
  },
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: {
    type: 'otp_based',
    otpLength: 6,
    otpExpirySeconds: 300,
    messageTemplate: 'Your {{app_name}} OTP code is: {{code}}',
    resendCooldownSeconds: 30,
  },
  [SOCIAL_PROVIDERS.IMO_OTP]: {
    type: 'otp_based',
    otpLength: 6,
    otpExpirySeconds: 300,
    messageTemplate: 'Your {{app_name}} verification code: {{code}}',
    resendCooldownSeconds: 30,
  },
  [SOCIAL_PROVIDERS.PHONE_OTP]: {
    type: 'otp_based',
    otpLength: 6,
    otpExpirySeconds: 300,
    messageTemplate: 'Your {{app_name}} OTP is: {{code}}',
    resendCooldownSeconds: 30,
  },
  [SOCIAL_PROVIDERS.BKASH]: {
    type: 'mfs_auth',
    authUrl: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout',
    grantType: 'client_credentials',
    version: 'v1.2.0',
  },
  [SOCIAL_PROVIDERS.NAGAD]: {
    type: 'mfs_auth',
    authUrl: 'https://sandbox.mynagad.com/api/dfs/check-out/initialize',
    version: 'v1',
  },
  [SOCIAL_PROVIDERS.ROCKET]: {
    type: 'mfs_auth',
    authUrl: 'https://api.rocket.com.bd/auth',
    version: 'v1',
  },
} as const;

export type SocialProviderMetadata = typeof SOCIAL_PROVIDER_METADATA;

// ============================================================
// Social Login Consent Screen Configuration
// ============================================================
export const SOCIAL_CONSENT_SCREEN = {
  ALWAYS_SHOW_CONSENT: [
    SOCIAL_PROVIDERS.GOOGLE,
    SOCIAL_PROVIDERS.FACEBOOK,
    SOCIAL_PROVIDERS.MICROSOFT,
  ],
  
  MESSAGES: {
    EN: 'We will access your {{provider}} profile information (name, email) to create your account on {{app_name}}.',
    BN: '{{app_name}}-এ আপনার অ্যাকাউন্ট তৈরি করতে আমরা আপনার {{provider}} প্রোফাইলের তথ্য (নাম, ইমেইল) অ্যাক্সেস করব।',
  },
  
  REQUIRED_PERMISSIONS_MESSAGE: 'We need access to your email address to create your account.',
  
  // Privacy policy links
  PRIVACY_POLICY_URL: 'https://vubon.com.bd/privacy',
  TERMS_URL: 'https://vubon.com.bd/terms',
} as const;

export type SocialConsentScreen = typeof SOCIAL_CONSENT_SCREEN;

// ============================================================
// Social Auth Metrics (For monitoring)
// ============================================================
export const SOCIAL_AUTH_METRICS = {
  ENABLED: true,
  
  METRICS: {
    LOGIN_SUCCESS_RATE: 'vubon_social_login_success_rate',
    LOGIN_FAILURE_RATE: 'vubon_social_login_failure_rate',
    ACCOUNT_LINKING_RATE: 'vubon_social_account_linking_rate',
    PROVIDER_DISTRIBUTION: 'vubon_social_provider_distribution',
    OTP_SENT_TOTAL: 'vubon_social_otp_sent_total',
    MFS_AUTH_SUCCESS_RATE: 'vubon_mfs_auth_success_rate',
  },
  
  ALERT_THRESHOLDS: {
    HIGH_FAILURE_RATE: 0.15,      // 15% failure rate
    HIGH_OTP_REQUEST_RATE: 100,    // >100 OTP requests per hour
    SUSPICIOUS_LINKING_RATE: 50,   // >50 account links per hour
  },
} as const;

export type SocialAuthMetrics = typeof SOCIAL_AUTH_METRICS;

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Social Provider Configuration
// (For social-account.entity.ts and UI components)
// ============================================================

/**
 * Social provider configuration for account linking limits
 */
export const SOCIAL_CONFIG = {
  MAX_LINKED_ACCOUNTS: 5,
  MAX_UNLINK_PER_DAY: 5,
  SYNC_THRESHOLD_DAYS: 7,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  PROVIDER_EMAIL_DOMAINS: {
    GOOGLE: ['gmail.com', 'googlemail.com'],
    MICROSOFT: ['outlook.com', 'hotmail.com', 'live.com', 'msn.com'],
    APPLE: ['icloud.com', 'me.com', 'mac.com'],
    GITHUB: [] as string[], // GitHub doesn't have email domain restriction
    LINKEDIN: ['linkedin.com'],
    FACEBOOK: ['facebook.com', 'fb.com'],
  },
} as const;

export type SocialConfig = typeof SOCIAL_CONFIG;

/**
 * Provider display names for UI (English)
 */
export const PROVIDER_DISPLAY_NAMES = {
  // International providers
  [SOCIAL_PROVIDERS.GOOGLE]: 'Google',
  [SOCIAL_PROVIDERS.FACEBOOK]: 'Facebook',
  [SOCIAL_PROVIDERS.GITHUB]: 'GitHub',
  [SOCIAL_PROVIDERS.LINKEDIN]: 'LinkedIn',
  [SOCIAL_PROVIDERS.APPLE]: 'Apple',
  [SOCIAL_PROVIDERS.TWITTER]: 'Twitter',
  [SOCIAL_PROVIDERS.INSTAGRAM]: 'Instagram',
  [SOCIAL_PROVIDERS.MICROSOFT]: 'Microsoft',
  [SOCIAL_PROVIDERS.TIKTOK]: 'TikTok',
  [SOCIAL_PROVIDERS.SNAPCHAT]: 'Snapchat',
  // Bangladesh specific messaging apps
  [SOCIAL_PROVIDERS.WHATSAPP]: 'WhatsApp',
  [SOCIAL_PROVIDERS.IMO]: 'Imo',
  [SOCIAL_PROVIDERS.TELEGRAM]: 'Telegram',
  [SOCIAL_PROVIDERS.VIBER]: 'Viber',
  // Mobile Financial Services (Bangladesh)
  [SOCIAL_PROVIDERS.BKASH]: 'bKash',
  [SOCIAL_PROVIDERS.NAGAD]: 'Nagad',
  [SOCIAL_PROVIDERS.ROCKET]: 'Rocket',
  // OTP variants
  [SOCIAL_PROVIDERS.PHONE_OTP]: 'Phone Number',
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: 'WhatsApp',
  [SOCIAL_PROVIDERS.IMO_OTP]: 'Imo',
} as const;

export type ProviderDisplayNames = typeof PROVIDER_DISPLAY_NAMES;

/**
 * Provider icon URLs for UI components
 */
export const PROVIDER_ICON_URLS = {
  // International providers
  [SOCIAL_PROVIDERS.GOOGLE]: '/icons/social/google.svg',
  [SOCIAL_PROVIDERS.FACEBOOK]: '/icons/social/facebook.svg',
  [SOCIAL_PROVIDERS.GITHUB]: '/icons/social/github.svg',
  [SOCIAL_PROVIDERS.LINKEDIN]: '/icons/social/linkedin.svg',
  [SOCIAL_PROVIDERS.APPLE]: '/icons/social/apple.svg',
  [SOCIAL_PROVIDERS.TWITTER]: '/icons/social/twitter.svg',
  [SOCIAL_PROVIDERS.INSTAGRAM]: '/icons/social/instagram.svg',
  [SOCIAL_PROVIDERS.MICROSOFT]: '/icons/social/microsoft.svg',
  [SOCIAL_PROVIDERS.TIKTOK]: '/icons/social/tiktok.svg',
  [SOCIAL_PROVIDERS.SNAPCHAT]: '/icons/social/snapchat.svg',
  // Bangladesh specific messaging apps
  [SOCIAL_PROVIDERS.WHATSAPP]: '/icons/social/whatsapp.svg',
  [SOCIAL_PROVIDERS.IMO]: '/icons/social/imo.svg',
  [SOCIAL_PROVIDERS.TELEGRAM]: '/icons/social/telegram.svg',
  [SOCIAL_PROVIDERS.VIBER]: '/icons/social/viber.svg',
  // Mobile Financial Services (Bangladesh)
  [SOCIAL_PROVIDERS.BKASH]: '/icons/social/bkash.svg',
  [SOCIAL_PROVIDERS.NAGAD]: '/icons/social/nagad.svg',
  [SOCIAL_PROVIDERS.ROCKET]: '/icons/social/rocket.svg',
  // OTP variants (use same as parent)
  [SOCIAL_PROVIDERS.PHONE_OTP]: '/icons/social/phone.svg',
  [SOCIAL_PROVIDERS.WHATSAPP_OTP]: '/icons/social/whatsapp.svg',
  [SOCIAL_PROVIDERS.IMO_OTP]: '/icons/social/imo.svg',
} as const;

export type ProviderIconUrls = typeof PROVIDER_ICON_URLS;

// ============================================================
// Type Exports
// ============================================================
export type SocialProviderValue = typeof SOCIAL_PROVIDERS;
export type SocialProviderCategoryValue = typeof SOCIAL_PROVIDER_CATEGORIES;
export type ProviderToCategoryValue = typeof PROVIDER_TO_CATEGORY;
export type OAuthScopesValue = typeof OAUTH_SCOPES;
export type SocialCallbackRoutesValue = typeof SOCIAL_CALLBACK_ROUTES;
export type SocialDisplayNamesValue = typeof SOCIAL_DISPLAY_NAMES;
export type SocialDisplayNamesBnValue = typeof SOCIAL_DISPLAY_NAMES_BN;
export type SocialColorsValue = typeof SOCIAL_COLORS;
export type SocialIconsValue = typeof SOCIAL_ICONS;
export type SocialProviderPriorityValue = typeof SOCIAL_PROVIDER_PRIORITY;
export type SocialProviderTrustLevelsValue = typeof SOCIAL
