import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApplyVoucherCommand extends BaseCommand {
  readonly type = 'cart.voucher.apply';

  constructor(
    public readonly cartId: string,
    public readonly code: string,
  ) {
    super();
  }
}
