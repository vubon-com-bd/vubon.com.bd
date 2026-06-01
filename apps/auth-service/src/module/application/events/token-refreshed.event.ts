/**
 * Token Refreshed Event - Pure Domain/Application Event
 * 
 * @module application/events/token-refreshed.event
 * 
 * @description
 * Event emitted when a refresh token is successfully rotated.
 * Used for security monitoring, audit logging, and analytics.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Version for schema evolution
 */

import { randomUUID } from 'crypto';

/**
 * Base Domain Event Interface
 */
export interface DomainEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly version: number;
  readonly correlationId?: string;
  readonly causationId?: string;
}

/**
 * Token Refresh Reason Enum
 */
export enum TokenRefreshReason {
  ROTATION = 'ROTATION',           // Normal token rotation
  EXPIRY = 'EXPIRY',               // Token expired
  MANUAL_REFRESH = 'MANUAL_REFRESH', // Manual refresh by user
  FORCED_REFRESH = 'FORCED_REFRESH', // Security forced refresh
}

/**
 * Token Refreshed Event
 * 
 * Emitted when a refresh token is successfully rotated
 * 
 * @example
 * // Normal token rotation
 * const event = new TokenRefreshedEvent(
 *   'usr_123',
 *   'user@example.com',
 *   'token_old_abc',
 *   'token_new_def',
 *   'family_xyz',
 *   5,
 *   '192.168.1.100',
 *   'Mozilla/5.0...',
 *   'device_456',
 *   TokenRefreshReason.ROTATION,
 *   'corr_abc123'
 * );
 */
export class TokenRefreshedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'token.refreshed';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Event-specific properties
  public readonly userId: string;
  public readonly email: string;
  public readonly oldRefreshTokenId: string;
  public readonly newRefreshTokenId: string;
  public readonly refreshTokenFamily: string;
  public readonly refreshCount: number;
  public readonly reason: TokenRefreshReason;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly ipAddress?: string;
  public readonly userAgent?: string;
  public readonly deviceId?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    email: string,
    oldRefreshTokenId: string,
    newRefreshTokenId: string,
    refreshTokenFamily: string,
    refreshCount: number,
    ipAddress?: string,
    userAgent?: string,
    deviceId?: string,
    reason: TokenRefreshReason = TokenRefreshReason.ROTATION,
    correlationId?: string,
    causationId?: string,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.email = email;
    this.oldRefreshTokenId = oldRefreshTokenId;
    this.newRefreshTokenId = newRefreshTokenId;
    this.refreshTokenFamily = refreshTokenFamily;
    this.refreshCount = refreshCount;
    this.reason = reason;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.deviceId = deviceId;
    this.metadata = metadata;
  }
}

/**
 * Token Refreshed Event Data Interface
 * For event serialization/deserialization
 */
export interface TokenRefreshedEventData {
  userId: string;
  email: string;
  oldRefreshTokenId: string;
  newRefreshTokenId: string;
  refreshTokenFamily: string;
  refreshCount: number;
  reason: TokenRefreshReason;
  correlationId?: string;
  causationId?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  metadata?: Record<string, unknown>;
}
