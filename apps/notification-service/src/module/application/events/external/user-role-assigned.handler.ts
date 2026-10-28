/**
 * UserRoleAssignedHandler — reacts to user.role_assigned
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderRoleAssignedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
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

export const USER_ROLE_ASSIGNED_EVENT = 'identity.user.role_assigned';

interface UserRoleAssignedHandlerPayload {
  readonly userId: string;
  readonly role: string;
  readonly assignedBy: string | undefined;
}

interface UserRoleAssignedHandlerEvent {
  readonly id: string;
  readonly type: 'identity.user.role_assigned';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: UserRoleAssignedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class UserRoleAssignedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserRoleAssignedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_ROLE_ASSIGNED_EVENT, async (event) => {
      await this.handle(event as unknown as UserRoleAssignedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_ROLE_ASSIGNED_EVENT}"`);
  }

  private async handle(event: UserRoleAssignedHandlerEvent): Promise<void> {
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
    this.logger.log(`Received user.role_assigned — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'EMAIL_VERIFIED',
          locale,
          {
            role: (payload as any).role
          },
          {
            subject: 'New Role Assigned',
            body: 'A new role has been assigned: {{role}}',
          },
        );

              let html = '';
      try {
        html = renderRoleAssignedEmail({
          name: (payload as any).name ?? 'User',
          role: (payload as any).role ?? '',
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
          eventType: 'identity.user.role_assigned',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `userroleassigned-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`UserRoleAssignedHandler failed: ${msg}`);
    }
  }
}
