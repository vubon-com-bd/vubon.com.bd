/**
 * MfaBackupCodesExhaustedHandler — identity.mfa.backup_codes_exhausted
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

export const MFA_BACKUP_CODES_EXHAUSTED_EVENT = 'identity.mfa.backup_codes_exhausted';

@Injectable()
export class MfaBackupCodesExhaustedHandler implements OnModuleInit {
  private readonly logger = new Logger(MfaBackupCodesExhaustedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(MFA_BACKUP_CODES_EXHAUSTED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.CRITICAL,
          subject: 'ব্যাকআপ কোড শেষ',
          body: 'সব ব্যাকআপ কোড শেষ হয়ে গেছে।',
          data: { eventType: 'identity.mfa.backup_codes_exhausted', ...p },
          idempotencyKey: 'mfa-backup-codes-exhausted-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.mfa.backup_codes_exhausted → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.mfa.backup_codes_exhausted"');
  }
}
