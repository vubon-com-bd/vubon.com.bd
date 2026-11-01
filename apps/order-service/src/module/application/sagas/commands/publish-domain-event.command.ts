/**
 * PublishDomainEventCommand — saga helper
 * @module order-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class PublishDomainEventCommand extends BaseSagaCommand {
  readonly type = 'order.saga.publish-event';
  constructor(
    public readonly aggregateId: string,
    public readonly eventType: string,
    public readonly payload: Readonly<Record<string, unknown>>,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
