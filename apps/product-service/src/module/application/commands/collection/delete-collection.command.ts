/**
 * DeleteCollectionCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeleteCollectionCommand extends BaseCommand {
  readonly type = 'collection.delete';
  constructor(
    public readonly collectionId: string,
    public readonly actorId: string,
  ) { super(); }
}
