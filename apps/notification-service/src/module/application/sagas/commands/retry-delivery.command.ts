import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class RetryDeliverySagaCommand extends BaseSagaCommand {
  readonly type = 'saga.retry-delivery';

  constructor(
    public readonly deliveryId: string,
    public readonly attempt: number,
  ) {
    super();
  }
}
