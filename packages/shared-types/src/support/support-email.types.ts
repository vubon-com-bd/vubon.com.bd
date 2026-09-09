import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { EMAIL } from '@vubon/shared-constants/src/platform/notification/email.constants';

export interface SupportEmail extends BaseEntity {
  emailId: string;
  ticketId?: string;
  from: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  status: keyof typeof EMAIL.STATUS | string;
  type: keyof typeof EMAIL.TYPES | string;
  sentBy: string;
  sentByUser: User;
  attachments: string[];
  sentAt: Date;
  deliveredAt?: Date;
  readAt?: Date;
  repliedAt?: Date;
  metadata: Record<string, unknown>;
}
