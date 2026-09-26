/**
 * Insurance Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/insurance.constants থেকে।
 */

import type {
  INSURANCE_STATUS,
  INSURANCE_TYPE,
  INSURANCE_COVERAGE,
  INSURANCE_CLAIM_STATUS,
} from '@vubon/shared-constants/logistics';
import type { BaseEntity } from '../common/base';
import type { ShipmentId, OrderId, UserId, Url } from '../common/primitives';

export type InsuranceStatusValue = (typeof INSURANCE_STATUS)[keyof typeof INSURANCE_STATUS];

export type InsuranceTypeValue = (typeof INSURANCE_TYPE)[keyof typeof INSURANCE_TYPE];

export type InsuranceCoverageValue = (typeof INSURANCE_COVERAGE)[keyof typeof INSURANCE_COVERAGE];

export type InsuranceClaimStatusValue =
  (typeof INSURANCE_CLAIM_STATUS)[keyof typeof INSURANCE_CLAIM_STATUS];

export interface Insurance extends BaseEntity<string> {
  readonly policyNumber: string;
  readonly shipmentId?: ShipmentId;
  readonly orderId?: OrderId;
  readonly userId?: UserId;
  readonly status: InsuranceStatusValue;
  readonly type: InsuranceTypeValue;
  readonly coverages: readonly InsuranceCoverageValue[];
  readonly declaredValue: number;
  readonly premium: number;
  readonly currency: string;
  readonly startsAt: string;
  readonly expiresAt: string;
  readonly isClaimed: boolean;
}

export interface InsurancePublic {
  readonly id: string;
  readonly policyNumber: string;
  readonly status: InsuranceStatusValue;
  readonly type: InsuranceTypeValue;
  readonly declaredValue: number;
  readonly premium: number;
  readonly currency: string;
}

export interface InsuranceClaim extends BaseEntity<string> {
  readonly insuranceId: string;
  readonly claimNumber: string;
  readonly status: InsuranceClaimStatusValue;
  readonly reason: string;
  readonly description?: string;
  readonly images?: readonly Url[];
  readonly amount: number;
  readonly currency: string;
  readonly approvedAmount?: number;
  readonly submittedAt: string;
  readonly reviewedAt?: string;
  readonly approvedAt?: string;
  readonly rejectedAt?: string;
  readonly rejectionReason?: string;
  readonly paidAt?: string;
}
