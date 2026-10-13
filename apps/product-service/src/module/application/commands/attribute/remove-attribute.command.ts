import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveAttributeRequestDTO } from '../../dtos/requests/attribute/index.js';

export class RemoveAttributeCommand extends BaseCommand {
  readonly type = 'product.attribute.remove';
  constructor(public readonly dto: RemoveAttributeRequestDTO) {
    super();
  }
}
