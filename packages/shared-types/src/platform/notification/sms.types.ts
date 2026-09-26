/**
 * SMS Types
 * @module shared-types/platform/notification
 */

import type { SMS_PROVIDER, SMS_STATUS, SMS_TYPE } from '@vubon/shared-constants/platform';
import type { Phone } from '../../common/primitives';

export type SmsProviderValue = (typeof SMS_PROVIDER)[keyof typeof SMS_PROVIDER];

export type SmsStatusValue = (typeof SMS_STATUS)[keyof typeof SMS_STATUS];

export type SmsTypeValue = (typeof SMS_TYPE)[keyof typeof SMS_TYPE];

export interface SmsMessage {
  readonly id: string;
  readonly to: Phone;
  readonly from?: string;
  readonly message: string;
  readonly type: SmsTypeValue;
  readonly provider?: SmsProviderValue;
  readonly status: SmsStatusValue;
  readonly segments: number;
  readonly encoding: 'gsm' | 'unicode';
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly failureReason?: string;
  readonly cost?: number;
  readonly currency?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface SmsSendInput {
  readonly to: string | readonly string[];
  readonly message: string;
  readonly type: SmsTypeValue;
  readonly senderId?: string;
}

export interface SmsSendResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly status: SmsStatusValue;
  readonly segments: number;
  readonly error?: string;
}
