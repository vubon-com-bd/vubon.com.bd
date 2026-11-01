/**
 * InvoiceOverdueHandler — ইনভয়েস মেয়াদোত্তীর্ণ
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
import { renderInvoiceOverdueEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { UserClient } from '../../../infrastructure/services/external/user.client.js';

export const INVOICE_OVERDUE_EVENT = 'payment.invoice.overdue';

@Injectable()
export class InvoiceOverdueHandler implements OnModuleInit {
  private readonly logger = new Logger(InvoiceOverdueHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(INVOICE_OVERDUE_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log('✅ Registered handler for "payment.invoice.overdue"');
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    const userId = payload?.userId ?? event.aggregateId;

    let email: string | undefined = payload?.email;
    let phone: string | undefined = payload?.phone;
    let name: string = payload?.name ?? 'গ্রাহক';

    if (!email) {
      try {
        const user = await this.userClient.getById(userId);
        if (user) {
          email = user.email;
          phone = user.phone;
          name = user.name
            ?? (`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
              || email?.split('@')[0]
              || 'গ্রাহক');
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.warn(`User lookup failed: ${msg}`);
      }
    }

    const channels: string[] = [NOTIFICATION_CHANNEL.IN_APP];
    if (email) channels.push(NOTIFICATION_CHANNEL.EMAIL);
    if (phone) channels.push(NOTIFICATION_CHANNEL.SMS);

    try {
      const result = await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels,
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn
          ? `ইনভয়েস মেয়াদোত্তীর্ণ - ${payload?.invoiceNumber ?? ''}`
          : `Invoice Overdue - ${payload?.invoiceNumber ?? ''}`,
        body: isBn
          ? `প্রিয় ${name}, আপনার ইনভয়েস ${payload?.invoiceNumber ?? ''} মেয়াদোত্তীর্ণ হয়েছে। মোট: ৳${payload?.total ?? 0}`
          : `Hi ${name}, your invoice ${payload?.invoiceNumber ?? ''} is overdue. Total: ৳${payload?.total ?? 0}`,
        html: renderInvoiceOverdueEmail({
          name,
          email: email ?? '',
          invoiceNumber: payload?.invoiceNumber ?? '',
          total: payload?.total ?? 0,
          currency: payload?.currency ?? 'BDT',
          locale: isBn ? 'bn' : 'en',
        }),
        data: { eventType: 'payment.invoice.overdue', ...payload },
        email,
        phone,
        idempotencyKey: `invoice-overdue-${event.id}`,
      });
      this.logger.log(`✅ InvoiceOverdueHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`InvoiceOverdueHandler failed: ${msg}`);
    }
  }
}
