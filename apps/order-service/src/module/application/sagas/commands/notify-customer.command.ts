/**
 * NotifyCustomerCommand — saga helper
 * @module order-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyCustomerCommand extends BaseSagaCommand {
  readonly type = 'order.saga.notify-customer';
  constructor(
    public readonly userId: string,
    public readonly orderId: string,
    public readonly template: string,
    public readonly data: Readonly<Record<string, unknown>>,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
