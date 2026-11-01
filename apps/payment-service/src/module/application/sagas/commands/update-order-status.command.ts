/**
 * UpdateOrderStatusCommand
 * @module payment-service/application/sagas/commands
 *
 * Cross-service command — order-service consumes this via Kafka/RabbitMQ.
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateOrderStatusCommand extends BaseSagaCommand {
  readonly type = 'payment.saga.update_order_status';
  constructor(
    public readonly orderId: string,
    public readonly newStatus: string,
    public readonly reason?: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
