/**
 * Authentication Provider Schema
 * Zod schemas for authentication providers
 */

import { z } from 'zod';
import {
  AUTH_PROVIDERS,
  AUTH_PROVIDER_NAMES,
  AUTH_PROVIDER_ICONS,
  AUTH_PROVIDER_COLORS,
  AUTH_PROVIDER_TYPES,
  AUTH_PROVIDER_TYPE_MAP,
  AUTH_PROVIDER_SCOPES,
  SOCIAL_PROVIDERS,
  PROFESSIONAL_PROVIDERS,
  DEVELOPER_PROVIDERS,
  MESSAGING_PROVIDERS,
  type AuthProvider,
  type AuthProviderType,
} from '@vubon/shared-constants';

// ============================================================
// AUTH PROVIDER SCHEMAS
// ============================================================

/**
 * Auth provider schema
 * All supported authentication providers
 */
export const authProviderSchema = z.enum([
  AUTH_PROVIDERS.GOOGLE,
  AUTH_PROVIDERS.FACEBOOK,
  AUTH_PROVIDERS.GITHUB,
  AUTH_PROVIDERS.APPLE,
  AUTH_PROVIDERS.MICROSOFT,
  AUTH_PROVIDERS.TWITTER,
  AUTH_PROVIDERS.LINKEDIN,
]);

/**
 * Auth provider type schema
 */
export const authProviderTypeSchema = z.enum([
  AUTH_PROVIDER_TYPES.SOCIAL,
  AUTH_PROVIDER_TYPES.PROFESSIONAL,
  AUTH_PROVIDER_TYPES.DEVELOPER,
  AUTH_PROVIDER_TYPES.MESSAGING,
  AUTH_PROVIDER_TYPES.ECOMMERCE,
]);

// ============================================================
// AUTH PROVIDER INFO SCHEMA
// ============================================================

/**
 * Auth provider info schema
 */
export const authProviderInfoSchema = z.object({
  name: authProviderSchema,
  displayName: z.string(),
  icon: z.string(),
  color: z.string(),
  type: authProviderTypeSchema,
  isEnabled: z.boolean().default(true),
  isConfigured: z.boolean().default(false),
  scopes: z.array(z.string()),
});

// ============================================================
// AUTH PROVIDER FILTER SCHEMA
// ============================================================

/**
 * Auth provider filter schema
 */
export const authProviderFilterSchema = z.object({
  type: z.union([authProviderTypeSchema, z.array(authProviderTypeSchema)]).optional(),
  isEnabled: z.boolean().optional(),
  isConfigured: z.boolean().optional(),
  search: z.string().optional(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthProviderInfo = z.infer<typeof authProviderInfoSchema>;
export type AuthProviderFilter = z.infer<typeof authProviderFilterSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if authentication provider is valid
 */
export function isValidAuthProvider(provider: string): provider is AuthProvider {
  return Object.values(AUTH_PROVIDERS).includes(provider as AuthProvider);
}

/**
 * Check if authentication provider type is valid
 */
export function isValidAuthProviderType(type: string): type is AuthProviderType {
  return Object.values(AUTH_PROVIDER_TYPES).includes(type as AuthProviderType);
}

/**
 * Get provider display name
 */
export function getAuthProviderDisplayName(provider: AuthProvider): string {
  return AUTH_PROVIDER_NAMES[provider] || provider;
}

/**
 * Get provider icon
 */
export function getAuthProviderIcon(provider: AuthProvider): string {
  return AUTH_PROVIDER_ICONS[provider] || 'link';
}

/**
 * Get provider color
 */
export function getAuthProviderColor(provider: AuthProvider): string {
  return AUTH_PROVIDER_COLORS[provider] || '#000000';
}

/**
 * Get provider type
 */
export function getAuthProviderType(provider: AuthProvider): AuthProviderType {
  return AUTH_PROVIDER_TYPE_MAP[provider] || AUTH_PROVIDER_TYPES.SOCIAL;
}

/**
 * Get provider scopes
 */
export function getAuthProviderScopes(provider: AuthProvider): string[] {
  return AUTH_PROVIDER_SCOPES[provider] || [];
}

/**
 * Check if provider is social media
 */
export function isAuthProviderSocial(provider: AuthProvider): boolean {
  return SOCIAL_PROVIDERS.includes(provider);
}

/**
 * Check if provider is professional
 */
export function isAuthProviderProfessional(provider: AuthProvider): boolean {
  return PROFESSIONAL_PROVIDERS.includes(provider);
}

/**
 * Check if provider is developer
 */
export function isAuthProviderDeveloper(provider: AuthProvider): boolean {
  return DEVELOPER_PROVIDERS.includes(provider);
}

/**
 * Check if provider is messaging
 */
export function isAuthProviderMessaging(provider: AuthProvider): boolean {
  return MESSAGING_PROVIDERS.includes(provider);
}

/**
 * Get all authentication providers
 */
export function getAllAuthProviders(): AuthProvider[] {
  return Object.values(AUTH_PROVIDERS);
}

/**
 * Get providers by type
 */
export function getAuthProvidersByType(type: AuthProviderType): AuthProvider[] {
  return Object.keys(AUTH_PROVIDER_TYPE_MAP)
    .filter((key) => AUTH_PROVIDER_TYPE_MAP[key] === type)
    .map((key) => key as AuthProvider);
}

/**
 * Get provider info
 */
export function getAuthProviderInfo(provider: AuthProvider): AuthProviderInfo {
  return {
    name: provider,
    displayName: getAuthProviderDisplayName(provider),
    icon: getAuthProviderIcon(provider),
    color: getAuthProviderColor(provider),
    type: getAuthProviderType(provider),
    isEnabled: true,
    isConfigured: false,
    scopes: getAuthProviderScopes(provider),
  };
}

/**
 * Get all providers info
 */
export function getAllAuthProvidersInfo(): AuthProviderInfo[] {
  return getAllAuthProviders().map((provider) => getAuthProviderInfo(provider));
}

/**
 * Get providers by filter
 */
export function getAuthProvidersByFilter(filter: AuthProviderFilter): AuthProvider[] {
  let providers = getAllAuthProviders();

  if (filter.type) {
    const types = Array.isArray(filter.type) ? filter.type : [filter.type];
    providers = providers.filter((provider) => types.includes(getAuthProviderType(provider)));
  }

  if (filter.isEnabled !== undefined) {
    // In a real implementation, you'd check the provider's enabled status from a config
    // For now, we assume all are enabled
    providers = providers.filter(() => filter.isEnabled);
  }

  if (filter.isConfigured !== undefined) {
    // In a real implementation, you'd check the provider's configured status
    // For now, we assume none are configured
    providers = providers.filter(() => !filter.isConfigured);
  }

  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    providers = providers.filter(
      (provider) =>
        provider.toLowerCase().includes(searchLower) ||
        getAuthProviderDisplayName(provider).toLowerCase().includes(searchLower)
    );
  }

  return providers;
}

/**
 * Validate provider type map
 */
export function validateAuthProviderTypeMap(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const providers = getAllAuthProviders();

  providers.forEach((provider) => {
    const type = getAuthProviderType(provider);
    if (!isValidAuthProviderType(type)) {
      errors.push(`Provider '${provider}' has invalid type '${type}'`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
