/**
 * RetryDeliveryCommand — re-attempt failed delivery
 * @module notification-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class RetryDeliveryCommand extends BaseSagaCommand {
  readonly type = 'notification.saga.retry_delivery';

  constructor(
    public readonly notificationId: string,
    public readonly attemptNumber: number,
    public readonly delayMs: number,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
