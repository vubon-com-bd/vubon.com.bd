import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdatePaymentMethodCommand extends BaseCommand {
  readonly type = 'method.update';

  constructor(
    public readonly methodId: string,
    public readonly cardExpiry?: string,
    public readonly cardToken?: string,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
