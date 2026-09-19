/**
 * Report Email Types
 * @module shared-types/platform/reporting
 */

import type {
  REPORT_EMAIL_TYPE,
  REPORT_EMAIL_STATUS,
  REPORT_EMAIL_FORMAT,
} from '@vubon/shared-constants/platform';
import type { Email } from '../../common/primitives';

export type ReportEmailTypeValue = (typeof REPORT_EMAIL_TYPE)[keyof typeof REPORT_EMAIL_TYPE];

export type ReportEmailStatusValue = (typeof REPORT_EMAIL_STATUS)[keyof typeof REPORT_EMAIL_STATUS];

export type ReportEmailFormatValue = (typeof REPORT_EMAIL_FORMAT)[keyof typeof REPORT_EMAIL_FORMAT];

export interface ReportEmail {
  readonly id: string;
  readonly reportId: string;
  readonly scheduleId?: string;
  readonly type: ReportEmailTypeValue;
  readonly status: ReportEmailStatusValue;
  readonly format: ReportEmailFormatValue;
  readonly to: readonly Email[];
  readonly cc?: readonly Email[];
  readonly bcc?: readonly Email[];
  readonly subject: string;
  readonly body?: string;
  readonly attachmentUrl?: string;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly openedAt?: string;
  readonly failedAt?: string;
  readonly error?: string;
  readonly createdAt: string;
}

export interface ReportEmailSendInput {
  readonly reportId: string;
  readonly to: readonly string[];
  readonly cc?: readonly string[];
  readonly bcc?: readonly string[];
  readonly subject?: string;
  readonly body?: string;
  readonly format?: ReportEmailFormatValue;
}
