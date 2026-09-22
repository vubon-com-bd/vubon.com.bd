import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface SplitShareInput {
  readonly recipientId: string;
  readonly percentage: number;
}

export class CreateSplitPaymentCommand extends BaseCommand {
  readonly type = 'split.create';

  constructor(
    public readonly paymentId: string,
    public readonly splitType: string,
    public readonly shares: readonly SplitShareInput[],
    public readonly currency: string,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
