/**
 * VendorSuspendedHandler — reacts to vendor.vendor.suspended
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const VENDOR_SUSPENDED_EVENT = 'vendor.vendor.suspended';

interface VendorSuspendedHandlerPayload {
  readonly vendorId: string;
  readonly reason: string | undefined;
}

interface VendorSuspendedHandlerEvent {
  readonly id: string;
  readonly type: 'vendor.vendor.suspended';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: VendorSuspendedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class VendorSuspendedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorSuspendedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_SUSPENDED_EVENT, async (event) => {
      await this.handle(event as unknown as VendorSuspendedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_SUSPENDED_EVENT}"`);
  }

  private async handle(event: VendorSuspendedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received vendor.vendor.suspended — ${JSON.stringify(payload)}`);

    try {
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: 'Vendor Suspended',
        body: `Your vendor account has been suspended. Reason: {reason}`,
        data: {
          eventType: 'vendor.vendor.suspended',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `vendorsuspended-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`VendorSuspendedHandler failed: ${msg}`);
    }
  }
}
