/**
 * Social login constants for the monorepo
 * All social authentication-related constants are centralized here
 */
/**
 * Social providers supported by the application
 */
export declare const SOCIAL_PROVIDERS: {
    /**
     * Google OAuth provider
     */
    readonly GOOGLE: "google";
    /**
     * Facebook OAuth provider
     */
    readonly FACEBOOK: "facebook";
    /**
     * GitHub OAuth provider
     */
    readonly GITHUB: "github";
    /**
     * Apple OAuth provider
     */
    readonly APPLE: "apple";
    /**
     * LinkedIn OAuth provider
     */
    readonly LINKEDIN: "linkedin";
    /**
     * Twitter/X OAuth provider
     */
    readonly TWITTER: "twitter";
    /**
     * Microsoft OAuth provider
     */
    readonly MICROSOFT: "microsoft";
    /**
     * Discord OAuth provider
     */
    readonly DISCORD: "discord";
    /**
     * Slack OAuth provider
     */
    readonly SLACK: "slack";
    /**
     * GitLab OAuth provider
     */
    readonly GITLAB: "gitlab";
    /**
     * Amazon OAuth provider
     */
    readonly AMAZON: "amazon";
    /**
     * Spotify OAuth provider
     */
    readonly SPOTIFY: "spotify";
    /**
     * Instagram OAuth provider
     */
    readonly INSTAGRAM: "instagram";
    /**
     * TikTok OAuth provider
     */
    readonly TIKTOK: "tiktok";
    /**
     * Snapchat OAuth provider
     */
    readonly SNAPCHAT: "snapchat";
    /**
     * WeChat OAuth provider
     */
    readonly WECHAT: "wechat";
    /**
     * Line OAuth provider
     */
    readonly LINE: "line";
};
export type SocialProvider = (typeof SOCIAL_PROVIDERS)[keyof typeof SOCIAL_PROVIDERS];
/**
 * Social provider display names
 */
export declare const SOCIAL_PROVIDER_NAMES: {
    readonly google: "Google";
    readonly facebook: "Facebook";
    readonly github: "GitHub";
    readonly apple: "Apple";
    readonly linkedin: "LinkedIn";
    readonly twitter: "Twitter/X";
    readonly microsoft: "Microsoft";
    readonly discord: "Discord";
    readonly slack: "Slack";
    readonly gitlab: "GitLab";
    readonly amazon: "Amazon";
    readonly spotify: "Spotify";
    readonly instagram: "Instagram";
    readonly tiktok: "TikTok";
    readonly snapchat: "Snapchat";
    readonly wechat: "WeChat";
    readonly line: "Line";
};
export type SocialProviderName = (typeof SOCIAL_PROVIDER_NAMES)[keyof typeof SOCIAL_PROVIDER_NAMES];
/**
 * Social provider callback URLs
 * These are the endpoints where OAuth providers redirect after authentication
 */
export declare const SOCIAL_CALLBACK_URLS: {
    readonly google: "/api/auth/callback/google";
    readonly facebook: "/api/auth/callback/facebook";
    readonly github: "/api/auth/callback/github";
    readonly apple: "/api/auth/callback/apple";
    readonly linkedin: "/api/auth/callback/linkedin";
    readonly twitter: "/api/auth/callback/twitter";
    readonly microsoft: "/api/auth/callback/microsoft";
    readonly discord: "/api/auth/callback/discord";
    readonly slack: "/api/auth/callback/slack";
    readonly gitlab: "/api/auth/callback/gitlab";
    readonly amazon: "/api/auth/callback/amazon";
    readonly spotify: "/api/auth/callback/spotify";
    readonly instagram: "/api/auth/callback/instagram";
    readonly tiktok: "/api/auth/callback/tiktok";
    readonly snapchat: "/api/auth/callback/snapchat";
    readonly wechat: "/api/auth/callback/wechat";
    readonly line: "/api/auth/callback/line";
};
export type SocialCallbackUrl = (typeof SOCIAL_CALLBACK_URLS)[keyof typeof SOCIAL_CALLBACK_URLS];
/**
 * Social provider authorization URLs
 */
export declare const SOCIAL_AUTH_URLS: {
    readonly google: "https://accounts.google.com/o/oauth2/v2/auth";
    readonly facebook: "https://www.facebook.com/v18.0/dialog/oauth";
    readonly github: "https://github.com/login/oauth/authorize";
    readonly apple: "https://appleid.apple.com/auth/authorize";
    readonly linkedin: "https://www.linkedin.com/oauth/v2/authorization";
    readonly twitter: "https://twitter.com/i/oauth2/authorize";
    readonly microsoft: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
    readonly discord: "https://discord.com/api/oauth2/authorize";
    readonly slack: "https://slack.com/oauth/v2/authorize";
    readonly gitlab: "https://gitlab.com/oauth/authorize";
    readonly amazon: "https://www.amazon.com/ap/oa";
    readonly spotify: "https://accounts.spotify.com/authorize";
    readonly instagram: "https://api.instagram.com/oauth/authorize";
    readonly tiktok: "https://www.tiktok.com/auth/authorize";
    readonly snapchat: "https://accounts.snapchat.com/accounts/oauth2/auth";
    readonly wechat: "https://open.weixin.qq.com/connect/qrconnect";
    readonly line: "https://access.line.me/oauth2/v2.1/authorize";
};
export type SocialAuthUrl = (typeof SOCIAL_AUTH_URLS)[keyof typeof SOCIAL_AUTH_URLS];
/**
 * Social provider token URLs
 */
