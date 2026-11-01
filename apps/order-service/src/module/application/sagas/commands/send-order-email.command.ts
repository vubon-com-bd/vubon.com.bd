/**
 * SendOrderEmailCommand — saga helper
 * @module order-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SendOrderEmailCommand extends BaseSagaCommand {
  readonly type = 'order.saga.send-email';
  constructor(
    public readonly orderId: string,
    public readonly email: string,
    public readonly template: string,
    public readonly data: Readonly<Record<string, unknown>>,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
