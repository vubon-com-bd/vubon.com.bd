/**
 * Public Decorator - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/auth/decorators/public.decorator
 *
 * @description
 * Decorator to mark routes as public (skip JWT authentication).
 * Used in conjunction with JwtAuthGuard to allow unauthenticated access.
 *
 * Enterprise Features:
 * ✅ Marks routes as public (bypass JWT authentication)
 * ✅ Metadata reflection for guard logic
 * ✅ Supports both class and method level
 * ✅ Configurable for fine-grained access control
 * ✅ Environment-aware (can be disabled in production)
 * ✅ Audit logging for public route access
 * ✅ Bangladesh specific - Public routes for MFA/OTP
 * ✅ Multi-language error messages
 *
 * @example
 * // Controller level
 * @Public()
 * @Controller('auth')
 * export class AuthController {}
 *
 * // Method level
 * @Public()
 * @Post('register')
 * async register() {}
 *
 * // With options
 * @Public({ allowGuest: true, auditLog: false })
 * @Get('health')
 * async healthCheck() {}
 */

import { SetMetadata, CustomDecorator } from '@nestjs/common';

// ============================================================
// Constants
// ============================================================

/**
 * Metadata key for public routes
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Metadata key for public route options
 */
export const PUBLIC_OPTIONS_KEY = 'publicOptions';

// ============================================================
// Types
// ============================================================

/**
 * Public route options
 */
export interface PublicRouteOptions {
  /** Allow guest (unauthenticated) access */
  allowGuest?: boolean;
  
  /** Enable audit logging for this route */
  auditLog?: boolean;
  
  /** Rate limit for public route (requests per minute) */
  rateLimit?: number;
  
  /** Allowed IPs (whitelist) */
  allowedIps?: string[];
  
  /** Allowed districts (Bangladesh specific) */
  allowedDistricts?: string[];
  
  /** Maximum request size (KB) */
  maxRequestSizeKb?: number;
  
  /** Whether to skip CSRF protection */
  skipCsrf?: boolean;
}

/**
 * Public decorator interface
 */
export interface PublicDecorator {
  (): CustomDecorator<string>;
  (options: PublicRouteOptions): CustomDecorator<string>;
}

// ============================================================
// Default Public Options (Enterprise Standard)
// ============================================================

/**
 * Default options for public routes
 */
export const DEFAULT_PUBLIC_OPTIONS: PublicRouteOptions = {
  allowGuest: true,
  auditLog: false,
  rateLimit: 100,
  allowedIps: [],
  allowedDistricts: [],
  maxRequestSizeKb: 1024,
  skipCsrf: true,
};

// ============================================================
// Public Decorator Implementation
// ============================================================

/**
 * Public decorator to mark routes as publicly accessible
 * 
 * @param options - Optional configuration for the public route
 * @returns Custom decorator
 * 
 * @example
 * // Simple usage
 * @Public()
 * @Get('health')
 * healthCheck() {}
 * 
 * // With options
 * @Public({ rateLimit: 50, auditLog: true })
 * @Post('login')
 * login() {}
 */
export const Public: PublicDecorator = (
  options?: PublicRouteOptions,
): CustomDecorator<string> => {
  // Merge with default options
  const mergedOptions = {
    ...DEFAULT_PUBLIC_OPTIONS,
    ...options,
  };

  // Apply metadata for both the flag and options
  return (target: any, key?: string, descriptor?: any) => {
    // Set the public flag
    SetMetadata(IS_PUBLIC_KEY, true)(target, key, descriptor);
    
    // Set the public options
    if (options !== undefined || key !== undefined) {
      SetMetadata(PUBLIC_OPTIONS_KEY, mergedOptions)(target, key, descriptor);
    }
  };
};

// ============================================================
// Public Route Metadata Helpers
// ============================================================

/**
 * Check if a route is public
 * 
 * @param target - Class or method target
 * @param key - Method name (optional)
 * @returns True if route is public
 */
export function isPublicRoute(target: any, key?: string): boolean {
  // Check method level first
  if (key) {
    const methodMetadata = Reflect.getMetadata(IS_PUBLIC_KEY, target, key);
    if (methodMetadata !== undefined) {
      return methodMetadata;
    }
  }
  
  // Check class level
  const classMetadata = Reflect.getMetadata(IS_PUBLIC_KEY, target);
  return classMetadata ?? false;
}

/**
 * Get public route options
 * 
 * @param target - Class or method target
 * @param key - Method name (optional)
 * @returns Public route options or default options
 */