export declare const SOCIAL_TOKEN_URLS: {
    readonly google: "https://oauth2.googleapis.com/token";
    readonly facebook: "https://graph.facebook.com/v18.0/oauth/access_token";
    readonly github: "https://github.com/login/oauth/access_token";
    readonly apple: "https://appleid.apple.com/auth/token";
    readonly linkedin: "https://www.linkedin.com/oauth/v2/accessToken";
    readonly twitter: "https://api.twitter.com/2/oauth2/token";
    readonly microsoft: "https://login.microsoftonline.com/common/oauth2/v2.0/token";
    readonly discord: "https://discord.com/api/oauth2/token";
    readonly slack: "https://slack.com/api/oauth.v2.access";
    readonly gitlab: "https://gitlab.com/oauth/token";
    readonly amazon: "https://api.amazon.com/auth/o2/token";
    readonly spotify: "https://accounts.spotify.com/api/token";
    readonly instagram: "https://api.instagram.com/oauth/access_token";
    readonly tiktok: "https://open-api.tiktok.com/oauth/access_token/";
    readonly snapchat: "https://accounts.snapchat.com/accounts/oauth2/token";
    readonly wechat: "https://api.weixin.qq.com/sns/oauth2/access_token";
    readonly line: "https://api.line.me/oauth2/v2.1/token";
};
export type SocialTokenUrl = (typeof SOCIAL_TOKEN_URLS)[keyof typeof SOCIAL_TOKEN_URLS];
/**
 * Social provider user info URLs
 */
export declare const SOCIAL_USER_INFO_URLS: {
    readonly google: "https://www.googleapis.com/oauth2/v2/userinfo";
    readonly facebook: "https://graph.facebook.com/me?fields=id,name,email,picture";
    readonly github: "https://api.github.com/user";
    readonly apple: "https://appleid.apple.com/auth/keys";
    readonly linkedin: "https://api.linkedin.com/v2/userinfo";
    readonly twitter: "https://api.twitter.com/2/users/me";
    readonly microsoft: "https://graph.microsoft.com/v1.0/me";
    readonly discord: "https://discord.com/api/users/@me";
    readonly slack: "https://slack.com/api/users.profile.get";
    readonly gitlab: "https://gitlab.com/api/v4/user";
    readonly amazon: "https://api.amazon.com/user/profile";
    readonly spotify: "https://api.spotify.com/v1/me";
    readonly instagram: "https://graph.instagram.com/me";
    readonly tiktok: "https://open-api.tiktok.com/user/info/";
    readonly snapchat: "https://api.snapchat.com/v1/me";
    readonly wechat: "https://api.weixin.qq.com/sns/userinfo";
    readonly line: "https://api.line.me/v2/profile";
};
export type SocialUserInfoUrl = (typeof SOCIAL_USER_INFO_URLS)[keyof typeof SOCIAL_USER_INFO_URLS];
/**
 * Social provider configurations
 */
export declare const SOCIAL_CONFIG: {
    /**
     * Whether social login is enabled
     */
    readonly ENABLED: true;
    /**
     * Whether to allow account linking
     */
    readonly ALLOW_ACCOUNT_LINKING: true;
    /**
     * Whether to allow registration via social providers
     */
    readonly ALLOW_REGISTRATION: true;
    /**
     * Default redirect URI after social login
     */
    readonly DEFAULT_REDIRECT: "/dashboard";
    /**
     * Session TTL for social login sessions
     */
    readonly SESSION_TTL_SECONDS: 3600;
    /**
     * Whether to verify email from social provider
     */
    readonly VERIFY_EMAIL: true;
    /**
     * Whether to use state parameter for CSRF protection
     */
    readonly USE_STATE_PARAMETER: true;
    /**
     * State parameter expiry in seconds
     */
    readonly STATE_EXPIRY_SECONDS: 300;
    /**
     * Scopes to request from each provider
     */
    readonly SCOPES: {
        readonly google: readonly ["profile", "email"];
        readonly facebook: readonly ["email", "public_profile"];
        readonly github: readonly ["user:email"];
        readonly apple: readonly ["name", "email"];
        readonly linkedin: readonly ["profile", "email", "openid"];
        readonly twitter: readonly ["tweet.read", "users.read", "offline.access"];
        readonly microsoft: readonly ["User.Read", "email", "profile"];
        readonly discord: readonly ["identify", "email"];
        readonly slack: readonly ["users.profile:read", "users:read"];
        readonly gitlab: readonly ["read_user"];
        readonly amazon: readonly ["profile", "profile:user_id"];
        readonly spotify: readonly ["user-read-email", "user-read-private"];
        readonly instagram: readonly ["user_profile", "user_media"];
        readonly tiktok: readonly ["user.info.basic"];
        readonly snapchat: readonly ["snapchat:user:read"];
        readonly wechat: readonly ["snsapi_login"];
        readonly line: readonly ["profile", "openid", "email"];
    };
};
/**
 * Social provider icons (Unicode or emoji)
 */
