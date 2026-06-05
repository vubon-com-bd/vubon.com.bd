/**
 * GitHub OAuth Configuration - Pure readonly OAuth metadata
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/oauth/github.config
 * 
 * RULES:
 * ✅ ONLY OAuth configuration - NO business logic
 * ✅ NO OAuth implementation, token exchange, API calls
 * ✅ Readonly frozen config
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import { env } from '../env/env.validation';

// ==================== Constants ====================

export const GITHUB_PROVIDER_NAME = 'github';
export const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
export const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
export const GITHUB_USER_INFO_URL = 'https://api.github.com/user';
export const GITHUB_USER_EMAIL_URL = 'https://api.github.com/user/emails';
export const GITHUB_REVOKE_URL = 'https://api.github.com/applications/{client_id}/grant';

// GitHub API version
export const GITHUB_API_VERSION = '2022-11-28';

// ==================== Scopes ====================

export const GITHUB_SCOPES = {
  /** Read access to user's public profile information */
  READ_USER: 'read:user',
  /** Read access to user's email addresses (private and public) */
  USER_EMAIL: 'user:email',
  /** Full access to user's profile (including private info) */
  USER: 'user',
  /** Read access to user's organization memberships */
  READ_ORG: 'read:org',
  /** Write access to user's repositories */
  REPO: 'repo',
  /** Write access to user's gists */
  GIST: 'gist',
  /** Read access to user's notifications */
  NOTIFICATIONS: 'notifications',
  /** Admin access to user's projects */
  PROJECT: 'project',
} as const;

export const GITHUB_DEFAULT_SCOPES = [
  GITHUB_SCOPES.READ_USER,
  GITHUB_SCOPES.USER_EMAIL,
] as const;

// ==================== Response Types ====================

export const GITHUB_RESPONSE_TYPES = {
  CODE: 'code',
} as const;

export const GITHUB_DEFAULT_RESPONSE_TYPE = GITHUB_RESPONSE_TYPES.CODE;

// ==================== Grant Types ====================

export const GITHUB_GRANT_TYPES = {
  AUTHORIZATION_CODE: 'authorization_code',
  REFRESH_TOKEN: 'refresh_token',
} as const;

// ==================== Configuration ====================

export const githubOAuthConfig = Object.freeze({
  // Basic provider info
  provider: GITHUB_PROVIDER_NAME,
  providerName: 'GitHub',
  providerDisplayName: 'GitHub',
  
  // OAuth endpoints
  authUrl: GITHUB_AUTH_URL,
  tokenUrl: GITHUB_TOKEN_URL,
  userInfoUrl: GITHUB_USER_INFO_URL,
  userEmailUrl: GITHUB_USER_EMAIL_URL,
  revokeUrl: GITHUB_REVOKE_URL,
  
  // Client credentials (from environment)
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
  callbackUrl: env.GITHUB_CALLBACK_URL,
  
  // OAuth parameters
  scopes: GITHUB_DEFAULT_SCOPES,
  responseType: GITHUB_DEFAULT_RESPONSE_TYPE,
  
  // GitHub specific
  apiVersion: GITHUB_API_VERSION,
  allowSignup: true,
  grantTypes: GITHUB_GRANT_TYPES,
  
  // User info fields to request
  userInfoFields: [
    'id',
    'login',
    'name',
    'email',
    'avatar_url',
    'bio',
    'company',
    'location',
    'blog',
    'twitter_username',
    'followers',
    'following',
    'public_repos',
    'public_gists',
    'created_at',
    'updated_at',
  ] as const,
  
  // Email fields
  emailFields: [
    'email',
    'primary',
    'verified',
    'visibility',
  ] as const,
  
  // User info mapping (GitHub -> our system)
  userInfoMapping: {
    id: 'id',
    login: 'login',
    name: 'name',
    email: 'email',
    avatar: 'avatar_url',
    bio: 'bio',
    company: 'company',
    location: 'location',
    website: 'blog',
    twitter: 'twitter_username',
    followers: 'followers',
    following: 'following',
    publicRepos: 'public_repos',
    publicGists: 'public_gists',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  } as const,
  
  // Email mapping
  emailMapping: {
    email: 'email',
    isPrimary: 'primary',
    isVerified: 'verified',
    visibility: 'visibility',
  } as const,
}) as const;

// ==================== Helper Functions ====================

/**
 * Check if GitHub OAuth is configured (has required credentials)
 */
export const isGitHubOAuthConfigured = (): boolean => {
  return !!(
    env.GITHUB_CLIENT_ID &&
    env.GITHUB_CLIENT_SECRET &&
    env.GITHUB_CALLBACK_URL
  );
};

