import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateItemRequestDTO } from '../../dtos/requests/item/index.js';

export class UpdateItemCommand extends BaseCommand {
  readonly type = 'cart.item.update';

  constructor(
    public readonly dto: UpdateItemRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