export declare const SOCIAL_PROVIDER_ICONS: {
    readonly google: "🔵";
    readonly facebook: "🔷";
    readonly github: "🐙";
    readonly apple: "🍎";
    readonly linkedin: "💼";
    readonly twitter: "🐦";
    readonly microsoft: "🪟";
    readonly discord: "🎮";
    readonly slack: "💬";
    readonly gitlab: "🦊";
    readonly amazon: "🛒";
    readonly spotify: "🎵";
    readonly instagram: "📸";
    readonly tiktok: "🎵";
    readonly snapchat: "👻";
    readonly wechat: "💬";
    readonly line: "📱";
};
export type SocialProviderIcon = (typeof SOCIAL_PROVIDER_ICONS)[keyof typeof SOCIAL_PROVIDER_ICONS];
/**
 * Social provider colors (for UI theming)
 */
export declare const SOCIAL_PROVIDER_COLORS: {
    readonly google: "#4285F4";
    readonly facebook: "#1877F2";
    readonly github: "#181717";
    readonly apple: "#A2AAAD";
    readonly linkedin: "#0A66C2";
    readonly twitter: "#1DA1F2";
    readonly microsoft: "#00A4EF";
    readonly discord: "#5865F2";
    readonly slack: "#4A154B";
    readonly gitlab: "#FC6D26";
    readonly amazon: "#FF9900";
    readonly spotify: "#1DB954";
    readonly instagram: "#E4405F";
    readonly tiktok: "#010101";
    readonly snapchat: "#FFFC00";
    readonly wechat: "#07C160";
    readonly line: "#00C300";
};
export type SocialProviderColor = (typeof SOCIAL_PROVIDER_COLORS)[keyof typeof SOCIAL_PROVIDER_COLORS];
/**
 * Social provider button text
 */
export declare const SOCIAL_PROVIDER_BUTTON_TEXT: {
    readonly google: "Continue with Google";
    readonly facebook: "Continue with Facebook";
    readonly github: "Continue with GitHub";
    readonly apple: "Continue with Apple";
    readonly linkedin: "Continue with LinkedIn";
    readonly twitter: "Continue with Twitter/X";
    readonly microsoft: "Continue with Microsoft";
    readonly discord: "Continue with Discord";
    readonly slack: "Continue with Slack";
    readonly gitlab: "Continue with GitLab";
    readonly amazon: "Continue with Amazon";
    readonly spotify: "Continue with Spotify";
    readonly instagram: "Continue with Instagram";
    readonly tiktok: "Continue with TikTok";
    readonly snapchat: "Continue with Snapchat";
    readonly wechat: "Continue with WeChat";
    readonly line: "Continue with Line";
};
export type SocialProviderButtonText = (typeof SOCIAL_PROVIDER_BUTTON_TEXT)[keyof typeof SOCIAL_PROVIDER_BUTTON_TEXT];
/**
 * Social provider error messages
 */
export declare const SOCIAL_ERROR_MESSAGES: {
    readonly PROVIDER_NOT_SUPPORTED: "Social provider is not supported";
    readonly PROVIDER_DISABLED: "Social provider is currently disabled";
    readonly AUTH_FAILED: "Social authentication failed";
    readonly TOKEN_EXCHANGE_FAILED: "Failed to exchange authorization code for access token";
    readonly USER_INFO_FETCH_FAILED: "Failed to fetch user information from provider";
    readonly EMAIL_NOT_PROVIDED: "Email address was not provided by the social provider";
    readonly EMAIL_ALREADY_EXISTS: "A user with this email already exists";
    readonly ACCOUNT_LINKING_FAILED: "Failed to link social account";
    readonly ACCOUNT_UNLINKING_FAILED: "Failed to unlink social account";
    readonly INVALID_STATE: "Invalid state parameter - possible CSRF attack";
    readonly EXPIRED_STATE: "State parameter has expired";
    readonly INVALID_CODE: "Invalid authorization code";
    readonly ACCESS_DENIED: "User denied access to their information";
    readonly SCOPE_MISMATCH: "Requested scopes do not match granted scopes";
    readonly RATE_LIMITED: "Rate limit exceeded for social authentication";
    readonly NETWORK_ERROR: "Network error while communicating with social provider";
    readonly UNKNOWN_ERROR: "An unknown error occurred during social authentication";
};
export type SocialErrorMessage = (typeof SOCIAL_ERROR_MESSAGES)[keyof typeof SOCIAL_ERROR_MESSAGES];
/**
 * Social provider success messages
 */
export declare const SOCIAL_SUCCESS_MESSAGES: {
    readonly AUTH_SUCCESS: "Successfully authenticated with social provider";
    readonly ACCOUNT_LINKED: "Social account successfully linked";
    readonly ACCOUNT_UNLINKED: "Social account successfully unlinked";
    readonly REGISTRATION_SUCCESS: "Successfully registered with social provider";
};
export type SocialSuccessMessage = (typeof SOCIAL_SUCCESS_MESSAGES)[keyof typeof SOCIAL_SUCCESS_MESSAGES];
/**
 * Social provider events for logging
 */
