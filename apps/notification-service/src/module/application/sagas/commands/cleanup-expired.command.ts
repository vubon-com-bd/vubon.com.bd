/**
 * CleanupExpiredCommand — periodic cleanup of expired notifications
 * @module notification-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class CleanupExpiredCommand extends BaseSagaCommand {
  readonly type = 'notification.saga.cleanup_expired';

  constructor(
    public readonly cutoffDate: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
