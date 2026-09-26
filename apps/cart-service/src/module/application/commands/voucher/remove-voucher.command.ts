import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RemoveVoucherCommand extends BaseCommand {
  readonly type = 'cart.voucher.remove';

  constructor(
    public readonly cartId: string,
    public readonly code: string,
  ) {
    super();
  }
}
