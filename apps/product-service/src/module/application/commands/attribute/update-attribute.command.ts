/**
 * UpdateAttributeCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateAttributeRequestDTO } from '../../dtos/requests/attribute/update-attribute.dto.js';

export class UpdateAttributeCommand extends BaseCommand {
  readonly type = 'attribute.update';
  constructor(public readonly dto: UpdateAttributeRequestDTO) { super(); }
}
