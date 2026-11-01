/**
 * Identity Service Event Helpers
 * @module identity-service/domain/events
 */
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

export const AUTH_AGGREGATE_TYPE = {
  AUTH: 'Auth',
  SESSION: 'Session',
  TOKEN: 'Token',
  MFA: 'Mfa',
  BACKUP_CODE: 'BackupCode',
  LOGIN_ATTEMPT: 'LoginAttempt',
  ACCOUNT_LOCK: 'AccountLock',
  DEVICE: 'Device',
  VERIFICATION: 'Verification',
  SOCIAL_ACCOUNT: 'SocialAccount',
  OAUTH_CLIENT: 'OAuthClient',
  SSO_CONFIG: 'SsoConfig',
  ROLE: 'Role',
  PERMISSION: 'Permission',
  // User domain
  USER: 'User',
  USER_KYC: 'UserKyc',
  USER_PROFILE: 'UserProfile',
  USER_ADDRESS: 'UserAddress',
  USER_CONTACT: 'UserContact',
  BIOMETRIC: 'Biometric',
  RECOVERY_CODE: 'RecoveryCode',
  TWO_FACTOR: 'TwoFactor',
} as const;

export type AuthAggregateType =
  (typeof AUTH_AGGREGATE_TYPE)[keyof typeof AUTH_AGGREGATE_TYPE];

export function newEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function now(): Timestamp {
  return new Date().toISOString() as unknown as Timestamp;
}

export interface BaseEventParams<TPayload> {
  readonly id?: string;
  readonly aggregateId: string;
  readonly payload: TPayload;
  readonly occurredAt?: Timestamp;
  readonly version?: number;
  readonly metadata?: DomainEventMetadata;
}

export function buildEventParams<
  TType extends string,
  TPayload,
  TAggregateType extends string,
>(
  type: TType,
  aggregateType: TAggregateType,
  p: BaseEventParams<TPayload>,
): {
  id: string;
  type: TType;
  aggregateId: string;
  aggregateType: TAggregateType;
  payload: TPayload;
  occurredAt: Timestamp;
  version: number;
  metadata?: DomainEventMetadata;
} {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}
