import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateAttributeCommand extends BaseCommand {
  readonly type = 'product.attribute.update';

  constructor(
    public readonly attributeId: string,
    public readonly value: string,
  ) {
    super();
  }
}
