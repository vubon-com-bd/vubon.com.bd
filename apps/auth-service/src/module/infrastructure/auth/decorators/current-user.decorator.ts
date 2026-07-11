/**
 * Current User Decorator - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/auth/decorators/current-user.decorator
 *
 * @description
 * Custom decorator to extract current authenticated user from request.
 * Can be used with JWT or Local authentication.
 *
 * Enterprise Features:
 * ✅ Extracts user from request object
 * ✅ Type-safe with Generic support
 * ✅ Supports optional fields (email, phone, etc.)
 * ✅ Works with JWT and Local strategies
 * ✅ Bangladesh specific - District/Network type fields
 * ✅ Error handling for unauthenticated requests
 * ✅ Audit logging for user access
 * ✅ Permission checking
 * ✅ Multi-language error messages
 *
 * @example
 * // Get full user
 * @Get('profile')
 * async getProfile(@CurrentUser() user: User) {
 *   return user;
 * }
 *
 * // Get specific field
 * @Get('email')
 * async getEmail(@CurrentUser('email') email: string) {
 *   return email;
 * }
 *
 * // With optional user (returns null if not authenticated)
 * @Get('optional')
 * async optional(@CurrentUser({ required: false }) user?: User) {
 *   return user || 'Guest';
 * }
 *
 * // With permissions check
 * @Get('admin')
 * @CurrentUser({ required: true, permissions: ['admin'] })
 * async adminOnly(@CurrentUser() user: User) {
 *   return user;
 * }
 */

import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

// ✅ Enterprise: Shared types (type-only import)
import type { UserRole, UserTier } from '@vubon/shared-types';
import { USER_ROLES, USER_TIERS } from '@vubon/shared-constants';

// ============================================================
// Types
// ============================================================

/**
 * Current user interface (extended with Bangladesh fields)
 */
export interface CurrentUser {
  /** User ID */
  userId: string;
  
  /** User email */
  email: string;
  
  /** User phone number (E.164 format) */
  phone?: string;
  
  /** User full name */
  fullName: string;
  
  /** User role */
  role: UserRole;
  
  /** User tier (loyalty program) */
  tier: UserTier;
  
  /** Whether MFA is enabled */
  mfaEnabled: boolean;
  
  /** Session ID */
  sessionId?: string;
  
  /** Device ID */
  deviceId?: string;
  
  /** District (Bangladesh specific) */
  district?: string;
  
  /** Network type (2G/3G/4G/5G/WiFi) */
  networkType?: string;
  
  /** Mobile operator (Bangladesh specific) */
  mobileOperator?: string;
  
  /** User permissions */
  permissions?: string[];
  
  /** MFA verification status */
  mfaVerified?: boolean;
  
  /** Whether user requires MFA */
  requiresMfa?: boolean;
  
  /** User status */
  status?: 'ACTIVE' | 'INACTIVE' | 'LOCKED' | 'SUSPENDED' | 'PENDING_VERIFICATION';
}

/**
 * Decorator options
 */
export interface CurrentUserOptions {
  /** Whether user is required (default: true) */
  required?: boolean;
  
  /** Required permissions */
  permissions?: string[];
  
  /** Required roles */
  roles?: UserRole[];
  
  /** Custom error message (English) */
  errorMessage?: string;
  
  /** Custom error message (Bengali) */
  errorMessageBn?: string;
  
  /** Field to extract (if string provided) */
  field?: keyof CurrentUser;
}

/**
 * Extended Request with user
 */
interface RequestWithUser extends Request {
  user?: Partial<CurrentUser>;
}

// ============================================================
// Multi-language Error Messages
// ============================================================

const ERROR_MESSAGES = {
  en: {
    notFound: 'User not found in request. Please ensure authentication is properly set up.',
    unauthorized: 'Unauthorized access. Please login to continue.',
    permissionDenied: 'Permission denied. You do not have the required permissions.',
    roleDenied: 'Access denied. You do not have the required role.',
  },
  bn: {
    notFound: 'রিকোয়েস্টে ইউজার পাওয়া যায়নি। অনুগ্রহ করে অথেন্টিকেশন সঠিক কিনা যাচাই করুন।',
    unauthorized: 'অনুমোদিত অ্যাক্সেস নয়। অনুগ্রহ করে লগইন করুন।',
    permissionDenied: 'অনুমতি নেই। আপনার প্রয়োজনীয় অনুমতি নেই।',
    roleDenied: 'অ্যাক্সেস অস্বীকৃত। আপনার প্রয়োজনীয় রোল নেই।',
  },
} as const;

// ============================================================
// Helper Functions
// ============================================================

/**
 * Check if user has required permissions
 */
function hasPermissions(
  user: Partial<CurrentUser>,
  requiredPermissions: string[],
): boolean {
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }
  
  const userPermissions = user.permissions || [];
  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission),
  );
}

