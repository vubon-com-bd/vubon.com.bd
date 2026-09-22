import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateCollectionCommand extends BaseCommand {
  readonly type = 'product.collection.update';

  constructor(
    public readonly collectionId: string,
    public readonly name: string,
  ) {
    super();
  }
}