export declare const SOCIAL_EVENTS: {
    readonly AUTH_STARTED: "social.auth.started";
    readonly AUTH_SUCCESS: "social.auth.success";
    readonly AUTH_FAILURE: "social.auth.failure";
    readonly AUTH_CANCELLED: "social.auth.cancelled";
    readonly TOKEN_EXCHANGE: "social.token.exchange";
    readonly USER_INFO_FETCHED: "social.user.info.fetched";
    readonly ACCOUNT_LINKED: "social.account.linked";
    readonly ACCOUNT_UNLINKED: "social.account.unlinked";
    readonly ACCOUNT_CREATED: "social.account.created";
    readonly ACCOUNT_UPDATED: "social.account.updated";
};
export type SocialEvent = (typeof SOCIAL_EVENTS)[keyof typeof SOCIAL_EVENTS];
/**
 * Social provider interface
 */
export interface SocialProviderConfig {
    /**
     * Provider identifier
     */
    provider: SocialProvider;
    /**
     * Display name of the provider
     */
    name: string;
    /**
     * Client ID for the OAuth application
     */
    clientId: string;
    /**
     * Client Secret for the OAuth application
     */
    clientSecret: string;
    /**
     * Callback URL for the OAuth flow
     */
    callbackUrl: string;
    /**
     * Authorization URL for the OAuth flow
     */
    authUrl: string;
    /**
     * Token URL for the OAuth flow
     */
    tokenUrl: string;
    /**
     * User info URL for fetching user data
     */
    userInfoUrl: string;
    /**
     * Scopes to request from the provider
     */
    scopes: string[];
    /**
     * Whether to use PKCE (Proof Key for Code Exchange)
     */
    usePKCE: boolean;
    /**
     * Whether the provider is enabled
     */
    enabled: boolean;
    /**
     * Logo/icon for the provider
     */
    icon: string;
    /**
     * Color for the provider button
     */
    color: string;
}
/**
 * Social user profile interface
 */
export interface SocialUserProfile {
    /**
     * Unique ID from the social provider
     */
    id: string;
    /**
     * Email address from the social provider
     */
    email: string;
    /**
     * Display name from the social provider
     */
    name?: string;
    /**
     * First name from the social provider
     */
    firstName?: string;
    /**
     * Last name from the social provider
     */
    lastName?: string;
    /**
     * Avatar URL from the social provider
     */
    avatar?: string;
    /**
     * Provider identifier
     */
    provider: SocialProvider;
    /**
     * Raw profile data from the provider
     */
    raw: Record<string, unknown>;
    /**
     * Whether the email is verified by the provider
     */
    emailVerified: boolean;
    /**
     * Locale/region from the provider
     */
    locale?: string;
    /**
     * Gender from the provider
     */
    gender?: string;
    /**
     * Birthday from the provider
     */
    birthday?: string;
    /**
     * Phone number from the provider
     */
    phoneNumber?: string;
    /**
     * Profile URL from the provider
     */
    profileUrl?: string;
    /**
     * Website URL from the provider
     */
    website?: string;
    /**
     * Country from the provider
     */
    country?: string;
}
/**
 * Social account linking interface
 */
export interface SocialAccountLink {
    /**
     * User ID in the application
     */
    userId: string;
    /**
     * Social provider
     */
    provider: SocialProvider;
    /**
     * Social provider user ID
     */
    providerUserId: string;
    /**
     * Social provider email
     */
    email: string;
    /**
     * Social provider access token
     */
    accessToken: string;
    /**
     * Social provider refresh token
     */
    refreshToken?: string;
    /**
     * Token expiry timestamp
     */
    tokenExpiresAt?: Date;
    /**
     * Social provider user data
     */
    profile: SocialUserProfile;
    /**
     * When the account was linked
     */
    linkedAt: Date;
    /**
     * When the account was last used
     */
    lastUsedAt?: Date;
    /**
     * Whether the account is active
     */
    isActive: boolean;
}
/**
 * Type for scopes configuration
 */
export type SocialScopes = {
    [K in SocialProvider]: readonly string[];
};
/**
 * Helper function to get provider display name
 */
export declare const getProviderDisplayName: (provider: SocialProvider) => string;
/**
 * Helper function to get provider callback URL
 */
export declare const getProviderCallbackUrl: (provider: SocialProvider) => string;
/**
 * Helper function to get provider icon
 */
export declare const getProviderIcon: (provider: SocialProvider) => string;
/**
 * Helper function to get provider color
 */
export declare const getProviderColor: (provider: SocialProvider) => string;
/**
 * Helper function to get provider button text
 */
export declare const getProviderButtonText: (provider: SocialProvider) => string;
/**
 * Helper function to get provider scopes
 * Returns a copy of the scopes array to avoid mutation issues
 */
export declare const getProviderScopes: (provider: SocialProvider) => string[];
/**
 * Helper function to check if provider is supported
 */