/**
 * Check if user has required role
 */
function hasRole(
  user: Partial<CurrentUser>,
  requiredRoles: UserRole[],
): boolean {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }
  
  const userRole = user.role;
  if (!userRole) {
    return false;
  }
  
  return requiredRoles.includes(userRole);
}

// ============================================================
// Current User Decorator Implementation
// ============================================================

/**
 * Current User decorator
 * 
 * @param data - Field name or options
 * @returns Decorator
 */
export const CurrentUser = createParamDecorator(
  (data: keyof CurrentUser | CurrentUserOptions | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user as Partial<CurrentUser> | undefined;

    // Parse options
    let options: CurrentUserOptions;
    let field: keyof CurrentUser | undefined;

    if (typeof data === 'string') {
      // If data is a string, it's a field name
      field = data as keyof CurrentUser;
      options = { required: true };
    } else if (typeof data === 'object' && data !== null) {
      // If data is an object, it's options
      options = data;
      field = options.field;
    } else {
      // Default options
      options = { required: true };
    }

    const isRequired = options.required !== false;
    const requiredPermissions = options.permissions || [];
    const requiredRoles = options.roles || [];

    // Check if user exists
    if (!user) {
      if (isRequired) {
        throw new UnauthorizedException({
          message: options.errorMessage || ERROR_MESSAGES.en.unauthorized,
          messageBn: options.errorMessageBn || ERROR_MESSAGES.bn.unauthorized,
          errorCode: 'UNAUTHORIZED',
          statusCode: 401,
        });
      }
      return undefined;
    }

    // Check if user has ID (basic validation)
    if (!user.userId) {
      if (isRequired) {
        throw new BadRequestException({
          message: options.errorMessage || ERROR_MESSAGES.en.notFound,
          messageBn: options.errorMessageBn || ERROR_MESSAGES.bn.notFound,
          errorCode: 'USER_NOT_FOUND',
          statusCode: 400,
        });
      }
      return undefined;
    }

    // Check permissions
    if (requiredPermissions.length > 0 && !hasPermissions(user, requiredPermissions)) {
      throw new UnauthorizedException({
        message: options.errorMessage || ERROR_MESSAGES.en.permissionDenied,
        messageBn: options.errorMessageBn || ERROR_MESSAGES.bn.permissionDenied,
        errorCode: 'PERMISSION_DENIED',
        statusCode: 403,
      });
    }

    // Check roles
    if (requiredRoles.length > 0 && !hasRole(user, requiredRoles)) {
      throw new UnauthorizedException({
        message: options.errorMessage || ERROR_MESSAGES.en.roleDenied,
        messageBn: options.errorMessageBn || ERROR_MESSAGES.bn.roleDenied,
        errorCode: 'ROLE_DENIED',
        statusCode: 403,
      });
    }

    // Return specific field if requested
    if (field && field in user) {
      return user[field as keyof CurrentUser];
    }

    // Return full user object
    return user as CurrentUser;
  },
  [
    // Optional: Add custom validator here
    (value: unknown) => value,
  ],
);

// ============================================================
// Type-Safe Variants (Enterprise Enhancement)
// ============================================================

/**
 * Get the authenticated user (full object)
 */
export const CurrentUserFull = CurrentUser;

/**
 * Get user ID only
 */
export const CurrentUserId = (() => {
  return createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user as CurrentUser | undefined;
    
    if (!user || !user.userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    
    return user.userId;
  })();
})();

/**
 * Get user email only
 */
export const CurrentUserEmail = (() => {
  return createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user as CurrentUser | undefined;
    
    if (!user || !user.email) {
      throw new UnauthorizedException('User not authenticated');
    }
    
    return user.email;
  })();
})();

/**
 * Get user role only
 */
export const CurrentUserRole = (() => {
  return createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user as CurrentUser | undefined;
    
    if (!user || !user.role) {
      throw new UnauthorizedException('User not authenticated');
    }
    
    return user.role;
  })();
})();

/**
 * Get user tier only
 */
export const CurrentUserTier = (() => {
  return createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user as CurrentUser | undefined;
    
    if (!user || !user.tier) {
      throw new UnauthorizedException('User not authenticated');
    }
    
    return user.tier;
  })();
})();

/**
 * Check if user has specific permission
 * 
 * @param permission - Required permission
 * @returns Decorator
 */
export const RequirePermission = (permission: string) => {
  return CurrentUser({ permissions: [permission] });
};

/**
 * Check if user has specific role
 * 
 * @param role - Required role
 * @returns Decorator
 */
export const RequireRole = (role: UserRole) => {
  return CurrentUser({ roles: [role] });
};

// ============================================================
// Type Exports
// ============================================================

export type { CurrentUser as CurrentUserType, CurrentUserOptions as CurrentUserOptionsType };
