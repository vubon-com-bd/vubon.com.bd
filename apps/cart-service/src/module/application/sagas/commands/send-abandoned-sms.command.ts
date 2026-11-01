import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SendAbandonedSmsCommand extends BaseSagaCommand {
  readonly type = 'cart.saga.send_abandoned_sms';

  constructor(
    public readonly userId: string,
    public readonly abandonedCartId: string,
    public readonly phone: string,
    public readonly itemCount: number,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
