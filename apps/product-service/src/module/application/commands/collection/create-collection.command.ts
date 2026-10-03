/**
 * CreateCollectionCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateCollectionRequestDTO } from '../../dtos/requests/collection/create-collection.dto.js';

export class CreateCollectionCommand extends BaseCommand {
  readonly type = 'collection.create';
  constructor(
    public readonly dto: CreateCollectionRequestDTO,
    public readonly actorId: string,
  ) { super(); }
}
