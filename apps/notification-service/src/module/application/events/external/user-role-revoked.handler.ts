/**
 * UserRoleRevokedHandler — reacts to user.role_revoked
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderRoleRevokedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
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

export const USER_ROLE_REVOKED_EVENT = 'identity.user.role_revoked';

interface UserRoleRevokedHandlerPayload {
  readonly userId: string;
  readonly role: string;
  readonly revokedBy: string | undefined;
}

interface UserRoleRevokedHandlerEvent {
  readonly id: string;
  readonly type: 'identity.user.role_revoked';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: UserRoleRevokedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class UserRoleRevokedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserRoleRevokedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_ROLE_REVOKED_EVENT, async (event) => {
      await this.handle(event as unknown as UserRoleRevokedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_ROLE_REVOKED_EVENT}"`);
  }

  private async handle(event: UserRoleRevokedHandlerEvent): Promise<void> {
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
    this.logger.log(`Received user.role_revoked — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        // ─── HTML template (rendered first) ───
        let html = '';
      try {
        html = renderRoleRevokedEmail({
          name: (payload as any).name ?? 'User',
          role: (payload as any).role ?? '',
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }


      const resolved = resolveTemplate(
          this.i18n,
          'EMAIL_VERIFIED',
          locale,
          {
            role: (payload as any).role
          },
          {
            subject: 'Role Revoked',
            body: html,
          },
        );


            const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.LOW,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
          eventType: 'identity.user.role_revoked',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `userrolerevoked-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`UserRoleRevokedHandler failed: ${msg}`);
    }
  }
}
