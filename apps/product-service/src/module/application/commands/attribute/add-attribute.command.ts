import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddAttributeCommand extends BaseCommand {
  readonly type = 'product.attribute.add';

  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly value: string,
  ) {
    super();
  }
}
