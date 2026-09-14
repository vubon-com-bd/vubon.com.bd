/**
 * Email Types
 * @module shared-types/platform/notification
 */

import type {
  EMAIL_PROVIDER,
  EMAIL_STATUS,
  EMAIL_PRIORITY,
} from '@vubon/shared-constants/platform';
import type { Email, Url } from '../../common/primitives';

export type EmailProviderValue = (typeof EMAIL_PROVIDER)[keyof typeof EMAIL_PROVIDER];

export type EmailStatusValue = (typeof EMAIL_STATUS)[keyof typeof EMAIL_STATUS];

export type EmailPriorityValue = (typeof EMAIL_PRIORITY)[keyof typeof EMAIL_PRIORITY];

export interface EmailMessage {
  readonly id: string;
  readonly to: readonly Email[];
  readonly cc?: readonly Email[];
  readonly bcc?: readonly Email[];
  readonly from?: Email;
  readonly replyTo?: Email;
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly templateId?: string;
  readonly templateData?: Readonly<Record<string, unknown>>;
  readonly attachments?: readonly EmailAttachment[];
  readonly headers?: Readonly<Record<string, string>>;
  readonly priority?: EmailPriorityValue;
  readonly provider?: EmailProviderValue;
  readonly status: EmailStatusValue;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly openedAt?: string;
  readonly clickedAt?: string;
  readonly bouncedAt?: string;
  readonly failureReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface EmailAttachment {
  readonly filename: string;
  readonly contentType: string;
  readonly size: number;
  readonly url?: Url;
  readonly content?: string;
}

export interface EmailSendInput {
  readonly to: readonly string[];
  readonly cc?: readonly string[];
  readonly bcc?: readonly string[];
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly templateId?: string;
  readonly templateData?: Readonly<Record<string, unknown>>;
  readonly attachments?: readonly EmailAttachment[];
  readonly priority?: EmailPriorityValue;
}

export interface EmailSendResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly status: EmailStatusValue;
  readonly error?: string;
}
