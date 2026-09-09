import { BaseEntity } from '../../common/base.types';
import { WEBHOOK } from '@vubon/shared-constants/src/platform/notification/webhook.constants';
import { Notification } from './notification.types';

export interface Webhook extends BaseEntity {
  webhookId: string;
  notificationId: string;
  notification: Notification;
  status: keyof typeof WEBHOOK.STATUS | string;
  type: keyof typeof WEBHOOK.TYPES | string;
  provider: keyof typeof WEBHOOK.WEBHOOK_PROVIDERS | string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: Record<string, string>;
  payload: unknown;
  response: unknown;
  statusCode: number;
  attempts: number;
  maxAttempts: number;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata: Record<string, unknown>;
}
