import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddPaymentMethodCommand extends BaseCommand {
  readonly type = 'method.add';

  constructor(
    public readonly userId: string,
    public readonly method: string,
    public readonly gateway?: string,
    public readonly cardToken?: string,
    public readonly cardLast4?: string,
    public readonly cardBrand?: string,
    public readonly cardExpiry?: string,
    public readonly walletAddress?: string,
    public readonly isDefault?: boolean,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
