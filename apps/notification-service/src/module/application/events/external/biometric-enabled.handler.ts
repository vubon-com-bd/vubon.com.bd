/**
 * BiometricEnabledHandler — identity.biometric.enabled
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

export const BIOMETRIC_ENABLED_EVENT = 'identity.biometric.enabled';

@Injectable()
export class BiometricEnabledHandler implements OnModuleInit {
  private readonly logger = new Logger(BiometricEnabledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(BIOMETRIC_ENABLED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: 'বায়োমেট্রিক সক্রিয়',
          body: 'বায়োমেট্রিক প্রমাণীকরণ সক্রিয় করা হয়েছে।',
          data: { eventType: 'identity.biometric.enabled', ...p },
          idempotencyKey: 'biometric-enabled-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.biometric.enabled → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.biometric.enabled"');
  }
}
