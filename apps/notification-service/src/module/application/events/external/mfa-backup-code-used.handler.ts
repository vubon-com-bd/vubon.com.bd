/**
 * MfaBackupCodeUsedHandler — identity.mfa.backup_code_used
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

export const MFA_BACKUP_CODE_USED_EVENT = 'identity.mfa.backup_code_used';

@Injectable()
export class MfaBackupCodeUsedHandler implements OnModuleInit {
  private readonly logger = new Logger(MfaBackupCodeUsedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(MFA_BACKUP_CODE_USED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (p.authId as string) ?? (event as { aggregateId: string }).aggregateId;

      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SECURITY,
          category: NOTIFICATION_CATEGORY.SECURITY,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'ব্যাকআপ কোড ব্যবহার',
          body: 'লগইনের জন্য ব্যাকআপ কোড ব্যবহার করা হয়েছে।',
          data: { eventType: 'identity.mfa.backup_code_used', ...p },
          idempotencyKey: 'mfa-backup-code-used-' + (event as { id: string }).id,
        });
        this.logger.log('✅ identity.mfa.backup_code_used → ' + userId);
      } catch (err) {
        this.logger.error('Failed: ' + (err instanceof Error ? err.message : 'unknown'));
      }
    });
    this.logger.log('✅ Registered handler for "identity.mfa.backup_code_used"');
  }
}
