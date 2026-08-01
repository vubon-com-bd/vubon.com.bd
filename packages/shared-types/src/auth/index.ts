// packages/shared-types/src/auth/index.ts
/**
 * Auth types module exports
 * Central export point for all authentication-related types
 */

// Export all user types
export type {
  UserStatus,
  UserRole,
  UserPreferences,
  User,
  CreateUserRequest,
  UpdateProfileRequest,
  DeleteAccountRequest,
  AdminUserListResponse,
  AdminUserFilters,
  AdminUserUpdateRequest,
  AdminCreateUserRequest,
  UserAuthContext,
  UserSession,
  UserActivity,
  UserNotificationSettings,
  UserSecuritySettings,
  UserApiKey,
  UserSearchParams,
  UserBulkOperation,
  UserExportOptions,
  UserImportResult,
  UserId,
  UserEmail,
  UserPhone,
  UserUpdateData,
  UserRegistrationData,
  UserLoginData,
  UserPasswordResetData,
  UserEmailVerificationData,
  UserPublicData,
} from './user.types';

// Export utility functions
export { isUserActive, isUserAdmin, hasUserRole, hasAnyUserRole } from './user.types';
