/**
 * AddressAddedHandler — confirms address addition
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

export const ADDRESS_ADDED_EVENT = 'identity.user.address_added';

@Injectable()
export class AddressAddedHandler implements OnModuleInit {
  private readonly logger = new Logger(AddressAddedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ADDRESS_ADDED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ADDRESS_ADDED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.LOW,
        subject: isBn ? `নতুন ঠিকানা যোগ হয়েছে` : `New Address Added`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার অ্যাকাউন্টে নতুন ঠিকানা যোগ হয়েছে: ${payload?.addressLabel ?? ""}` : `Hi ${payload?.name ?? "Customer"}, a new address has been added: ${payload?.addressLabel ?? ""}`,
        data: { eventType: 'identity.user.address_added', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `address-added-${event.id}`,
      });
      this.logger.log(`✅ AddressAddedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`AddressAddedHandler failed: ${err}`);
    }
  }
}
