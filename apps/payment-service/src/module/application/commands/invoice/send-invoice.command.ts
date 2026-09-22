import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendInvoiceCommand extends BaseCommand {
  readonly type = 'invoice.send';

  constructor(
    public readonly invoiceId: string,
    public readonly toEmail?: string,
  ) {
    super();
  }
}