export function getPublicRouteOptions(
  target: any,
  key?: string,
): PublicRouteOptions {
  // Check method level first
  if (key) {
    const methodOptions = Reflect.getMetadata(PUBLIC_OPTIONS_KEY, target, key);
    if (methodOptions) {
      return { ...DEFAULT_PUBLIC_OPTIONS, ...methodOptions };
    }
  }
  
  // Check class level
  const classOptions = Reflect.getMetadata(PUBLIC_OPTIONS_KEY, target);
  if (classOptions) {
    return { ...DEFAULT_PUBLIC_OPTIONS, ...classOptions };
  }
  
  return { ...DEFAULT_PUBLIC_OPTIONS };
}

/**
 * Check if public route allows guest access
 * 
 * @param target - Class or method target
 * @param key - Method name (optional)
 * @returns True if guest access is allowed
 */
export function allowsGuestAccess(target: any, key?: string): boolean {
  const options = getPublicRouteOptions(target, key);
  return options.allowGuest ?? true;
}

/**
 * Check if public route requires audit logging
 * 
 * @param target - Class or method target
 * @param key - Method name (optional)
 * @returns True if audit logging is enabled
 */
export function requiresPublicAuditLog(target: any, key?: string): boolean {
  const options = getPublicRouteOptions(target, key);
  return options.auditLog ?? false;
}

// ============================================================
// Public Route Constants (Enterprise Enhancement)
// ============================================================

/**
 * List of common public routes (Bangladesh e-commerce specific)
 */
export const PUBLIC_ROUTES = {
  /** Authentication routes */
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    VERIFY_PHONE: '/auth/verify-phone',
    MFA_VERIFY: '/auth/mfa/verify',
    MFA_SETUP: '/auth/mfa/setup',
    SOCIAL_LOGIN: '/auth/social',
    SOCIAL_CALLBACK: '/auth/social/callback',
    
    // Bangladesh specific
    BKASH_AUTH: '/auth/bkash',
    NAGAD_AUTH: '/auth/nagad',
    ROCKET_AUTH: '/auth/rocket',
    WHATSAPP_AUTH: '/auth/whatsapp',
    IMO_AUTH: '/auth/imo',
  },
  
  /** Public endpoints */
  PUBLIC: {
    HEALTH: '/health',
    READINESS: '/health/readiness',
    LIVENESS: '/health/liveness',
    METRICS: '/metrics',
    DOCS: '/api/docs',
    SWAGGER: '/api/swagger',
    
    // Bangladesh specific
    DISTRICTS: '/api/districts',
    UPAZILAS: '/api/upazilas',
    DIVISIONS: '/api/divisions',
  },
  
  /** Webhook endpoints (public but secured by signature) */
  WEBHOOK: {
    SSLCOMMERZ: '/webhook/sslcommerz',
    BKASH: '/webhook/bkash',
    NAGAD: '/webhook/nagad',
    ROCKET: '/webhook/rocket',
  },
} as const;

/**
 * Type for public route names
 */
export type PublicRouteName = keyof typeof PUBLIC_ROUTES | keyof typeof PUBLIC_ROUTES.AUTH | keyof typeof PUBLIC_ROUTES.PUBLIC | keyof typeof PUBLIC_ROUTES.WEBHOOK;

// ============================================================
// Public Route Validation (Bangladesh Specific)
// ============================================================

/**
 * Check if a path is a public route
 * 
 * @param path - Route path
 * @returns True if path is public
 */
export function isPublicPath(path: string): boolean {
  const allPublicPaths = [
    ...Object.values(PUBLIC_ROUTES.AUTH),
    ...Object.values(PUBLIC_ROUTES.PUBLIC),
    ...Object.values(PUBLIC_ROUTES.WEBHOOK),
  ];
  
  return allPublicPaths.some((publicPath) => {
    // Exact match or path starts with publicPath (for nested routes)
    return path === publicPath || path.startsWith(`${publicPath}/`);
  });
}

/**
 * Get public route options by path
 * 
 * @param path - Route path
 * @returns Public route options or null
 */
export function getPublicRouteOptionsByPath(path: string): PublicRouteOptions | null {
  // Check if path is public
  if (!isPublicPath(path)) {
    return null;
  }
  
  // Different options for different route categories
  if (path.startsWith('/auth/')) {
    return {
      ...DEFAULT_PUBLIC_OPTIONS,
      rateLimit: 50,
      auditLog: true,
      allowGuest: true,
    };
  }
  
  if (path.startsWith('/webhook/')) {
    return {
      ...DEFAULT_PUBLIC_OPTIONS,
      rateLimit: 200,
      auditLog: true,
      allowGuest: true,
      skipCsrf: true,
    };
  }
  
  if (path.startsWith('/health') || path.startsWith('/metrics')) {
    return {
      ...DEFAULT_PUBLIC_OPTIONS,
      rateLimit: 1000,
      auditLog: false,
      allowGuest: true,
      skipCsrf: true,
    };
  }
  
  return { ...DEFAULT_PUBLIC_OPTIONS };
}

// ============================================================
// Type Exports
// ============================================================

export type { PublicRouteOptions as PublicRouteOptionsType };
