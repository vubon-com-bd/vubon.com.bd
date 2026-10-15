import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddItemRequestDTO } from '../../dtos/requests/item/index.js';

export class AddItemCommand extends BaseCommand {
  readonly type = 'cart.item.add';

  constructor(
    public readonly dto: AddItemRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
