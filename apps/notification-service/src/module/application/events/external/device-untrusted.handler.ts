/**
 * DeviceUntrustedHandler — identity.device.untrusted
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

export const DEVICE_UNTRUSTED_EVENT = 'identity.device.untrusted';

@Injectable()
export class DeviceUntrustedHandler implements OnModuleInit {
  private readonly logger = new Logger(DeviceUntrustedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(DEVICE_UNTRUSTED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'ডিভাইস অবিশ্বস্ত',
          body: 'একটি ডিভাইসের বিশ্বাস বাতিল করা হয়েছে।',
          data: { eventType: 'identity.device.untrusted', ...p },
          idempotencyKey: 'device-untrusted-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.device.untrusted → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.device.untrusted"');
  }
}
