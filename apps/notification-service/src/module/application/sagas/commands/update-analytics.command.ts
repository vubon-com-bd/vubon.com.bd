/**
 * UpdateAnalyticsCommand — analytics tracking from saga
 * @module notification-service/application/sagas/commands
 *
 * Fire-and-forget — does not affect saga flow.
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'notification.saga.update_analytics';

  constructor(
    public readonly entityId: string,
    public readonly eventType: string,
    public readonly payload: Readonly<Record<string, unknown>>,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
