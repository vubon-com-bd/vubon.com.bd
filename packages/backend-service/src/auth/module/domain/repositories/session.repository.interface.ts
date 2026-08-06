import type { Session } from '../entities/session.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { SessionStatus } from '../entities/session.entity';
import type { DeviceId } from '../value-objects';

/**
 * Session Repository Interface
 * Extends the base repository with session-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface ISessionRepository extends IBaseRepository<Session> {
  /**
   * Find all sessions for a specific user
   * @param userId - The unique identifier of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing sessions and total count
   */
  findByUserId(
    userId: string,
    page: number,
    limit: number
  ): Promise<{
    items: Session[];
    total: number;
  }>;

  /**
   * Find all active sessions for a specific user
   * @param userId - The unique identifier of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing active sessions and total count
   */
  findActiveSessions(
    userId: string,
    page: number,
    limit: number
  ): Promise<{
    items: Session[];
    total: number;
  }>;

  /**
   * Find all sessions by device ID (Value Object)
   * @param deviceId - The DeviceId value object of the device
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing sessions and total count
   */
  findByDeviceId(
    deviceId: DeviceId,
    page: number,
    limit: number
  ): Promise<{
    items: Session[];
    total: number;
  }>;

  /**
   * Find a session by its refresh token
   * @param refreshToken - The refresh token string to search for
   * @returns The found session or null if not found
   */
  findByRefreshToken(refreshToken: string): Promise<Session | null>;

  /**
   * Revoke a specific session
   * @param id - The unique identifier of the session to revoke
   * @param reason - Optional reason for revocation
   * @returns True if revocation was successful, false if session not found
   */
  revoke(id: string, reason?: string): Promise<boolean>;

  /**
   * Revoke all sessions for a specific user
   * @param userId - The unique identifier of the user
   * @param exceptSessionId - Optional session ID to exclude from revocation
   * @param reason - Optional reason for revocation
   * @returns Number of sessions revoked
   */
  revokeAllByUserId(userId: string, exceptSessionId?: string, reason?: string): Promise<number>;

  /**
   * Revoke all sessions for a specific device (Value Object)
   * @param deviceId - The DeviceId value object of the device
   * @param userId - The unique identifier of the user (optional, for additional filtering)
   * @param reason - Optional reason for revocation
   * @returns Number of sessions revoked
   */
  revokeAllByDeviceId(deviceId: DeviceId, userId?: string, reason?: string): Promise<number>;

  /**
   * Revoke all expired sessions
   * @returns Number of sessions revoked
   */
  revokeAllExpired(): Promise<number>;

  /**
   * Find sessions by status
   * @param status - The session status to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing sessions and total count
   */
  findByStatus(
    status: SessionStatus,
    page: number,
    limit: number
  ): Promise<{
    items: Session[];
    total: number;
  }>;

  /**
   * Extend a session's expiry time
   * @param id - The unique identifier of the session
   * @param extensionSeconds - Number of seconds to extend
   * @param maxExtensionCount - Maximum number of extensions allowed
   * @returns True if extension was successful, false if session not found
   */
  extendSession(id: string, extensionSeconds: number, maxExtensionCount: number): Promise<boolean>;

  /**
   * Update session's last activity timestamp
   * @param id - The unique identifier of the session
   * @param autoExtend - Whether to auto-extend the session on activity
   * @param autoExtendSeconds - Seconds to extend if auto-extend is enabled
   * @returns True if update was successful, false if session not found
   */
  updateActivity(id: string, autoExtend: boolean, autoExtendSeconds: number): Promise<boolean>;

  /**
   * Check if a session is valid (active and not expired)
   * @param id - The unique identifier of the session
   * @returns True if the session is valid, false otherwise
   */
  isValid(id: string): Promise<boolean>;

  /**
   * Get the count of active sessions for a user
   * @param userId - The unique identifier of the user
   * @returns The number of active sessions
   */
  countActiveSessions(userId: string): Promise<number>;
}
