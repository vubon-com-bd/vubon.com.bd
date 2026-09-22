import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteCollectionCommand extends BaseCommand {
  readonly type = 'product.collection.delete';

  constructor(public readonly collectionId: string) {
    super();
  }
}
