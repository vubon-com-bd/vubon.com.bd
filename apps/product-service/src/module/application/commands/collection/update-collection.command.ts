/**
 * UpdateCollectionCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateCollectionRequestDTO } from '../../dtos/requests/collection/update-collection.dto.js';

export class UpdateCollectionCommand extends BaseCommand {
  readonly type = 'collection.update';
  constructor(public readonly dto: UpdateCollectionRequestDTO) { super(); }
}
