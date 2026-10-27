/**
 * Verification Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const VERIFICATION_EVENT_TYPE = {
  REQUESTED: 'identity.verification.requested',
  OTP_SENT: 'identity.verification.otp_sent',
  OTP_RESENT: 'identity.verification.otp_resent',
  VERIFIED: 'identity.verification.verified',
  FAILED: 'identity.verification.failed',
  EXPIRED: 'identity.verification.expired',
} as const;

export interface VerificationRequestedPayload {
  readonly verificationId: string;
  readonly userId: string;
  readonly channel: string;
  readonly purpose: string;
  readonly target: string;
  readonly requestedAt: string;
  readonly expiresAt: string;
}

export interface VerificationCompletedPayload {
  readonly verificationId: string;
  readonly userId: string;
  readonly channel: string;
  readonly purpose: string;
  readonly completedAt: string;
}

export class VerificationRequestedEvent extends BaseDomainEvent<
  typeof VERIFICATION_EVENT_TYPE.REQUESTED,
  VerificationRequestedPayload
> {
  constructor(p: BaseEventParams<VerificationRequestedPayload>) {
    super(buildEventParams(VERIFICATION_EVENT_TYPE.REQUESTED, AUTH_AGGREGATE_TYPE.VERIFICATION, p));
  }
}

export class VerificationOtpSentEvent extends BaseDomainEvent<
  typeof VERIFICATION_EVENT_TYPE.OTP_SENT,
  VerificationRequestedPayload
> {
  constructor(p: BaseEventParams<VerificationRequestedPayload>) {
    super(buildEventParams(VERIFICATION_EVENT_TYPE.OTP_SENT, AUTH_AGGREGATE_TYPE.VERIFICATION, p));
  }
}

export class VerificationOtpResentEvent extends BaseDomainEvent<
  typeof VERIFICATION_EVENT_TYPE.OTP_RESENT,
  VerificationRequestedPayload
> {
  constructor(p: BaseEventParams<VerificationRequestedPayload>) {
    super(buildEventParams(VERIFICATION_EVENT_TYPE.OTP_RESENT, AUTH_AGGREGATE_TYPE.VERIFICATION, p));
  }
}

export class VerificationVerifiedEvent extends BaseDomainEvent<
  typeof VERIFICATION_EVENT_TYPE.VERIFIED,
  VerificationCompletedPayload
> {
  constructor(p: BaseEventParams<VerificationCompletedPayload>) {
    super(buildEventParams(VERIFICATION_EVENT_TYPE.VERIFIED, AUTH_AGGREGATE_TYPE.VERIFICATION, p));
  }
}

export class VerificationFailedEvent extends BaseDomainEvent<
  typeof VERIFICATION_EVENT_TYPE.FAILED,
  VerificationCompletedPayload
> {
  constructor(p: BaseEventParams<VerificationCompletedPayload>) {
    super(buildEventParams(VERIFICATION_EVENT_TYPE.FAILED, AUTH_AGGREGATE_TYPE.VERIFICATION, p));
  }
}

export class VerificationExpiredEvent extends BaseDomainEvent<
  typeof VERIFICATION_EVENT_TYPE.EXPIRED,
  VerificationCompletedPayload
> {
  constructor(p: BaseEventParams<VerificationCompletedPayload>) {
    super(buildEventParams(VERIFICATION_EVENT_TYPE.EXPIRED, AUTH_AGGREGATE_TYPE.VERIFICATION, p));
  }
}
