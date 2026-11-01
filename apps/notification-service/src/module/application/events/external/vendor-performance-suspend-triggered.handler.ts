/**
 * VendorPerformanceSuspendTriggeredHandler — vendor.performance.auto_suspend_triggered
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderPerformanceAutoSuspendEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_PERFORMANCE_SUSPEND_TRIGGERED_EVENT = 'vendor.performance.auto_suspend_triggered';

@Injectable()
export class VendorPerformanceSuspendTriggeredHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorPerformanceSuspendTriggeredHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_PERFORMANCE_SUSPEND_TRIGGERED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.vendorId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderPerformanceAutoSuspendEmail({
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
          type: NOTIFICATION_TYPE.ALERT,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.CRITICAL,
          subject: isBn ? 'Auto Suspend Triggered' : 'Auto Suspend Triggered',
          body: html || 'Your account has been auto-suspended due to performance issues.',
          data: { eventType: 'vendor.performance.auto_suspend_triggered', ...p , html },
          idempotencyKey: 'vendor-performance-suspend-triggered-' + (event as { id: string }).id,
        });
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "vendor.performance.auto_suspend_triggered"');
  }
}
