import { BaseEntity } from '../common/base.types';
import { SMS_MARKETING } from '@vubon/shared-constants/src/marketing/sms-marketing.constants';

export interface SmsMarketing extends BaseEntity {
  smsId: string;
  body: string;
  status: keyof typeof SMS_MARKETING.STATUS | string;
  type: keyof typeof SMS_MARKETING.SMS_TYPES | string;
  from: string;
  to: string[];
  recipientCount: number;
  sentAt?: Date;
  scheduledAt?: Date;
  deliveredCount: number;
  failedCount: number;
  metadata: Record<string, unknown>;
}
