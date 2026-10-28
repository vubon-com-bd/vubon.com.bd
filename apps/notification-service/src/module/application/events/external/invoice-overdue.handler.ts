/**
 * InvoiceOverdueHandler — notifies overdue invoice
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

export const INVOICE_OVERDUE_EVENT = 'payment.invoice.overdue';

@Injectable()
export class InvoiceOverdueHandler implements OnModuleInit {
  private readonly logger = new Logger(InvoiceOverdueHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(INVOICE_OVERDUE_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${INVOICE_OVERDUE_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? `⚠️ ইনভয়েস ওভারডিউ` : `⚠️ Invoice Overdue`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার ইনভয়েস ${payload?.invoiceNumber ?? ""} ওভারডিউ হয়েছে। দ্রুত পরিশোধ করুন ৳${payload?.total ?? 0}।` : `Hi ${payload?.name ?? "Customer"}, invoice ${payload?.invoiceNumber ?? ""} is overdue. Please pay ৳${payload?.total ?? 0}.`,
        data: { eventType: 'payment.invoice.overdue', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `invoice-overdue-${event.id}`,
      });
      this.logger.log(`✅ InvoiceOverdueHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`InvoiceOverdueHandler failed: ${err}`);
    }
  }
}
