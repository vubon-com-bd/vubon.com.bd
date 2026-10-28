/**
 * MfaEnabledHandler — notifies when MFA is enabled
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

export const MFA_ENABLED_EVENT = 'identity.mfa.enabled';

@Injectable()
export class MfaEnabledHandler implements OnModuleInit {
  private readonly logger = new Logger(MfaEnabledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(MFA_ENABLED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${MFA_ENABLED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SECURITY,
        category: NOTIFICATION_CATEGORY.SECURITY,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? `🔐 MFA চালু হয়েছে` : `🔐 MFA Enabled`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার অ্যাকাউন্টে MFA সফলভাবে চালু হয়েছে (${payload?.method ?? "TOTP"})।` : `Hi ${payload?.name ?? "Customer"}, MFA has been enabled on your account (${payload?.method ?? "TOTP"}).`,
        data: { eventType: 'identity.mfa.enabled', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `mfa-enabled-${event.id}`,
      });
      this.logger.log(`✅ MfaEnabledHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`MfaEnabledHandler failed: ${err}`);
    }
  }
}
