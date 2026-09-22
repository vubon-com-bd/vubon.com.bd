import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class VoidInvoiceCommand extends BaseCommand {
  readonly type = 'invoice.void';

  constructor(
    public readonly invoiceId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
