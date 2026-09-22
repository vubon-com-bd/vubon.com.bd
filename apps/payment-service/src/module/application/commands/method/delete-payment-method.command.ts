import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeletePaymentMethodCommand extends BaseCommand {
  readonly type = 'method.delete';

  constructor(public readonly methodId: string) {
    super();
  }
}
