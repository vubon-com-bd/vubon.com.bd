/**
 * Social Auth Constants - Pure immutable OAuth configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/auth-constants/social.constants
 * 
 * RULES:
 * ✅ NO OAuth implementation, token exchange logic
 * ✅ NO business logic
 * ✅ NO side effects
 * ✅ ONLY pure readonly constants
 * ✅ RATE LIMITS: Use RATE_LIMIT_VALUES from api.constants.ts for auth rate limits
 * ✅ OTP_CONFIG: Use OTP_CONFIG from auth.constants.ts for base OTP settings
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

// ============================================================
// Provider Categories
// ============================================================
export const SOCIAL_PROVIDER_CATEGORIES = {
  OAUTH: 'oauth',                   // Standard OAuth providers
  OTP_BASED: 'otp_based',           // OTP based login (WhatsApp, Imo, Phone)
  MFS_AUTH: 'mfs_auth',             // Mobile Financial Services as auth
  SOCIAL_MEDIA: 'social_media',     // Social media platforms
} as const;

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

// ============================================================
// Social Callback Routes
// Note: These are OAuth callback routes, for full API routes use API_ROUTES from api.constants.ts
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
  [SOCIAL_PROVIDERS.BKASH]: 'বিকাশ',
  [SOCIAL_PROVIDERS.NAGAD]: 'নগদ',
  [SOCIAL_PROVIDERS.ROCKET]: 'রকেট',
} as const;

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
  [SOCIAL_PROVIDERS.IMO]: 7,
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

// ============================================================
// ⚠️ SOCIAL_AUTH_RATE_LIMITS - Provider-specific limits only
// Note: General auth rate limits (login, OTP send, etc.) are in RATE_LIMIT_VALUES from api.constants.ts
// These are SOCIAL PROVIDER SPECIFIC limits (e.g., Facebook API calls per hour)
// ============================================================
export const SOCIAL_AUTH_RATE_LIMITS = {
  // Per provider rate limits (requests per hour) - API call limits, not auth attempts
  [SOCIAL_PROVIDERS.GOOGLE]: 100,
  [SOCIAL_PROVIDERS.FACEBOOK]: 200,
  [SOCIAL_PROVIDERS.WHATSAPP]: 50,
  [SOCIAL_PROVIDERS.PHONE_OTP]: 20,
  [SOCIAL_PROVIDERS.IMO]: 30,
  [SOCIAL_PROVIDERS.BKASH]: 100,
  [SOCIAL_PROVIDERS.NAGAD]: 100,
  
  // Default limit
  DEFAULT: 50,
  
  // Global rate limit per IP for social auth
  GLOBAL_PER_IP: 200,
  GLOBAL_WINDOW_MINUTES: 60,
  
  // OTP specific limits (per phone number, per IP)
  OTP_MAX_PER_PHONE_PER_HOUR: 5,
  OTP_MAX_PER_IP_PER_HOUR: 10,
} as const;

// ============================================================
// Account Linking Rules
// ============================================================
export const SOCIAL_ACCOUNT_LINKING = {
  // Maximum accounts that can be linked per user
  MAX_LINKED_ACCOUNTS: 10,
  
  // Whether multiple providers can be linked
  ALLOW_MULTIPLE_PROVIDERS: true,
  
  // Whether same provider multiple accounts allowed
  ALLOW_MULTIPLE_SAME_PROVIDER: false,
  
  // Auto-link accounts with same email
  AUTO_LINK_BY_EMAIL: true,
  
  // Require verification before linking
  REQUIRE_VERIFICATION_BEFORE_LINK: true,
  
  // Verification methods
  VERIFICATION_METHODS: ['email', 'phone'],
  
  // Unlinking rules
  ALLOW_UNLINKING: true,
  REQUIRE_ALTERNATIVE_LOGIN_METHOD: true,  // Must have at least one login method
} as const;

// ============================================================
// OAuth State Parameters (Security)
// ============================================================
export const OAUTH_STATE_CONFIG = {
  // State token length
  STATE_LENGTH: 32,
  
  // State token expiry (seconds)
  STATE_EXPIRY_SECONDS: 300,  // 5 minutes
  
  // Whether to include PKCE (Proof Key for Code Exchange)
  ENABLE_PKCE: true,
  
  // PKCE code verifier length
  PKCE_VERIFIER_LENGTH: 64,
  
  // PKCE code challenge method
  PKCE_CHALLENGE_METHOD: 'S256',
} as const;

// ============================================================
// Social Provider Features
// ============================================================
export const SOCIAL_PROVIDER_FEATURES = {
  // Which providers support these features
  SUPPORTS_EMAIL: {
    [SOCIAL_PROVIDERS.GOOGLE]: true,
    [SOCIAL_PROVIDERS.FACEBOOK]: true,
    [SOCIAL_PROVIDERS.GITHUB]: true,
    [SOCIAL_PROVIDERS.APPLE]: true,
    [SOCIAL_PROVIDERS.MICROSOFT]: true,
    [SOCIAL_PROVIDERS.LINKEDIN]: true,
    [SOCIAL_PROVIDERS.WHATSAPP]: false,
    [SOCIAL_PROVIDERS.IMO]: false,
    [SOCIAL_PROVIDERS.PHONE_OTP]: false,
    [SOCIAL_PROVIDERS.BKASH]: true,
  },
  
  // Which providers support profile picture
  SUPPORTS_AVATAR: {
    [SOCIAL_PROVIDERS.GOOGLE]: true,
    [SOCIAL_PROVIDERS.FACEBOOK]: true,
    [SOCIAL_PROVIDERS.GITHUB]: true,
    [SOCIAL_PROVIDERS.APPLE]: false,
    [SOCIAL_PROVIDERS.MICROSOFT]: true,
  },
  
  // Which providers require redirect URI whitelisting
  REQUIRE_REDIRECT_WHITELIST: [
    SOCIAL_PROVIDERS.GOOGLE,
    SOCIAL_PROVIDERS.FACEBOOK,
    SOCIAL_PROVIDERS.GITHUB,
    SOCIAL_PROVIDERS.APPLE,
    SOCIAL_PROVIDERS.MICROSOFT,
    SOCIAL_PROVIDERS.LINKEDIN,
  ],
} as const;

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

// ============================================================
// Social Provider Metadata (For dynamic configuration)
// ============================================================
export const SOCIAL_PROVIDER_METADATA = {
  [SOCIAL_PROVIDERS.FACEBOOK]: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    userInfoUrl: 'https://graph.facebook.com/me',
    responseType: 'code',
    grantType: 'authorization_code',
  },
  [SOCIAL_PROVIDERS.GOOGLE]: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    responseType: 'code',
    grantType: 'authorization_code',
  },
  [SOCIAL_PROVIDERS.WHATSAPP]: {
    type: 'otp_based',
    otpLength: 6,
    otpExpirySeconds: 300,
    messageTemplate: 'Your {{app_name}} verification code is: {{code}}',
  },
  [SOCIAL_PROVIDERS.BKASH]: {
    type: 'mfs_auth',
    authUrl: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout',
    grantType: 'client_credentials',
  },
  [SOCIAL_PROVIDERS.NAGAD]: {
    type: 'mfs_auth',
    authUrl: 'https://sandbox.mynagad.com/api/dfs/check-out/initialize',
  },
} as const;

// ============================================================
// Social Login Consent Screen Configuration
// ============================================================
export const SOCIAL_CONSENT_SCREEN = {
  // Always show consent screen for these providers
  ALWAYS_SHOW_CONSENT: [
    SOCIAL_PROVIDERS.GOOGLE,
    SOCIAL_PROVIDERS.FACEBOOK,
    SOCIAL_PROVIDERS.MICROSOFT,
  ],
  
  // Consent message templates
  MESSAGES: {
    EN: 'We will access your {{provider}} profile information (name, email) to create your account on {{app_name}}.',
    BN: '{{app_name}}-এ আপনার অ্যাকাউন্ট তৈরি করতে আমরা আপনার {{provider}} প্রোফাইলের তথ্য (নাম, ইমেইল) অ্যাক্সেস করব।',
  },
  
  // Required permissions message
  REQUIRED_PERMISSIONS_MESSAGE: 'We need access to your email address to create your account.',
} as const;

// ============================================================
// ✓ All constants use 'as const' (no Object.freeze needed for performance)
// ✓ Removed Object.freeze() wrappers (as const provides same immutability)
// ✓ Added clarification comments for rate limits
// ✓ OTP_CONFIG reference points to auth.constants.ts
// ============================================================
