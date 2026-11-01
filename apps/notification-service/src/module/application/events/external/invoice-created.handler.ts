/**
 * InvoiceCreatedHandler — notifies when invoice is generated
 * @module notification-service/application/events/external
 *
 * 🔑 FIX: invoice payload-এ email নেই → user.client দিয়ে fetch
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
import { renderInvoiceCreatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { UserClient } from '../../../infrastructure/services/external/user.client.js';

export const INVOICE_CREATED_EVENT = 'payment.invoice.created';

@Injectable()
export class InvoiceCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(InvoiceCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(INVOICE_CREATED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${INVOICE_CREATED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    const userId = payload?.userId ?? event.aggregateId;

    // 🔑 FIX: email/phone fetch from identity
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
        this.logger.log(
          `🔎 Invoice → fetched user: email=${email ?? 'N/A'}, name=${name}`,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.warn(`User lookup failed for ${userId}: ${msg}`);
      }
    }

    // Build channels — email থাকলে email push
    const channels: string[] = [NOTIFICATION_CHANNEL.IN_APP];
    if (email) channels.push(NOTIFICATION_CHANNEL.EMAIL);
    if (phone) channels.push(NOTIFICATION_CHANNEL.SMS);

    this.logger.log(
      `📨 Invoice notify channels: [${channels.join(',')}] for user ${userId}`,
    );

    try {
      const result = await this.notificationService.send({
        userId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels,
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn
          ? `ইনভয়েস তৈরি - ${payload?.invoiceNumber ?? ''}`
          : `Invoice Created - ${payload?.invoiceNumber ?? ''}`,
        body: isBn
          ? `প্রিয় ${name}, আপনার ইনভয়েস ${payload?.invoiceNumber ?? ''} তৈরি হয়েছে। মোট: ৳${payload?.total ?? 0}`
          : `Hi ${name}, your invoice ${payload?.invoiceNumber ?? ''} has been created. Total: ৳${payload?.total ?? 0}`,
        html: renderInvoiceCreatedEmail({
          name,
          email: email ?? '',
          invoiceNumber: payload?.invoiceNumber ?? '',
          total: payload?.total ?? 0,
          currency: payload?.currency ?? 'BDT',
          locale: isBn ? 'bn' : 'en',
        }),
        data: {
          eventType: 'payment.invoice.created',
          ...payload,
        },
        email,
        phone,
        idempotencyKey: `invoice-created-${event.id}`,
      });

      this.logger.log(
        `✅ InvoiceCreatedHandler — ${result.notificationIds?.length ?? 0} channel(s) sent for ${payload?.invoiceNumber}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`InvoiceCreatedHandler failed: ${msg}`);
    }
  }
}
