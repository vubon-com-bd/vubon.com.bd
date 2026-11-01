import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SendAbandonedPushCommand extends BaseSagaCommand {
  readonly type = 'cart.saga.send_abandoned_push';

  constructor(
    public readonly userId: string,
    public readonly abandonedCartId: string,
    public readonly deviceToken: string,
    public readonly title: string,
    public readonly body: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