export declare const isProviderSupported: (provider: string) => provider is SocialProvider;
/**
 * Helper function to get enabled providers
 */
export declare const getEnabledProviders: () => SocialProvider[];
/**
 * All social constants for export
 */
export declare const SOCIAL_CONSTANTS: {
    readonly PROVIDERS: {
        /**
         * Google OAuth provider
         */
        readonly GOOGLE: "google";
        /**
         * Facebook OAuth provider
         */
        readonly FACEBOOK: "facebook";
        /**
         * GitHub OAuth provider
         */
        readonly GITHUB: "github";
        /**
         * Apple OAuth provider
         */
        readonly APPLE: "apple";
        /**
         * LinkedIn OAuth provider
         */
        readonly LINKEDIN: "linkedin";
        /**
         * Twitter/X OAuth provider
         */
        readonly TWITTER: "twitter";
        /**
         * Microsoft OAuth provider
         */
        readonly MICROSOFT: "microsoft";
        /**
         * Discord OAuth provider
         */
        readonly DISCORD: "discord";
        /**
         * Slack OAuth provider
         */
        readonly SLACK: "slack";
        /**
         * GitLab OAuth provider
         */
        readonly GITLAB: "gitlab";
        /**
         * Amazon OAuth provider
         */
        readonly AMAZON: "amazon";
        /**
         * Spotify OAuth provider
         */
        readonly SPOTIFY: "spotify";
        /**
         * Instagram OAuth provider
         */
        readonly INSTAGRAM: "instagram";
        /**
         * TikTok OAuth provider
         */
        readonly TIKTOK: "tiktok";
        /**
         * Snapchat OAuth provider
         */
        readonly SNAPCHAT: "snapchat";
        /**
         * WeChat OAuth provider
         */
        readonly WECHAT: "wechat";
        /**
         * Line OAuth provider
         */
        readonly LINE: "line";
    };
    readonly PROVIDER_NAMES: {
        readonly google: "Google";
        readonly facebook: "Facebook";
        readonly github: "GitHub";
        readonly apple: "Apple";
        readonly linkedin: "LinkedIn";
        readonly twitter: "Twitter/X";
        readonly microsoft: "Microsoft";
        readonly discord: "Discord";
        readonly slack: "Slack";
        readonly gitlab: "GitLab";
        readonly amazon: "Amazon";
        readonly spotify: "Spotify";
        readonly instagram: "Instagram";
        readonly tiktok: "TikTok";
        readonly snapchat: "Snapchat";
        readonly wechat: "WeChat";
        readonly line: "Line";
    };
    readonly CALLBACK_URLS: {
        readonly google: "/api/auth/callback/google";
        readonly facebook: "/api/auth/callback/facebook";
        readonly github: "/api/auth/callback/github";
        readonly apple: "/api/auth/callback/apple";
        readonly linkedin: "/api/auth/callback/linkedin";
        readonly twitter: "/api/auth/callback/twitter";
        readonly microsoft: "/api/auth/callback/microsoft";
        readonly discord: "/api/auth/callback/discord";
        readonly slack: "/api/auth/callback/slack";
        readonly gitlab: "/api/auth/callback/gitlab";
        readonly amazon: "/api/auth/callback/amazon";
        readonly spotify: "/api/auth/callback/spotify";
        readonly instagram: "/api/auth/callback/instagram";
        readonly tiktok: "/api/auth/callback/tiktok";
        readonly snapchat: "/api/auth/callback/snapchat";
        readonly wechat: "/api/auth/callback/wechat";
        readonly line: "/api/auth/callback/line";
    };
    readonly AUTH_URLS: {
        readonly google: "https://accounts.google.com/o/oauth2/v2/auth";
        readonly facebook: "https://www.facebook.com/v18.0/dialog/oauth";
        readonly github: "https://github.com/login/oauth/authorize";
        readonly apple: "https://appleid.apple.com/auth/authorize";
        readonly linkedin: "https://www.linkedin.com/oauth/v2/authorization";
        readonly twitter: "https://twitter.com/i/oauth2/authorize";
        readonly microsoft: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
        readonly discord: "https://discord.com/api/oauth2/authorize";
        readonly slack: "https://slack.com/oauth/v2/authorize";
        readonly gitlab: "https://gitlab.com/oauth/authorize";
        readonly amazon: "https://www.amazon.com/ap/oa";
        readonly spotify: "https://accounts.spotify.com/authorize";
        readonly instagram: "https://api.instagram.com/oauth/authorize";
        readonly tiktok: "https://www.tiktok.com/auth/authorize";
        readonly snapchat: "https://accounts.snapchat.com/accounts/oauth2/auth";
        readonly wechat: "https://open.weixin.qq.com/connect/qrconnect";
        readonly line: "https://access.line.me/oauth2/v2.1/authorize";
    };
    readonly TOKEN_URLS: {
        readonly google: "https://oauth2.googleapis.com/token";
        readonly facebook: "https://graph.facebook.com/v18.0/oauth/access_token";
        readonly github: "https://github.com/login/oauth/access_token";
        readonly apple: "https://appleid.apple.com/auth/token";
        readonly linkedin: "https://www.linkedin.com/oauth/v2/accessToken";
        readonly twitter: "https://api.twitter.com/2/oauth2/token";
        readonly microsoft: "https://login.microsoftonline.com/common/oauth2/v2.0/token";
        readonly discord: "https://discord.com/api/oauth2/token";
        readonly slack: "https://slack.com/api/oauth.v2.access";
        readonly gitlab: "https://gitlab.com/oauth/token";
        readonly amazon: "https://api.amazon.com/auth/o2/token";
        readonly spotify: "https://accounts.spotify.com/api/token";
        readonly instagram: "https://api.instagram.com/oauth/access_token";
        readonly tiktok: "https://open-api.tiktok.com/oauth/access_token/";
        readonly snapchat: "https://accounts.snapchat.com/accounts/oauth2/token";
        readonly wechat: "https://api.weixin.qq.com/sns/oauth2/access_token";
        readonly line: "https://api.line.me/oauth2/v2.1/token";
    };
    readonly USER_INFO_URLS: {
        readonly google: "https://www.googleapis.com/oauth2/v2/userinfo";
        readonly facebook: "https://graph.facebook.com/me?fields=id,name,email,picture";
        readonly github: "https://api.github.com/user";
        readonly apple: "https://appleid.apple.com/auth/keys";
        readonly linkedin: "https://api.linkedin.com/v2/userinfo";
        readonly twitter: "https://api.twitter.com/2/users/me";
        readonly microsoft: "https://graph.microsoft.com/v1.0/me";
        readonly discord: "https://discord.com/api/users/@me";
        readonly slack: "https://slack.com/api/users.profile.get";
        readonly gitlab: "https://gitlab.com/api/v4/user";
        readonly amazon: "https://api.amazon.com/user/profile";
        readonly spotify: "https://api.spotify.com/v1/me";
        readonly instagram: "https://graph.instagram.com/me";
        readonly tiktok: "https://open-api.tiktok.com/user/info/";
        readonly snapchat: "https://api.snapchat.com/v1/me";
        readonly wechat: "https://api.weixin.qq.com/sns/userinfo";
        readonly line: "https://api.line.me/v2/profile";
    };
    readonly CONFIG: {
        /**
         * Whether social login is enabled
         */
        readonly ENABLED: true;
        /**
         * Whether to allow account linking
         */
        readonly ALLOW_ACCOUNT_LINKING: true;
        /**
         * Whether to allow registration via social providers
         */
        readonly ALLOW_REGISTRATION: true;
        /**
         * Default redirect URI after social login
         */
        readonly DEFAULT_REDIRECT: "/dashboard";
        /**
         * Session TTL for social login sessions
         */
        readonly SESSION_TTL_SECONDS: 3600;
        /**
         * Whether to verify email from social provider
         */
        readonly VERIFY_EMAIL: true;
        /**
         * Whether to use state parameter for CSRF protection
         */
        readonly USE_STATE_PARAMETER: true;
        /**
         * State parameter expiry in seconds
         */
        readonly STATE_EXPIRY_SECONDS: 300;
        /**
         * Scopes to request from each provider
         */
        readonly SCOPES: {
            readonly google: readonly ["profile", "email"];
            readonly facebook: readonly ["email", "public_profile"];
            readonly github: readonly ["user:email"];
            readonly apple: readonly ["name", "email"];
            readonly linkedin: readonly ["profile", "email", "openid"];
            readonly twitter: readonly ["tweet.read", "users.read", "offline.access"];
            readonly microsoft: readonly ["User.Read", "email", "profile"];
            readonly discord: readonly ["identify", "email"];
            readonly slack: readonly ["users.profile:read", "users:read"];
            readonly gitlab: readonly ["read_user"];
            readonly amazon: readonly ["profile", "profile:user_id"];
            readonly spotify: readonly ["user-read-email", "user-read-private"];
            readonly instagram: readonly ["user_profile", "user_media"];
            readonly tiktok: readonly ["user.info.basic"];
            readonly snapchat: readonly ["snapchat:user:read"];
            readonly wechat: readonly ["snsapi_login"];
            readonly line: readonly ["profile", "openid", "email"];
        };
    };
    readonly ICONS: {
        readonly google: "🔵";
        readonly facebook: "🔷";
        readonly github: "🐙";
        readonly apple: "🍎";
        readonly linkedin: "💼";
        readonly twitter: "🐦";
        readonly microsoft: "🪟";
        readonly discord: "🎮";
        readonly slack: "💬";
        readonly gitlab: "🦊";
        readonly amazon: "🛒";
        readonly spotify: "🎵";
        readonly instagram: "📸";
        readonly tiktok: "🎵";
        readonly snapchat: "👻";
        readonly wechat: "💬";
        readonly line: "📱";
    };
    readonly COLORS: {
        readonly google: "#4285F4";
        readonly facebook: "#1877F2";
        readonly github: "#181717";
        readonly apple: "#A2AAAD";
        readonly linkedin: "#0A66C2";
        readonly twitter: "#1DA1F2";
        readonly microsoft: "#00A4EF";
        readonly discord: "#5865F2";
        readonly slack: "#4A154B";
        readonly gitlab: "#FC6D26";
        readonly amazon: "#FF9900";
        readonly spotify: "#1DB954";
        readonly instagram: "#E4405F";
        readonly tiktok: "#010101";
        readonly snapchat: "#FFFC00";
        readonly wechat: "#07C160";
        readonly line: "#00C300";
    };
    readonly BUTTON_TEXT: {
        readonly google: "Continue with Google";
        readonly facebook: "Continue with Facebook";
        readonly github: "Continue with GitHub";
        readonly apple: "Continue with Apple";
        readonly linkedin: "Continue with LinkedIn";
        readonly twitter: "Continue with Twitter/X";
        readonly microsoft: "Continue with Microsoft";
        readonly discord: "Continue with Discord";
        readonly slack: "Continue with Slack";
        readonly gitlab: "Continue with GitLab";
        readonly amazon: "Continue with Amazon";
        readonly spotify: "Continue with Spotify";
        readonly instagram: "Continue with Instagram";
        readonly tiktok: "Continue with TikTok";
        readonly snapchat: "Continue with Snapchat";
        readonly wechat: "Continue with WeChat";
        readonly line: "Continue with Line";
    };
    readonly ERROR_MESSAGES: {
        readonly PROVIDER_NOT_SUPPORTED: "Social provider is not supported";
        readonly PROVIDER_DISABLED: "Social provider is currently disabled";
        readonly AUTH_FAILED: "Social authentication failed";
        readonly TOKEN_EXCHANGE_FAILED: "Failed to exchange authorization code for access token";
        readonly USER_INFO_FETCH_FAILED: "Failed to fetch user information from provider";
        readonly EMAIL_NOT_PROVIDED: "Email address was not provided by the social provider";
        readonly EMAIL_ALREADY_EXISTS: "A user with this email already exists";
        readonly ACCOUNT_LINKING_FAILED: "Failed to link social account";
        readonly ACCOUNT_UNLINKING_FAILED: "Failed to unlink social account";
        readonly INVALID_STATE: "Invalid state parameter - possible CSRF attack";
        readonly EXPIRED_STATE: "State parameter has expired";
        readonly INVALID_CODE: "Invalid authorization code";
        readonly ACCESS_DENIED: "User denied access to their information";
        readonly SCOPE_MISMATCH: "Requested scopes do not match granted scopes";
        readonly RATE_LIMITED: "Rate limit exceeded for social authentication";
        readonly NETWORK_ERROR: "Network error while communicating with social provider";
        readonly UNKNOWN_ERROR: "An unknown error occurred during social authentication";
    };
    readonly SUCCESS_MESSAGES: {
        readonly AUTH_SUCCESS: "Successfully authenticated with social provider";
        readonly ACCOUNT_LINKED: "Social account successfully linked";
        readonly ACCOUNT_UNLINKED: "Social account successfully unlinked";
        readonly REGISTRATION_SUCCESS: "Successfully registered with social provider";
    };
    readonly EVENTS: {
        readonly AUTH_STARTED: "social.auth.started";
        readonly AUTH_SUCCESS: "social.auth.success";
        readonly AUTH_FAILURE: "social.auth.failure";
        readonly AUTH_CANCELLED: "social.auth.cancelled";
        readonly TOKEN_EXCHANGE: "social.token.exchange";
        readonly USER_INFO_FETCHED: "social.user.info.fetched";
        readonly ACCOUNT_LINKED: "social.account.linked";
        readonly ACCOUNT_UNLINKED: "social.account.unlinked";
        readonly ACCOUNT_CREATED: "social.account.created";
        readonly ACCOUNT_UPDATED: "social.account.updated";
    };
};
/**
 * All social constants for export
 */
