import { BaseEntity } from '../../common/base.types';
import { EMAIL } from '@vubon/shared-constants/src/platform/notification/email.constants';
import { EmailTemplate } from './email-template.types';
import { Notification } from './notification.types';

export interface EmailAttachment {
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface PlatformEmail extends BaseEntity {
  emailId: string;
  notificationId: string;
  notification: Notification;
  status: keyof typeof EMAIL.STATUS | string;
  type: keyof typeof EMAIL.TYPES | string;
  provider: keyof typeof EMAIL.EMAIL_PROVIDERS | string;
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  template: EmailTemplate;
  templateId?: string;
  attachments: EmailAttachment[];
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  bouncedAt?: Date;
  spamAt?: Date;
  metadata: Record<string, unknown>;
}
