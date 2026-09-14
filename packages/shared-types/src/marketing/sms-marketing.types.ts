/**
 * SMS Marketing Types
 * @module shared-types/marketing
 */

import type { SMS_MARKETING_TYPE, SMS_MARKETING_STATUS } from '@vubon/shared-constants/marketing';

export type SmsMarketingTypeValue = (typeof SMS_MARKETING_TYPE)[keyof typeof SMS_MARKETING_TYPE];

export type SmsMarketingStatusValue =
  (typeof SMS_MARKETING_STATUS)[keyof typeof SMS_MARKETING_STATUS];

export interface SmsMarketing {
  readonly id: string;
  readonly name: string;
  readonly type: SmsMarketingTypeValue;
  readonly status: SmsMarketingStatusValue;
  readonly message: string;
  readonly senderId?: string;
  readonly recipientCount: number;
  readonly sentCount: number;
  readonly deliveredCount: number;
  readonly failedCount: number;
  readonly segments: number;
  readonly scheduledAt?: string;
  readonly sentAt?: string;
  readonly createdBy: string;
  readonly createdAt: string;
}

export interface SmsMarketingPublic {
  readonly id: string;
  readonly name: string;
  readonly type: SmsMarketingTypeValue;
  readonly status: SmsMarketingStatusValue;
  readonly recipientCount: number;
  readonly sentAt?: string;
}

export interface SmsMarketingStats {
  readonly campaignId: string;
  readonly sent: number;
  readonly delivered: number;
  readonly failed: number;
  readonly deliveryRate: number;
}
