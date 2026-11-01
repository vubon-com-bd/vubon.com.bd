/**
 * KycRejectedHandler — identity.kyc.rejected
 * @module notification-service/application/events/external
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
import { renderKycRejectedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

export const KYC_REJECTED_EVENT = 'identity.kyc.rejected';

@Injectable()
export class KycRejectedHandler implements OnModuleInit {
  private readonly logger = new Logger(KycRejectedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(KYC_REJECTED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${KYC_REJECTED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const p = event.payload ?? {};
    const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
    const email = (p.email as string) ?? undefined;
    const locale = (p.locale as 'en' | 'bn') ?? 'bn';
    const isBn = locale === 'bn';

    try {
      const html = renderKycRejectedEmail({
        name: (p.name as string) ?? (isBn ? 'গ্রাহক' : 'Customer'),
        reason: (p.reason as string) ?? (isBn ? 'ডকুমেন্ট স্পষ্ট নয়' : 'Documents not clear'),
        rejectedAt: (p.rejectedAt as string) ?? new Date().toISOString(),
        locale,
      });

      const result = await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.ALERT,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? '❌ KYC যাচাই প্রত্যাখ্যাত' : '❌ KYC Rejected',
        body: html,
        data: { eventType: KYC_REJECTED_EVENT, eventId: event.id, ...p },
        email,
        phone: (p.phone as string) ?? undefined,
        idempotencyKey: `kyc-rejected-${event.id}`,
      });

      this.logger.log(`✅ KYC rejected notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`KycRejectedHandler failed: ${msg}`);
    }
  }
}
