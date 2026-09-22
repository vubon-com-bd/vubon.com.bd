import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class GenerateInvoiceCommand extends BaseCommand {
  readonly type = 'invoice.generate';

  constructor(
    public readonly amount: number,
    public readonly currency: string,
    public readonly userId?: string,
    public readonly orderId?: string,
    public readonly subscriptionId?: string,
    public readonly taxAmount?: number,
    public readonly dueAt?: string,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
