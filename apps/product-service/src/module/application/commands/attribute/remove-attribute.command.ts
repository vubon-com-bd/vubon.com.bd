import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RemoveAttributeCommand extends BaseCommand {
  readonly type = 'product.attribute.remove';

  constructor(public readonly attributeId: string) {
    super();
  }
}
