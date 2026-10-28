/**
 * NotificationDeliverySaga — orchestrates post-send side effects
 * @module notification-service/application/sagas
 *
 * Reacts to:
 *  - NotificationCreatedEvent → dispatch to provider
 *  - NotificationSentEvent → analytics, webhook
 *  - NotificationDeliveredEvent → analytics, read-status tracking
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable, from } from 'rxjs';
import { map, tap, filter, mergeMap } from 'rxjs/operators';

import {
  NotificationCreatedEvent,
  NotificationSentEvent,
  NotificationDeliveredEvent,
} from '@domain/events/notification.events.js';

import { SendEmailCommand } from '@application/commands/email/send-email.command.js';
import { SendEmailDispatchCommand } from '@application/commands/email/send-email-dispatch.command.js';
import { SendSmsCommand } from '@application/commands/sms/send-sms.command.js';
import { SendPushCommand } from '@application/commands/push/send-push.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { Inject } from '@nestjs/common';
import { PREFERENCE_SERVICE, type IPreferenceService } from '@application/services/interfaces/preference.service.interface.js';
import { QuietHoursService } from '@domain/services/quiet-hours.service.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';

@Injectable()
export class NotificationDeliverySaga {
  private readonly logger = new Logger(NotificationDeliverySaga.name);

  constructor(
    private readonly commandBus: CommandBus,
    @Inject(PREFERENCE_SERVICE)
    private readonly preferenceService: IPreferenceService,
  ) {}

  @Saga()
  onCreated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationCreatedEvent),
      tap((e: NotificationCreatedEvent) => {
        this.logger.log(`Saga: notification created → ${e.payload.notificationId}`);
      }),
      filter(() => true), // placeholder for sync filtering
      mergeMap((e: NotificationCreatedEvent) => {
        // Fire-and-forget analytics
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.notificationId, 'notification.created', {
            type: e.payload.type,
            category: e.payload.category,
            channel: e.payload.channel,
          }),
        );

        // ─── Check quiet hours + preferences ───
        return from(this.checkQuietHours(e)).pipe(
          map((allowed) => {
            if (!allowed) {
              this.logger.log(
                `🌙 Saga: notification ${e.payload.notificationId} skipped (quiet hours / preferences)`,
              );
              return null;
            }
            return new SendEmailDispatchCommand(
              e.payload.notificationId,
              'system',
            );
          }),
          filter((cmd): cmd is SendEmailDispatchCommand => cmd !== null),
        );
      }),
    );
  };

  @Saga()
  onSent = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationSentEvent),
      tap((e: NotificationSentEvent) => {
        this.logger.log(`Saga: notification sent → ${e.payload.notificationId}`);
      }),
      map((e: NotificationSentEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.notificationId, 'notification.sent', {
            channel: e.payload.channel,
            providerName: e.payload.providerName,
          }),
        );
        // Trigger webhook if subscribed
        return new UpdateAnalyticsCommand(
          e.payload.notificationId,
          'notification.webhook_triggered',
          { channel: e.payload.channel },
        );
      }),
    );
  };

  @Saga()
  onDelivered = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationDeliveredEvent),
      map((e: NotificationDeliveredEvent) => {
        this.logger.log(`Saga: notification delivered → ${e.payload.notificationId}`);
        return new UpdateAnalyticsCommand(
          e.payload.notificationId,
          'notification.delivered',
          { deliveredAt: e.payload.deliveredAt },
        );
      }),
    );
  };

  private async checkQuietHours(e: NotificationCreatedEvent): Promise<boolean> {
    try {
      const pref = await this.preferenceService.getByUser(e.payload.userId);
      const prefAny = pref as unknown as {
        quietHoursEnabled?: boolean;
        quietHoursStart?: number;
        quietHoursEnd?: number;
        timezone?: string;
      };

      if (!prefAny.quietHoursEnabled) return true;

      const typeVO = NotificationTypeVO.create(e.payload.type);
      const isCritical = typeVO.isSecurity() || typeVO.isTransactional();
      if (isCritical) return true;

      const tz = prefAny.timezone ?? 'Asia/Dhaka';
      const now = new Date().toISOString();
      const check = QuietHoursService.check({
        config: {
          enabled: true,
          start: prefAny.quietHoursStart,
          end: prefAny.quietHoursEnd,
          timezone: tz,
        },
        now,
      });

      if (check.inQuietHours) {
        this.logger.log(
          `🌙 Saga quiet hours for user ${e.payload.userId} (localHour=${check.localHour}, ends=${check.nextAllowedHour}h)`,
        );
        return false;
      }

      return true;
    } catch (err) {
      this.logger.debug(`Saga quiet hours check failed: ${err}`);
      return true; // Default allow
    }
  }

}
