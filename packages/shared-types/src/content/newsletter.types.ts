import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { NEWSLETTER_STATUS } from '@vubon/shared-constants/src/content/newsletter-status.constants';
import { NEWSLETTER } from '@vubon/shared-constants/src/content/newsletter.constants';

export interface Newsletter extends BaseEntity {
  newsletterId: string;
  subject: string;
  content: string;
  status: keyof typeof NEWSLETTER_STATUS | string;
  type: keyof typeof NEWSLETTER.NEWSLETTER_TYPES | string;
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
