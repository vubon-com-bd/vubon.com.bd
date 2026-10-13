/**
 * UpdateAnalyticsCommand — saga command
 * @module product-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'product.saga.update_analytics';

  constructor(
    public readonly aggregateId: string,
    public readonly eventName: string,
    public readonly payload: Readonly<Record<string, unknown>>,
    sagaId?: string,
  ) {
    super();
    if (sagaId) (this as { sagaId?: string }).sagaId = sagaId;
  }
}
