/**
 * User-related type definitions for authentication
 * All types are strictly defined for type safety
 */

import type { UserRole, UserStatus } from '@vubon/auth-shared-constants';

/**
 * Core User entity representing a registered user in the system
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  phone?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Request payload for creating a new user
 * Used during registration process
 */
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
}

/**
 * Response payload after user creation
 * Excludes sensitive data like password hash
 */
export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  phone?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User profile update payload
 * Partial update with optional fields
 */
export interface UpdateUserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  metadata?: Record<string, unknown> | null;
}