/**
 * Get GitHub login URL with parameters
 * Pure function - no side effects
 */
export const getGitHubLoginUrl = (state: string, allowSignup?: boolean): string => {
  const params = new URLSearchParams({
    client_id: githubOAuthConfig.clientId,
    redirect_uri: githubOAuthConfig.callbackUrl,
    response_type: githubOAuthConfig.responseType,
    scope: githubOAuthConfig.scopes.join(' '),
    state,
    allow_signup: (allowSignup ?? githubOAuthConfig.allowSignup).toString(),
  });
  
  return `${GITHUB_AUTH_URL}?${params.toString()}`;
};

/**
 * Get revoke URL with client ID placeholder replaced
 */
export const getRevokeUrl = (): string => {
  return GITHUB_REVOKE_URL.replace('{client_id}', githubOAuthConfig.clientId);
};

/**
 * ✅ FIXED: Extract primary email from GitHub emails response
 * 
 * @param emails - Array of GitHub email objects
 * @returns Primary email info or null
 * 
 * @example
 * extractPrimaryEmail([
 *   { email: 'primary@example.com', primary: true, verified: true, visibility: 'public' },
 *   { email: 'secondary@example.com', primary: false, verified: true, visibility: null }
 * ])
 * // Returns: { email: 'primary@example.com', isVerified: true, visibility: 'public' }
 */
export const extractPrimaryEmail = (emails: Array<{
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}>): { email: string; isVerified: boolean; visibility: string | null } | null => {
  const primaryEmail = emails.find(e => e.primary);
  if (!primaryEmail) return null;
  return {
    email: primaryEmail.email,
    isVerified: primaryEmail.verified,
    visibility: primaryEmail.visibility,
  };
};

/**
 * ✅ FIXED: Extract user info from GitHub API response
 * 
 * @param data - Raw GitHub user data
 * @returns Normalized user info
 * 
 * @example
 * extractGitHubUserInfo({
 *   id: 123456,
 *   login: 'username',
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   avatar_url: 'https://...',
 *   followers: 100,
 *   following: 50
 * })
 */
export const extractGitHubUserInfo = (data: {
  id: number;
  login: string;
  name?: string | null;
  email?: string | null;
  avatar_url?: string;
  bio?: string | null;
  company?: string | null;
  location?: string | null;
  blog?: string | null;
  twitter_username?: string | null;
  followers?: number;
  following?: number;
  public_repos?: number;
  public_gists?: number;
  created_at?: string;
  updated_at?: string;
}): {
  id: string;
  login: string;
  name: string | null;
  email: string | null;
  avatar: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  website: string | null;
  twitter: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  publicGists: number;
  createdAt: string | null;
  updatedAt: string | null;
} => {
  return {
    id: String(data.id),
    login: data.login,
    name: data.name || null,
    email: data.email || null,
    avatar: data.avatar_url || null,
    bio: data.bio || null,
    company: data.company || null,
    location: data.location || null,
    website: data.blog || null,
    twitter: data.twitter_username || null,
    followers: data.followers || 0,
    following: data.following || 0,
    publicRepos: data.public_repos || 0,
    publicGists: data.public_gists || 0,
    createdAt: data.created_at || null,
    updatedAt: data.updated_at || null,
  };
};

/**
 * Get user info URL with custom headers note
 * GitHub API requires Accept header for proper response
 */
export const getUserInfoUrl = (): string => {
  return GITHUB_USER_INFO_URL;
};

/**
 * Get required headers for GitHub API requests
 */
export const getGitHubApiHeaders = (accessToken: string): Record<string, string> => {
  return {
    'Authorization': `Bearer ${accessToken}`,
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
  };
};

/**
 * Get emails URL
 */
export const getUserEmailsUrl = (): string => {
  return GITHUB_USER_EMAIL_URL;
};

// ==================== Type Exports ====================

export type GitHubScope = typeof GITHUB_SCOPES[keyof typeof GITHUB_SCOPES];
export type GitHubResponseType = typeof GITHUB_RESPONSE_TYPES[keyof typeof GITHUB_RESPONSE_TYPES];
export type GitHubGrantType = typeof GITHUB_GRANT_TYPES[keyof typeof GITHUB_GRANT_TYPES];
export type GitHubOAuthConfig = typeof githubOAuthConfig;

// ==================== Extracted Types ====================

export type ExtractedGitHubUserInfo = ReturnType<typeof extractGitHubUserInfo>;
export type ExtractedPrimaryEmail = ReturnType<typeof extractPrimaryEmail>;
export type GitHubApiHeaders = ReturnType<typeof getGitHubApiHeaders>;
