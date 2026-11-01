/**
 * MarkBouncedCommand — record bounce outcome
 * @module notification-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class MarkBouncedCommand extends BaseSagaCommand {
  readonly type = 'notification.saga.mark_bounced';

  constructor(
    public readonly notificationId: string,
    public readonly bounceType: 'soft' | 'hard' | 'complaint' | 'unknown',
    public readonly action: 'retry' | 'block' | 'unsubscribe' | 'suppress',
    public readonly reason: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
