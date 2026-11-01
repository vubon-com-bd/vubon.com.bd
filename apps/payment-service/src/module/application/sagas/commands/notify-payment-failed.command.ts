/**
 * NotifyPaymentFailedCommand
 * @module payment-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyPaymentFailedCommand extends BaseSagaCommand {
  readonly type = 'payment.saga.notify_payment_failed';
  constructor(
    public readonly paymentId: string,
    public readonly userId: string,
    public readonly reason: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
