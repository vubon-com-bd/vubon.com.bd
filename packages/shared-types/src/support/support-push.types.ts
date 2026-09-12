import { BaseEntity } from '../common/base.types';
import { PUSH } from '@vubon/shared-constants/src/platform/notification/push.constants';

export interface SupportPush extends BaseEntity {
  pushId: string;
  ticketId?: string;
  title: string;
  body: string;
  status: keyof typeof PUSH.STATUS | string;
  type: keyof typeof PUSH.TYPES | string;
  sentBy: string;
  sentAt: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  metadata: Record<string, unknown>;
}
