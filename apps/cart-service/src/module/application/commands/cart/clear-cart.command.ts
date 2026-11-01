import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ClearCartRequestDTO } from '../../dtos/requests/cart/index.js';

export class ClearCartCommand extends BaseCommand {
  readonly type = 'cart.cart.clear';

  constructor(
    public readonly dto: ClearCartRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
