/**
 * VendorApprovedHandler — reacts to vendor.approval.approved
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
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

export const VENDOR_APPROVED_EVENT = 'vendor.approval.approved';

interface VendorApprovedHandlerPayload {
  readonly vendorId: string;
  readonly approvedBy: string | undefined;
}

interface VendorApprovedHandlerEvent {
  readonly id: string;
  readonly type: 'vendor.approval.approved';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: VendorApprovedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class VendorApprovedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorApprovedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_APPROVED_EVENT, async (event) => {
      await this.handle(event as unknown as VendorApprovedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_APPROVED_EVENT}"`);
  }

  private async handle(event: VendorApprovedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received vendor.approval.approved — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'VENDOR_APPROVED',
          locale,
          {
            
          },
          {
            subject: 'Vendor Approved',
            body: 'Congratulations! Your vendor account has been approved.',
          },
        );

        const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          eventType: 'vendor.approval.approved',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `vendorapproved-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`VendorApprovedHandler failed: ${msg}`);
    }
  }
}
