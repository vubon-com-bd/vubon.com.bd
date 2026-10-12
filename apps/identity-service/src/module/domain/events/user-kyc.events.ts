/**
 * User KYC Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const KYC_EVENT_TYPE = {
  SUBMITTED: 'kyc.submitted',
  VERIFIED: 'kyc.verified',
  REJECTED: 'kyc.rejected',
} as const;

export interface KycSubmittedPayload {
  readonly kycId: string;
  readonly userId: string;
  readonly documentCount: number;
  readonly submittedAt: string;
}

export interface KycVerifiedPayload {
  readonly kycId: string;
  readonly userId: string;
  readonly reviewedBy: string;
  readonly verifiedAt: string;
}

export interface KycRejectedPayload {
  readonly kycId: string;
  readonly userId: string;
  readonly reviewedBy: string;
  readonly reason: string;
  readonly rejectedAt: string;
}

export class KycSubmittedEvent extends BaseDomainEvent<typeof KYC_EVENT_TYPE.SUBMITTED, KycSubmittedPayload> {
  constructor(p: BaseEventParams<KycSubmittedPayload>) {
    super(buildEventParams(KYC_EVENT_TYPE.SUBMITTED, AUTH_AGGREGATE_TYPE.USER_KYC, p));
  }
}

export class KycVerifiedEvent extends BaseDomainEvent<typeof KYC_EVENT_TYPE.VERIFIED, KycVerifiedPayload> {
  constructor(p: BaseEventParams<KycVerifiedPayload>) {
    super(buildEventParams(KYC_EVENT_TYPE.VERIFIED, AUTH_AGGREGATE_TYPE.USER_KYC, p));
  }
}

export class KycRejectedEvent extends BaseDomainEvent<typeof KYC_EVENT_TYPE.REJECTED, KycRejectedPayload> {
  constructor(p: BaseEventParams<KycRejectedPayload>) {
    super(buildEventParams(KYC_EVENT_TYPE.REJECTED, AUTH_AGGREGATE_TYPE.USER_KYC, p));
  }
}
