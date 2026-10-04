/**
 * AddAttributeCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddAttributeRequestDTO } from '../../dtos/requests/attribute/add-attribute.dto.js';

export class AddAttributeCommand extends BaseCommand {
  readonly type = 'attribute.add';
  constructor(
    public readonly dto: AddAttributeRequestDTO,
    public readonly actorId: string,
  ) { super(); }
}
