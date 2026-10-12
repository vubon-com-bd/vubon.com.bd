/**
 * UserEventsHandler — cross-service consumer for user events
 * @module notification-service/infrastructure/handlers
 *
 * user.created   → welcome email + push
 * kyc.verified   → "KYC approved" (email + in_app)
 * kyc.rejected   → "KYC needs attention" (email + in_app)
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CATEGORY,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPE,
} from '@vubon/shared-constants/platform/notification';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../application/services/interfaces/notification.service.interface.js';

interface UserEventPayload {
  readonly userId?: string;
  readonly customerId?: string;
  readonly email?: string;
  readonly name?: string;
  readonly reason?: string;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

type UserKind = 'created' | 'kyc.verified' | 'kyc.rejected';

@Injectable()
export class UserEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(UserEventsHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notifications: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    const events: readonly (readonly [string, UserKind])[] = [
      ['user.created', 'created'],
      ['kyc.verified', 'kyc.verified'],
      ['kyc.rejected', 'kyc.rejected'],
    ];
    for (const [eventType, kind] of events) {
      this.eventBus.registerHandler(eventType, async (event) => {
        await this.onUserEvent(event, kind);
      });
    }
    this.logger.log(`🔗 UserEventsHandler subscribed to user.created, kyc.verified, kyc.rejected`);
  }

  private async onUserEvent(event: unknown, kind: UserKind): Promise<void> {
    const env = event as DomainEventEnvelope;
    const p = (env.payload ?? {}) as UserEventPayload;
    const userId = p.userId ?? p.customerId;

    if (!userId) {
      this.logger.warn(`${env.type} — missing userId, skipping`);
      return;
    }

    const tpl = this.template(kind, p);
    this.logger.log(`📬 ${env.type} → notify user ${userId}`);

    try {
      await this.notifications.send(
        {
          userId,
          type: tpl.type,
          category: NOTIFICATION_CATEGORY.USER,
          channels: tpl.channels,
          priority: tpl.priority,
          title: tpl.title,
          body: tpl.body,
          data: { kind },
        },
        'system:user-events-handler',
      );
      this.logger.log(`✅ ${env.type} notification sent to ${userId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`❌ ${env.type} notification failed: ${msg}`);
    }
  }

  private template(kind: UserKind, p: UserEventPayload) {
    const name = p.name ?? 'there';
    switch (kind) {
      case 'created':
        return {
          type: NOTIFICATION_TYPE.WELCOME,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.NORMAL,
          title: `Welcome to Vubon, ${name}!`,
          body: `Thanks for signing up. Explore our catalog and enjoy exclusive offers.`,
        };
      case 'kyc.verified':
        return {
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: 'KYC approved',
          body: 'Your identity verification is complete. You now have full access to all features.',
        };
      case 'kyc.rejected':
        return {
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.IN_APP] as const,
          priority: NOTIFICATION_PRIORITY.HIGH,
          title: 'KYC needs attention',
          body: `Your KYC submission could not be approved${p.reason ? `: ${p.reason}` : ''}. Please resubmit with valid documents.`,
        };
    }
  }
}
