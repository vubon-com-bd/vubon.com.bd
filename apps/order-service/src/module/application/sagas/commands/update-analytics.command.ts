/**
 * UpdateAnalyticsCommand — saga helper
 * @module order-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'order.saga.update-analytics';
  constructor(
    public readonly orderId: string,
    public readonly event: string,
    public readonly data: Readonly<Record<string, unknown>>,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
