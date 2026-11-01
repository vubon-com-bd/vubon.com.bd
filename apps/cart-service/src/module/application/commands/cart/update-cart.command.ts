import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateCartRequestDTO } from '../../dtos/requests/cart/index.js';

export class UpdateCartCommand extends BaseCommand {
  readonly type = 'cart.cart.update';

  constructor(
    public readonly dto: UpdateCartRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
