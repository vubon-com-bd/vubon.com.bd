/**
 * SsoConfigCreatedHandler — identity.sso_config.created → Bengali email
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderSsoConfigCreatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const SSO_CONFIG_CREATED_EVENT = 'identity.sso_config.created';

@Injectable()
export class SsoConfigCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(SsoConfigCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SSO_CONFIG_CREATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;

      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderSsoConfigCreatedEmail({
            name: ((p.name as string) ?? (typeof p.firstName === 'string' ? p.firstName as string : 'গ্রাহক')),
            locale: (((p.locale as 'en' | 'bn') ?? 'bn')),
            ...p,
          } as any);
        } catch (err) {
          this.logger.warn(`Template render failed: ${err}`);
        }

        const isBn = ((p.locale as string) ?? 'bn') === 'bn';

        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: isBn ? 'SSO কনফিগ' : 'Created',
          body: html || `প্রিয় গ্রাহক,\n\nআপনার অ্যাকাউন্টে SSO configuration তৈরি হয়েছে।\n\nএখন আপনি enterprise login ব্যবহার করতে পারবেন।\n\nVubon টিম`,
          data: { eventType: 'identity.sso_config.created', ...p , html },
          idempotencyKey: 'sso-config-created-' + (event as { id: string }).id,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.sso_config.created"');
  }
}
