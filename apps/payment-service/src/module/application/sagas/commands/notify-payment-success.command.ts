/**
 * NotifyPaymentSuccessCommand
 * @module payment-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyPaymentSuccessCommand extends BaseSagaCommand {
  readonly type = 'payment.saga.notify_payment_success';
  constructor(
    public readonly paymentId: string,
    public readonly userId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
