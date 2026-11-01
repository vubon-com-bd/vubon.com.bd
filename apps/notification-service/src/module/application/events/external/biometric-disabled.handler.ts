/**
 * BiometricDisabledHandler — identity.biometric.disabled
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

export const BIOMETRIC_DISABLED_EVENT = 'identity.biometric.disabled';

@Injectable()
export class BiometricDisabledHandler implements OnModuleInit {
  private readonly logger = new Logger(BiometricDisabledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(BIOMETRIC_DISABLED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'বায়োমেট্রিক নিষ্ক্রিয়',
          body: 'বায়োমেট্রিক প্রমাণীকরণ নিষ্ক্রিয় করা হয়েছে।',
          data: { eventType: 'identity.biometric.disabled', ...p },
          idempotencyKey: 'biometric-disabled-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.biometric.disabled → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.biometric.disabled"');
  }
}
