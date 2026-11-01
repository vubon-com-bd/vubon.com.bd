import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateAttributeRequestDTO } from '../../dtos/requests/attribute/index.js';

export class UpdateAttributeCommand extends BaseCommand {
  readonly type = 'product.attribute.update';
  constructor(public readonly dto: UpdateAttributeRequestDTO) {
    super();
  }
}
