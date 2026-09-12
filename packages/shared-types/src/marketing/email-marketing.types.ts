import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { EMAIL_MARKETING } from '@vubon/shared-constants/src/marketing/email-marketing.constants';

export interface EmailMarketing extends BaseEntity {
  emailId: string;
  subject: string;
  content: string;
  status: keyof typeof EMAIL_MARKETING.STATUS | string;
  type: keyof typeof EMAIL_MARKETING.EMAIL_TYPES | string;
  createdBy: string;
  createdByUser: User;
  recipients: string[];
  recipientCount: number;
  sentAt?: Date;
  scheduledAt?: Date;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  metadata: Record<string, unknown>;
}
