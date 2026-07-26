/**
 * Shared types for authentication module
 * Exports all types from the shared-types package
 */

// Export authentication types
export type {
  User,
  CreateUserRequest,
  UserResponse,
  UpdateUserProfile,
} from './auth/user.types.js';

// Export common API types
export type {
  ApiResponse,
  ApiErrorResponse,
  PaginatedResponse,
  EmptyResponse,
  RegisterResponse,
} from './common/api.types.js';

// Export utility functions
export { isSuccessResponse } from './common/api.types.js';
