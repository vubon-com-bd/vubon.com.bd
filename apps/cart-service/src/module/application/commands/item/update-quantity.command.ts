import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateQuantityRequestDTO } from '../../dtos/requests/item/index.js';

export class UpdateQuantityCommand extends BaseCommand {
  readonly type = 'cart.item.update_quantity';

  constructor(
    public readonly dto: UpdateQuantityRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
