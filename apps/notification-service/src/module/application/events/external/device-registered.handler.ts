/**
 * DeviceRegisteredHandler — identity.device.registered → Bengali email
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderDeviceRegisteredEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const DEVICE_REGISTERED_EVENT = 'identity.device.registered';

@Injectable()
export class DeviceRegisteredHandler implements OnModuleInit {
  private readonly logger = new Logger(DeviceRegisteredHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(DEVICE_REGISTERED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown>; aggregateId: string; id: string }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      const email = (p.email as string) ?? undefined;

      try {
        
      // ─── Render Bangla HTML template ───
      const html = renderDeviceRegisteredEmail({
      name: (p.name as string) ?? 'ব্যবহারকারী',
      deviceType: (p.deviceType as string) ?? 'Unknown',
      registeredAt: (p.registeredAt as string) ?? new Date().toISOString(),
      locale: (p.locale as 'en' | 'bn') ?? 'bn',
    });

      await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: '🔐 নতুন ডিভাইস থেকে লগইন',
          body: html || `প্রিয় গ্রাহক,\n\nআপনার অ্যাকাউন্টে নতুন ডিভাইস থেকে লগইন হয়েছে।\n\nযদি এটি আপনি না করে থাকেন:\n1. সাথে সাথে পাসওয়ার্ড পরিবর্তন করুন\n2. সব সেশন লগআউট করুন\n3. support@vubon.com.bd এ যোগাযোগ করুন\n\nVubon টিম`,
          data: {
          html, eventType: 'identity.device.registered', ...p },
          idempotencyKey: 'device-registered-' + (event as { id: string }).id,
          email,
        });
        this.logger.log('✅ Bengali notification sent → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.device.registered"');
  }
}
