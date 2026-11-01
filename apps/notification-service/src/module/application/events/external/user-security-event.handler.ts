/**
 * UserSecurityEventHandler — identity.user.security_event
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
import { renderUserSecurityEventEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const USER_SECURITY_EVENT_EVENT = 'identity.user.security_event';

@Injectable()
export class UserSecurityEventHandler implements OnModuleInit {
  private readonly logger = new Logger(UserSecurityEventHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_SECURITY_EVENT_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        const html = renderUserSecurityEventEmail({
          name: (p.name as string) ?? 'ব্যবহারকারী',
          eventType: (p.eventType as string) ?? (p.type as string) ?? 'security_event',
          description: (p.description as string) ?? undefined,
          ipAddress: (p.ipAddress as string) ?? undefined,
          userAgent: (p.userAgent as string) ?? undefined,
          occurredAt: (p.occurredAt as string) ?? new Date().toISOString(),
          locale: ((p.locale as 'en' | 'bn') ?? 'bn'),
        });

        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'নিরাপত্তা সতর্কতা',
          body: html,
          data: { eventType: 'identity.user.security_event', ...p },
          idempotencyKey: 'user-security-event-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.user.security_event notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.user.security_event"');
  }
}
