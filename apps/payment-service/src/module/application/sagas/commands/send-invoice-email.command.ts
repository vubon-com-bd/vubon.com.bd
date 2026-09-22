import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendInvoiceEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.send-invoice-email';

  constructor(public readonly subscriptionId: string) {
    super();
  }
}
