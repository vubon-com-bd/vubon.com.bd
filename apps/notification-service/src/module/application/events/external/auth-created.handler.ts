/**
 * AuthCreatedHandler — identity.auth.created → Bengali email
 * @module notification-service/application/events/external
 * 
 * NOTE: User-created.handler.ts already sends welcome email.
 * This handler only sends IN_APP notification to avoid duplicate emails.
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const AUTH_CREATED_EVENT = 'identity.auth.created';

@Injectable()
export class AuthCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(AuthCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(AUTH_CREATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        // Only IN_APP — welcome EMAIL is sent by UserCreatedHandler
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.WELCOME,
          category: NOTIFICATION_CATEGORY.AUTH,
          channels: [NOTIFICATION_CHANNEL.IN_APP],  // ← IN_APP only!
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: '🎉 আপনার অ্যাকাউন্ট তৈরি হয়েছে',
          body: 'আপনার Vubon অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।',
          data: { eventType: 'identity.auth.created', ...p },
          idempotencyKey: 'auth-created-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Auth created (in-app only) → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.auth.created"');
  }
}
