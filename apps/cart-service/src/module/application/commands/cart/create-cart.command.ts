import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateCartRequestDTO } from '../../dtos/requests/cart/index.js';

export class CreateCartCommand extends BaseCommand {
  readonly type = 'cart.cart.create';

  constructor(
    public readonly dto: CreateCartRequestDTO,
    public readonly userId?: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
