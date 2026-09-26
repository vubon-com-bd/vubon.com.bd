/**
 * Base Notification Service
 * @module shared-kernel/infrastructure/external/notification
 */
import { Injectable } from '@nestjs/common';

export type NotificationChannel = 'email' | 'sms' | 'push';

export interface NotificationInput {
  readonly userId: string;
  readonly title: string;
  readonly body: string;
  readonly channels?: readonly NotificationChannel[];
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export abstract class BaseNotificationService {
  abstract readonly name: string;

  abstract send(input: NotificationInput): Promise<void>;
}
