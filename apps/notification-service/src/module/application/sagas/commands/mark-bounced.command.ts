import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class MarkBouncedSagaCommand extends BaseSagaCommand {
  readonly type = 'saga.mark-bounced';

  constructor(
    public readonly deliveryId: string,
    public readonly bounceType: string,
    public readonly reason: string,
  ) {
    super();
  }
}
