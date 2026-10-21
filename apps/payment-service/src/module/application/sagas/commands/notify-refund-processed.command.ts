/**
 * NotifyRefundProcessedCommand
 * @module payment-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyRefundProcessedCommand extends BaseSagaCommand {
  readonly type = 'payment.saga.notify_refund_processed';
  constructor(
    public readonly refundId: string,
    public readonly paymentId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
