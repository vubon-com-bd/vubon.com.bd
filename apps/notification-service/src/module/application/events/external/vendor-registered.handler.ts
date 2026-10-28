/**
 * VendorRegisteredHandler — reacts to vendor.vendor.registered
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderVendorWelcomeEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';
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

export const VENDOR_REGISTERED_EVENT = 'vendor.vendor.registered';

interface VendorRegisteredHandlerPayload {
  readonly vendorId: string;
  readonly userId: string;
  readonly businessName: string;
}

interface VendorRegisteredHandlerEvent {
  readonly id: string;
  readonly type: 'vendor.vendor.registered';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: VendorRegisteredHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class VendorRegisteredHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorRegisteredHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_REGISTERED_EVENT, async (event) => {
      await this.handle(event as unknown as VendorRegisteredHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_REGISTERED_EVENT}"`);
  }

  private async handle(event: VendorRegisteredHandlerEvent): Promise<void> {
    const payload = event.payload;

    // ─── Fetch user profile for email/name/locale ───
    const _userId = (payload as any).userId ?? (payload as any).customerId ?? event.aggregateId;
    let userEmail = (payload as any).email;
    let userName = (payload as any).name;
    let userLocale = (payload as any).locale;
    if (!userEmail && _userId) {
      try {
        const profile = await this.userClient.getById(_userId);
        if (profile) {
          userEmail = userEmail ?? profile.email;
          userName = userName ?? profile.name ?? profile.firstName;
          userLocale = userLocale ?? (profile.locale as 'en' | 'bn' | undefined);
        }
      } catch (err) {
        this.logger.warn(`User fetch failed for ${_userId}: ${err}`);
      }
    }
    this.logger.log(`Received vendor.vendor.registered — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'WELCOME',
          locale,
          {
            name: (payload as any).name
          },
          {
            subject: 'Welcome Vendor',
            body: 'Welcome {{name}}, your vendor account has been registered.',
          },
        );

              let html = '';
      try {
        html = renderVendorWelcomeEmail({
          name: (payload as any).name ?? 'Vendor',
          businessName: (payload as any).businessName ?? '',
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
          eventType: 'vendor.vendor.registered',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `vendorregistered-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`VendorRegisteredHandler failed: ${msg}`);
    }
  }
}
