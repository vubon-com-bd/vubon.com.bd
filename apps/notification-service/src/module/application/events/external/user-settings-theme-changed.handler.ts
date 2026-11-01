/**
 * UserSettingsThemeChangedHandler — identity.user.settings_theme_changed
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

export const USER_SETTINGS_THEME_CHANGED_EVENT = 'identity.user.settings_theme_changed';

@Injectable()
export class UserSettingsThemeChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserSettingsThemeChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_SETTINGS_THEME_CHANGED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
          category: NOTIFICATION_CATEGORY.USER,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.LOW,
          subject: 'থিম পরিবর্তন',
          body: 'আপনার থিম পরিবর্তন করা হয়েছে।',
          data: { eventType: 'identity.user.settings_theme_changed', ...p },
          idempotencyKey: 'user-settings-theme-changed-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.user.settings_theme_changed → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.user.settings_theme_changed"');
  }
}
