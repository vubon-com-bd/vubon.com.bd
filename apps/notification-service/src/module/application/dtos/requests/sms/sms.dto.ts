/**
 * SMS Request DTOs
 * @module notification-service/application/dtos/requests/sms
 */
import type { SmsTypeValue, SmsProviderValue } from '@vubon/shared-types/platform/notification';

export interface SendSmsRequestDTO {
  readonly to: string | readonly string[];
  readonly message: string;
  readonly type?: SmsTypeValue;
  readonly senderId?: string;
  readonly provider?: SmsProviderValue;
  readonly templateId?: string;
  readonly templateData?: Readonly<Record<string, unknown>>;
  readonly idempotencyKey?: string;
}

export interface SendBulkSmsRequestDTO {
  readonly recipients: readonly string[];
  readonly message: string;
  readonly type?: SmsTypeValue;
  readonly senderId?: string;
  readonly provider?: SmsProviderValue;
}

export interface GetSmsRequestDTO {
  readonly smsId: string;
}

export interface ListSmsRequestDTO {
  readonly filter?: {
    readonly to?: string;
    readonly status?: string;
    readonly provider?: string;
    readonly type?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
  };
  readonly page: number;
  readonly limit: number;
}
