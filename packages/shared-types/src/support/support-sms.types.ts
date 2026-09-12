import { BaseEntity } from '../common/base.types';
import { SMS } from '@vubon/shared-constants/src/platform/notification/sms.constants';

export interface SupportSms extends BaseEntity {
  smsId: string;
  ticketId?: string;
  to: string;
  from: string;
  body: string;
  status: keyof typeof SMS.STATUS | string;
  type: keyof typeof SMS.TYPES | string;
  sentBy: string;
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
  metadata: Record<string, unknown>;
}
