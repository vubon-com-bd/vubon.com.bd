import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateQuantityRequestDTO } from '../../dtos/requests/item/update-quantity.dto.js';

export class UpdateQuantityCommand extends BaseCommand {
  readonly type = 'cart.item.update-quantity';
  constructor(public readonly dto: UpdateQuantityRequestDTO) { super(); }
}
