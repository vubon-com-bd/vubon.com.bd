import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteCartRequestDTO } from '../../dtos/requests/cart/index.js';

export class DeleteCartCommand extends BaseCommand {
  readonly type = 'cart.cart.delete';

  constructor(
    public readonly dto: DeleteCartRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
