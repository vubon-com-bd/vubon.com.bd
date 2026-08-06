/**
 * Repositories Exports
 * Central export point for all repository interfaces and types in the auth domain
 */

// Export base repository interface and its associated types
export {
  type IBaseRepository,
  type PaginationOptions,
  type PaginatedResult,
} from './base.repository.interface';

// Export user repository interface
export { type IUserRepository } from './user.repository.interface';

// Export session repository interface
export { type ISessionRepository } from './session.repository.interface';
