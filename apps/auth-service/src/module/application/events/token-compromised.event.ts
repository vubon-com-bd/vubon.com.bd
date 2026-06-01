/**
 * Token Compromised Event - Pure Domain/Application Event
 * 
 * @module application/events/token-compromised.event
 * 
 * @description
 * Event emitted when a refresh token is suspected to be compromised.
 * Used for security monitoring, token family revocation, and account protection.
 * 
 * Enterprise Rules:
 * ✅ Immutable event data
 * ✅ No business logic
 * ✅ No side effects
 * ✅ Event ID for tracing
 * ✅ Correlation ID for distributed tracing
 * ✅ Implements DomainEvent interface
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
 * Detection Method Enum
 */
export enum TokenCompromiseDetectionMethod {
  MULTIPLE_USES = 'MULTIPLE_USES',           // Token used more than once
  INVALID_ROTATION = 'INVALID_ROTATION',     // Invalid rotation sequence
  SUSPICIOUS_IP = 'SUSPICIOUS_IP',           // IP address mismatch
  SUSPICIOUS_USER_AGENT = 'SUSPICIOUS_USER_AGENT', // User agent mismatch
  REUSE_DETECTED = 'REUSE_DETECTED',         // Token reuse after revocation
  SIMULTANEOUS_USES = 'SIMULTANEOUS_USES',   // Token used from multiple locations
  EXPIRED_TOKEN_REUSE = 'EXPIRED_TOKEN_REUSE', // Expired token attempted
  BLACKLISTED_IP = 'BLACKLISTED_IP',         // Request from known malicious IP
  ANOMALY_DETECTED = 'ANOMALY_DETECTED',     // ML-based anomaly detection
}

/**
 * Action Taken Enum
 */
export enum TokenCompromiseAction {
  REVOKED_ALL_TOKENS = 'REVOKED_ALL_TOKENS',
  LOCKED_ACCOUNT = 'LOCKED_ACCOUNT',
  FLAGGED_FOR_REVIEW = 'FLAGGED_FOR_REVIEW',
  NOTIFIED_USER = 'NOTIFIED_USER',
  REQUIRED_PASSWORD_CHANGE = 'REQUIRED_PASSWORD_CHANGE',
  REVOKED_TOKEN_FAMILY = 'REVOKED_TOKEN_FAMILY',
  ALERTED_SECURITY_TEAM = 'ALERTED_SECURITY_TEAM',
  BLOCKED_IP = 'BLOCKED_IP',
}

/**
 * Token Compromised Event
 * 
 * Emitted when a refresh token is suspected to be compromised
 * 
 * @example
 * const event = new TokenCompromisedEvent(
 *   'usr_123',
 *   'user@example.com',
 *   'token_456',
 *   'family_789',
 *   TokenCompromiseDetectionMethod.REUSE_DETECTED,
 *   '192.168.1.100',
 *   'Mozilla/5.0...',
 *   '10.0.0.1',
 *   'Chrome/120.0.0.0',
 *   TokenCompromiseAction.REVOKED_ALL_TOKENS,
 *   'corr_abc123',
 *   { previousRotationCount: 5 }
 * );
 */
export class TokenCompromisedEvent implements DomainEvent {
  // DomainEvent interface properties
  public readonly eventId: string;
  public readonly eventName: string = 'token.compromised';
  public readonly occurredAt: Date;
  public readonly version: number = 1;

  // Event-specific properties
  public readonly userId: string;
  public readonly email: string;
  public readonly tokenId: string;
  public readonly tokenFamily: string;
  public readonly detectionMethod: TokenCompromiseDetectionMethod;
  public readonly reportedIpAddress?: string;
  public readonly reportedUserAgent?: string;
  public readonly originalIpAddress?: string;
  public readonly originalUserAgent?: string;
  public readonly actionTaken: TokenCompromiseAction;
  public readonly correlationId?: string;
  public readonly causationId?: string;
  public readonly metadata?: Record<string, unknown>;

  constructor(
    userId: string,
    email: string,
    tokenId: string,
    tokenFamily: string,
    detectionMethod: TokenCompromiseDetectionMethod,
    actionTaken: TokenCompromiseAction,
    correlationId?: string,
    causationId?: string,
    reportedIpAddress?: string,
    reportedUserAgent?: string,
    originalIpAddress?: string,
    originalUserAgent?: string,
    metadata?: Record<string, unknown>
  ) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
    this.userId = userId;
    this.email = email;
    this.tokenId = tokenId;
    this.tokenFamily = tokenFamily;
    this.detectionMethod = detectionMethod;
    this.actionTaken = actionTaken;
    this.correlationId = correlationId;
    this.causationId = causationId;
    this.reportedIpAddress = reportedIpAddress;
    this.reportedUserAgent = reportedUserAgent;
    this.originalIpAddress = originalIpAddress;
    this.originalUserAgent = originalUserAgent;
    this.metadata = metadata;
  }
}

/**
 * Token Compromised Event Data Interface
 * For event serialization/deserialization
 */
export interface TokenCompromisedEventData {
  eventId: string;
  eventName: string;
  occurredAt: string;
  version: number;
  userId: string;
  email: string;
  tokenId: string;
  tokenFamily: string;
  detectionMethod: TokenCompromiseDetectionMethod;
  actionTaken: TokenCompromiseAction;
  correlationId?: string;
  causationId?: string;
  reportedIpAddress?: string;
  reportedUserAgent?: string;
  originalIpAddress?: string;
  originalUserAgent?: string;
  metadata?: Record<string, unknown>;
}
