/**
 * ProcessRefundCommand — saga helper
 * @module order-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class ProcessRefundCommand extends BaseSagaCommand {
  readonly type = 'order.saga.process-refund';
  constructor(
    public readonly orderId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly reason: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
