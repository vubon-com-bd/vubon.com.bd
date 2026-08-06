import type { SecurityEvent } from '../entities/security-event.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { UserId, IpAddress, DeviceId } from '../value-objects';
import type { SecurityEventType, SecuritySeverity } from '../entities/security-event.entity';

/**
 * Security Event Repository Interface
 * Extends the base repository with security event-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface ISecurityEventRepository extends IBaseRepository<SecurityEvent> {
  /**
   * Create a new security event
   * @param userId - The UserId value object of the user (optional)
   * @param eventType - The type of security event
   * @param severity - The severity level (INFO, WARNING, ERROR, CRITICAL)
   * @param ipAddress - The IpAddress value object of the client
   * @param userAgent - The user agent string of the client
   * @param details - Additional details about the event
   * @param sessionId - Optional session ID
   * @param deviceId - Optional DeviceId value object
   * @returns The created security event entity
   */
  create(
    userId: UserId | null,
    eventType: SecurityEventType,
    severity: SecuritySeverity,
    ipAddress: IpAddress,
    userAgent: string,
    details?: Record<string, unknown>,
    sessionId?: string,
    deviceId?: DeviceId
  ): Promise<SecurityEvent>;

  /**
   * Find all security events for a specific user
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing security events and total count
   */
  findByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: SecurityEvent[];
    total: number;
  }>;

  /**
   * Find all security events by IP address
   * @param ipAddress - The IpAddress value object to search for
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing security events and total count
   */
  findByIpAddress(
    ipAddress: IpAddress,
    page: number,
    limit: number
  ): Promise<{
    items: SecurityEvent[];
    total: number;
  }>;

  /**
   * Find all security events by event type
   * @param eventType - The event type to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing security events and total count
   */
  findByEventType(
    eventType: SecurityEventType,
    page: number,
    limit: number
  ): Promise<{
    items: SecurityEvent[];
    total: number;
  }>;

  /**
   * Find all security events by severity level
   * @param severity - The severity level to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing security events and total count
   */
  findBySeverity(
    severity: SecuritySeverity,
    page: number,
    limit: number
  ): Promise<{
    items: SecurityEvent[];
    total: number;
  }>;

  /**
   * Find all security events by device ID
   * @param deviceId - The DeviceId value object to search for
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing security events and total count
   */
  findByDeviceId(
    deviceId: DeviceId,
    page: number,
    limit: number
  ): Promise<{
    items: SecurityEvent[];
    total: number;
  }>;

  /**
   * Find all security events by session ID
   * @param sessionId - The session ID to search for
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing security events and total count
   */
  findBySessionId(
    sessionId: string,
    page: number,
    limit: number
  ): Promise<{
    items: SecurityEvent[];
    total: number;
  }>;

  /**
   * Find suspicious security events
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @param timeWindowMinutes - Time window for suspicious activity detection
   * @returns A paginated result containing suspicious security events and total count
   */
  findSuspiciousEvents(
    page: number,
    limit: number,
    timeWindowMinutes?: number
  ): Promise<{
    items: SecurityEvent[];
    total: number;
  }>;

  /**
   * Find all critical security events
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing critical security events and total count
   */
  findCritical(
    page: number,
    limit: number
  ): Promise<{
    items: SecurityEvent[];
    total: number;
  }>;

  /**
   * Find all security events by date range
   * @param fromDate - The start date
   * @param toDate - The end date
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing security events and total count
   */
  findByDateRange(
    fromDate: Date,
    toDate: Date,
    page: number,
    limit: number
  ): Promise<{
    items: SecurityEvent[];
    total: number;
  }>;

  /**
   * Get the count of security events by event type
   * @param eventType - The event type to filter by
   * @param fromDate - The start date (optional)
   * @param toDate - The end date (optional)
   * @returns The number of security events
   */
  countByEventType(eventType: SecurityEventType, fromDate?: Date, toDate?: Date): Promise<number>;

  /**
   * Get the count of security events by severity
   * @param severity - The severity level to filter by
   * @param fromDate - The start date (optional)
   * @param toDate - The end date (optional)
   * @returns The number of security events
   */
  countBySeverity(severity: SecuritySeverity, fromDate?: Date, toDate?: Date): Promise<number>;

  /**
   * Get the count of suspicious events for a user
   * @param userId - The UserId value object of the user
   * @param timeWindowMinutes - The time window in minutes
   * @returns The number of suspicious events
   */
  countSuspiciousByUserId(userId: UserId, timeWindowMinutes: number): Promise<number>;

  /**
   * Get the count of events by IP address
   * @param ipAddress - The IpAddress value object to search for
   * @param timeWindowMinutes - The time window in minutes
   * @returns The number of events
   */
  countByIpAddress(ipAddress: IpAddress, timeWindowMinutes: number): Promise<number>;

  /**
   * Get statistics for security events
   * @param fromDate - The start date for statistics
   * @param toDate - The end date for statistics
   * @returns Statistics about security events
   */
  getStatistics(
    fromDate: Date,
    toDate: Date
  ): Promise<{
    totalEvents: number;
    eventsByType: Record<SecurityEventType, number>;
    eventsBySeverity: Record<SecuritySeverity, number>;
    topIpAddresses: Array<{
      ipAddress: string;
      count: number;
    }>;
    topUsers: Array<{
      userId: string;
      count: number;
    }>;
    criticalEvents: number;
    suspiciousEvents: number;
  }>;

  /**
   * Delete old security events
   * @param olderThanDays - Delete events older than this number of days
   * @returns The number of deleted records
   */
  deleteOldRecords(olderThanDays: number): Promise<number>;

  /**
   * Check if a user has suspicious activity
   * @param userId - The UserId value object of the user
   * @param timeWindowMinutes - The time window in minutes
   * @param threshold - The threshold for suspicious activity
   * @returns True if suspicious activity is detected, false otherwise
   */
  hasSuspiciousActivity(
    userId: UserId,
    timeWindowMinutes: number,
    threshold: number
  ): Promise<boolean>;

  /**
   * Get the latest security event for a user
   * @param userId - The UserId value object of the user
   * @returns The latest security event or null if not found
   */
  getLatestByUserId(userId: UserId): Promise<SecurityEvent | null>;

  /**
   * Get the latest critical security event for a user
   * @param userId - The UserId value object of the user
   * @returns The latest critical security event or null if not found
   */
  getLatestCriticalByUserId(userId: UserId): Promise<SecurityEvent | null>;
}
