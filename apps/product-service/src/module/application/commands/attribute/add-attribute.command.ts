import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddAttributeRequestDTO } from '../../dtos/requests/attribute/index.js';

export class AddAttributeCommand extends BaseCommand {
  readonly type = 'product.attribute.add';
  constructor(public readonly dto: AddAttributeRequestDTO) {
    super();
  }
}
