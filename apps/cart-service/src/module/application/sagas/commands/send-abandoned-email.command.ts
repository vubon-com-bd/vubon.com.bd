import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SendAbandonedEmailCommand extends BaseSagaCommand {
  readonly type = 'cart.saga.send_abandoned_email';

  constructor(
    public readonly userId: string,
    public readonly abandonedCartId: string,
    public readonly cartId: string,
    public readonly itemCount: number,
    public readonly cartValue: number,
    public readonly currency: string,
    public readonly template: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
