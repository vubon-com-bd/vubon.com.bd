/**
 * VendorSuspensionAppealedHandler — vendor.suspension.appealed
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderSuspensionAppealApprovedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_SUSPENSION_APPEALED_EVENT = 'vendor.suspension.appealed';

@Injectable()
export class VendorSuspensionAppealedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorSuspensionAppealedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_SUSPENSION_APPEALED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.vendorId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderSuspensionAppealApprovedEmail({
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
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: isBn ? 'Appealed' : 'Appealed',
          body: html || 'Your suspension appeal has been submitted.',
          data: { eventType: 'vendor.suspension.appealed', ...p , html },
          idempotencyKey: 'vendor-suspension-appealed-' + (event as { id: string }).id,
        });
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.suspension.appealed"');
  }
}
