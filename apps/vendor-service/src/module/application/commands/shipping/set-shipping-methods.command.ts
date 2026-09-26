import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SetShippingMethodsCommand extends BaseCommand {
  readonly type = 'vendor.shipping.set-methods';

  constructor(
    public readonly vendorId: string,
    public readonly methods: readonly string[],
  ) {
    super();
  }
}
