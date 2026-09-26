/**
 * Email Marketing Types
 * @module shared-types/marketing
 */

import type {
  EMAIL_MARKETING_TYPE,
  EMAIL_MARKETING_STATUS,
} from '@vubon/shared-constants/marketing';
import type { Email } from '../common/primitives';

export type EmailMarketingTypeValue =
  (typeof EMAIL_MARKETING_TYPE)[keyof typeof EMAIL_MARKETING_TYPE];

export type EmailMarketingStatusValue =
  (typeof EMAIL_MARKETING_STATUS)[keyof typeof EMAIL_MARKETING_STATUS];

export interface EmailMarketing {
  readonly id: string;
  readonly name: string;
  readonly type: EmailMarketingTypeValue;
  readonly status: EmailMarketingStatusValue;
  readonly subject: string;
  readonly preheader?: string;
  readonly bodyHtml?: string;
  readonly bodyText?: string;
  readonly templateId?: string;
  readonly fromName?: string;
  readonly fromEmail?: Email;
  readonly replyTo?: Email;
  readonly recipientCount: number;
  readonly sentCount: number;
  readonly deliveredCount: number;
  readonly openCount: number;
  readonly clickCount: number;
  readonly bounceCount: number;
  readonly unsubscribeCount: number;
  readonly scheduledAt?: string;
  readonly sentAt?: string;
  readonly createdBy: string;
  readonly createdAt: string;
}

export interface EmailMarketingPublic {
  readonly id: string;
  readonly name: string;
  readonly type: EmailMarketingTypeValue;
  readonly status: EmailMarketingStatusValue;
  readonly subject: string;
  readonly recipientCount: number;
  readonly sentAt?: string;
}

export interface EmailMarketingStats {
  readonly campaignId: string;
  readonly sent: number;
  readonly delivered: number;
  readonly opened: number;
  readonly clicked: number;
  readonly bounced: number;
  readonly unsubscribed: number;
  readonly openRate: number;
  readonly clickRate: number;
  readonly bounceRate: number;
}
