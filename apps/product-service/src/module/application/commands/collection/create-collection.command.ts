import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateCollectionCommand extends BaseCommand {
  readonly type = 'product.collection.create';

  constructor(
    public readonly name: string,
    public readonly collectionType: string,
  ) {
    super();
  }
}
