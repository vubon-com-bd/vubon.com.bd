import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveItemRequestDTO } from '../../dtos/requests/item/index.js';

export class RemoveItemCommand extends BaseCommand {
  readonly type = 'cart.item.remove';

  constructor(
    public readonly dto: RemoveItemRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
