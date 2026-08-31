/**
 * Authentication Method Schema
 * Zod schemas for authentication methods
 */

import { z } from 'zod';
import {
  AUTH_METHODS,
  AUTH_METHOD_LABELS,
  AUTH_METHOD_HTTP_VERBS,
  AUTH_METHOD_CATEGORIES,
  AUTH_METHOD_CATEGORY_MAP,
  PUBLIC_AUTH_METHODS,
  PROTECTED_AUTH_METHODS,
  type AuthMethod,
  type AuthMethodCategory,
} from '@vubon/shared-constants';

// ============================================================
// AUTH METHOD SCHEMAS
// ============================================================

/**
 * Auth method schema
 * All supported authentication methods
 */
export const authMethodSchema = z.enum([
  AUTH_METHODS.LOGIN,
  AUTH_METHODS.REGISTER,
  AUTH_METHODS.LOGOUT,
  AUTH_METHODS.REFRESH,
  AUTH_METHODS.VERIFY,
  AUTH_METHODS.RESET_PASSWORD,
  AUTH_METHODS.FORGOT_PASSWORD,
  AUTH_METHODS.CHANGE_PASSWORD,
  AUTH_METHODS.ENABLE_2FA,
  AUTH_METHODS.DISABLE_2FA,
  AUTH_METHODS.VERIFY_2FA,
]);

/**
 * Auth method category schema
 */
export const authMethodCategorySchema = z.enum([
  AUTH_METHOD_CATEGORIES.CORE,
  AUTH_METHOD_CATEGORIES.PASSWORD,
  AUTH_METHOD_CATEGORIES.MFA,
  AUTH_METHOD_CATEGORIES.VERIFICATION,
  AUTH_METHOD_CATEGORIES.SOCIAL_SSO,
  AUTH_METHOD_CATEGORIES.TOKEN,
  AUTH_METHOD_CATEGORIES.SESSION,
  AUTH_METHOD_CATEGORIES.DEVICE,
]);

/**
 * Auth method HTTP verb schema
 */
export const authMethodHttpVerbSchema = z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);

// ============================================================
// AUTH METHOD INFO SCHEMA
// ============================================================

/**
 * Auth method info schema
 */
export const authMethodInfoSchema = z.object({
  name: authMethodSchema,
  displayName: z.string(),
  httpMethod: authMethodHttpVerbSchema,
  requiresAuth: z.boolean(),
  isPublic: z.boolean(),
  category: authMethodCategorySchema,
});

// ============================================================
// AUTH METHOD FILTER SCHEMA
// ============================================================

/**
 * Auth method filter schema
 */
export const authMethodFilterSchema = z.object({
  category: z.union([authMethodCategorySchema, z.array(authMethodCategorySchema)]).optional(),
  requiresAuth: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  httpMethod: z.union([authMethodHttpVerbSchema, z.array(authMethodHttpVerbSchema)]).optional(),
  search: z.string().optional(),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthMethodInfo = z.infer<typeof authMethodInfoSchema>;
export type AuthMethodFilter = z.infer<typeof authMethodFilterSchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if authentication method is valid
 */
export function isValidAuthMethod(method: string): method is AuthMethod {
  return Object.values(AUTH_METHODS).includes(method as AuthMethod);
}

/**
 * Check if authentication method category is valid
 */
export function isValidAuthMethodCategory(category: string): category is AuthMethodCategory {
  return Object.values(AUTH_METHOD_CATEGORIES).includes(category as AuthMethodCategory);
}

/**
 * Get method display name
 */
export function getAuthMethodDisplayName(method: AuthMethod): string {
  return AUTH_METHOD_LABELS[method] || method;
}

/**
 * Get method HTTP verb
 */
export function getAuthMethodHttpVerb(method: AuthMethod): string {
  return AUTH_METHOD_HTTP_VERBS[method] || 'POST';
}

/**
 * Get method category
 */
export function getAuthMethodCategory(method: AuthMethod): AuthMethodCategory {
  return AUTH_METHOD_CATEGORY_MAP[method] || AUTH_METHOD_CATEGORIES.CORE;
}

/**
 * Check if method is public (doesn't require authentication)
 */
export function isAuthMethodPublic(method: AuthMethod): boolean {
  return PUBLIC_AUTH_METHODS.includes(method);
}

/**
 * Check if method is protected (requires authentication)
 */
export function isAuthMethodProtected(method: AuthMethod): boolean {
  return PROTECTED_AUTH_METHODS.includes(method);
}

/**
 * Get all authentication methods
 */
export function getAllAuthMethods(): AuthMethod[] {
  return Object.values(AUTH_METHODS);
}

/**
 * Get public authentication methods
 */
export function getPublicAuthMethods(): AuthMethod[] {
  return PUBLIC_AUTH_METHODS as unknown as AuthMethod[];
}

/**
 * Get protected authentication methods
 */
export function getProtectedAuthMethods(): AuthMethod[] {
  return PROTECTED_AUTH_METHODS as unknown as AuthMethod[];
}

/**
 * Get methods by category
 */
export function getAuthMethodsByCategory(category: AuthMethodCategory): AuthMethod[] {
  return Object.keys(AUTH_METHOD_CATEGORY_MAP)
    .filter((key) => AUTH_METHOD_CATEGORY_MAP[key] === category)
    .map((key) => key as AuthMethod);
}

/**
 * Get method info
 */
export function getAuthMethodInfo(method: AuthMethod): AuthMethodInfo {
  return {
    name: method,
    displayName: getAuthMethodDisplayName(method),
    httpMethod: getAuthMethodHttpVerb(method) as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    requiresAuth: isAuthMethodProtected(method),
    isPublic: isAuthMethodPublic(method),
    category: getAuthMethodCategory(method),
  };
}

/**
 * Get all methods info
 */
export function getAllAuthMethodsInfo(): AuthMethodInfo[] {
  return getAllAuthMethods().map((method) => getAuthMethodInfo(method));
}

/**
 * Get methods by filter
 */
export function getAuthMethodsByFilter(filter: AuthMethodFilter): AuthMethod[] {
  let methods = getAllAuthMethods();

  if (filter.category) {
    const categories = Array.isArray(filter.category) ? filter.category : [filter.category];
    methods = methods.filter((method) => categories.includes(getAuthMethodCategory(method)));
  }

  if (filter.requiresAuth !== undefined) {
    methods = methods.filter((method) =>
      filter.requiresAuth ? isAuthMethodProtected(method) : isAuthMethodPublic(method)
    );
  }

  if (filter.isPublic !== undefined) {
    methods = methods.filter((method) =>
      filter.isPublic ? isAuthMethodPublic(method) : isAuthMethodProtected(method)
    );
  }

  if (filter.httpMethod) {
    const httpMethods = Array.isArray(filter.httpMethod) ? filter.httpMethod : [filter.httpMethod];
    methods = methods.filter((method) =>
      httpMethods.includes(
        getAuthMethodHttpVerb(method) as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      )
    );
  }

  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    methods = methods.filter(
      (method) =>
        method.toLowerCase().includes(searchLower) ||
        getAuthMethodDisplayName(method).toLowerCase().includes(searchLower)
    );
  }

  return methods;
}

/**
 * Validate method category map
 */
export function validateAuthMethodCategoryMap(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const methods = getAllAuthMethods();

  methods.forEach((method) => {
    const category = getAuthMethodCategory(method);
    if (!isValidAuthMethodCategory(category)) {
      errors.push(`Method '${method}' has invalid category '${category}'`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
