/**
 * Email Request DTOs
 * @module notification-service/application/dtos/requests/email
 */
import type { EmailPriorityValue } from '@vubon/shared-types/platform/notification';

export interface EmailAttachmentInputDTO {
  readonly filename: string;
  readonly contentType: string;
  readonly size: number;
  readonly url?: string;
  readonly content?: string;
}

export interface SendEmailRequestDTO {
  readonly to: string | readonly string[];
  readonly cc?: readonly string[];
  readonly bcc?: readonly string[];
  readonly from?: string;
  readonly replyTo?: string;
  readonly subject: string;
  readonly text?: string;
  readonly html?: string;
  readonly templateId?: string;
  readonly templateData?: Readonly<Record<string, unknown>>;
  readonly attachments?: readonly EmailAttachmentInputDTO[];
  readonly headers?: Readonly<Record<string, string>>;
  readonly priority?: EmailPriorityValue;
  readonly idempotencyKey?: string;
}

export interface SendEmailWithTemplateRequestDTO {
  readonly to: string | readonly string[];
  readonly templateSlug: string;
  readonly templateData: Readonly<Record<string, unknown>>;
  readonly locale?: string;
  readonly priority?: EmailPriorityValue;
}

export interface GetEmailRequestDTO {
  readonly emailId: string;
}

export interface ListEmailsRequestDTO {
  readonly filter?: {
    readonly to?: string;
    readonly status?: string;
    readonly provider?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
  };
  readonly page: number;
  readonly limit: number;
}