export declare const ALL_SOCIAL_CONSTANTS: {
    readonly AUTH_STARTED: "social.auth.started";
    readonly AUTH_SUCCESS: "social.auth.success";
    readonly AUTH_FAILURE: "social.auth.failure";
    readonly AUTH_CANCELLED: "social.auth.cancelled";
    readonly TOKEN_EXCHANGE: "social.token.exchange";
    readonly USER_INFO_FETCHED: "social.user.info.fetched";
    readonly ACCOUNT_LINKED: "social.account.linked";
    readonly ACCOUNT_UNLINKED: "social.account.unlinked";
    readonly ACCOUNT_CREATED: "social.account.created";
    readonly ACCOUNT_UPDATED: "social.account.updated";
    readonly REGISTRATION_SUCCESS: "Successfully registered with social provider";
    readonly PROVIDER_NOT_SUPPORTED: "Social provider is not supported";
    readonly PROVIDER_DISABLED: "Social provider is currently disabled";
    readonly AUTH_FAILED: "Social authentication failed";
    readonly TOKEN_EXCHANGE_FAILED: "Failed to exchange authorization code for access token";
    readonly USER_INFO_FETCH_FAILED: "Failed to fetch user information from provider";
    readonly EMAIL_NOT_PROVIDED: "Email address was not provided by the social provider";
    readonly EMAIL_ALREADY_EXISTS: "A user with this email already exists";
    readonly ACCOUNT_LINKING_FAILED: "Failed to link social account";
    readonly ACCOUNT_UNLINKING_FAILED: "Failed to unlink social account";
    readonly INVALID_STATE: "Invalid state parameter - possible CSRF attack";
    readonly EXPIRED_STATE: "State parameter has expired";
    readonly INVALID_CODE: "Invalid authorization code";
    readonly ACCESS_DENIED: "User denied access to their information";
    readonly SCOPE_MISMATCH: "Requested scopes do not match granted scopes";
    readonly RATE_LIMITED: "Rate limit exceeded for social authentication";
    readonly NETWORK_ERROR: "Network error while communicating with social provider";
    readonly UNKNOWN_ERROR: "An unknown error occurred during social authentication";
    readonly google: "Continue with Google";
    readonly facebook: "Continue with Facebook";
    readonly github: "Continue with GitHub";
    readonly apple: "Continue with Apple";
    readonly linkedin: "Continue with LinkedIn";
    readonly twitter: "Continue with Twitter/X";
    readonly microsoft: "Continue with Microsoft";
    readonly discord: "Continue with Discord";
    readonly slack: "Continue with Slack";
    readonly gitlab: "Continue with GitLab";
    readonly amazon: "Continue with Amazon";
    readonly spotify: "Continue with Spotify";
    readonly instagram: "Continue with Instagram";
    readonly tiktok: "Continue with TikTok";
    readonly snapchat: "Continue with Snapchat";
    readonly wechat: "Continue with WeChat";
    readonly line: "Continue with Line";
    /**
     * Whether social login is enabled
     */
    readonly ENABLED: true;
    /**
     * Whether to allow account linking
     */
    readonly ALLOW_ACCOUNT_LINKING: true;
    /**
     * Whether to allow registration via social providers
     */
    readonly ALLOW_REGISTRATION: true;
    /**
     * Default redirect URI after social login
     */
    readonly DEFAULT_REDIRECT: "/dashboard";
    /**
     * Session TTL for social login sessions
     */
    readonly SESSION_TTL_SECONDS: 3600;
    /**
     * Whether to verify email from social provider
     */
    readonly VERIFY_EMAIL: true;
    /**
     * Whether to use state parameter for CSRF protection
     */
    readonly USE_STATE_PARAMETER: true;
    /**
     * State parameter expiry in seconds
     */
    readonly STATE_EXPIRY_SECONDS: 300;
    /**
     * Scopes to request from each provider
     */
    readonly SCOPES: {
        readonly google: readonly ["profile", "email"];
        readonly facebook: readonly ["email", "public_profile"];
        readonly github: readonly ["user:email"];
        readonly apple: readonly ["name", "email"];
        readonly linkedin: readonly ["profile", "email", "openid"];
        readonly twitter: readonly ["tweet.read", "users.read", "offline.access"];
        readonly microsoft: readonly ["User.Read", "email", "profile"];
        readonly discord: readonly ["identify", "email"];
        readonly slack: readonly ["users.profile:read", "users:read"];
        readonly gitlab: readonly ["read_user"];
        readonly amazon: readonly ["profile", "profile:user_id"];
        readonly spotify: readonly ["user-read-email", "user-read-private"];
        readonly instagram: readonly ["user_profile", "user_media"];
        readonly tiktok: readonly ["user.info.basic"];
        readonly snapchat: readonly ["snapchat:user:read"];
        readonly wechat: readonly ["snsapi_login"];
        readonly line: readonly ["profile", "openid", "email"];
    };
    /**
     * Google OAuth provider
     */
    readonly GOOGLE: "google";
    /**
     * Facebook OAuth provider
     */
    readonly FACEBOOK: "facebook";
    /**
     * GitHub OAuth provider
     */
    readonly GITHUB: "github";
    /**
     * Apple OAuth provider
     */
    readonly APPLE: "apple";
    /**
     * LinkedIn OAuth provider
     */
    readonly LINKEDIN: "linkedin";
    /**
     * Twitter/X OAuth provider
     */
    readonly TWITTER: "twitter";
    /**
     * Microsoft OAuth provider
     */
    readonly MICROSOFT: "microsoft";
    /**
     * Discord OAuth provider
     */
    readonly DISCORD: "discord";
    /**
     * Slack OAuth provider
     */
    readonly SLACK: "slack";
    /**
     * GitLab OAuth provider
     */
    readonly GITLAB: "gitlab";
    /**
     * Amazon OAuth provider
     */
    readonly AMAZON: "amazon";
    /**
     * Spotify OAuth provider
     */
    readonly SPOTIFY: "spotify";
    /**
     * Instagram OAuth provider
     */
    readonly INSTAGRAM: "instagram";
    /**
     * TikTok OAuth provider
     */
    readonly TIKTOK: "tiktok";
    /**
     * Snapchat OAuth provider
     */
    readonly SNAPCHAT: "snapchat";
    /**
     * WeChat OAuth provider
     */
    readonly WECHAT: "wechat";
    /**
     * Line OAuth provider
     */
    readonly LINE: "line";
};
//# sourceMappingURL=social.constants.d.ts.map