import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MoveToCartRequestDTO } from '../../dtos/requests/saved/index.js';

export class MoveToCartCommand extends BaseCommand {
  readonly type = 'cart.saved.move_to_cart';

  constructor(
    public readonly dto: MoveToCartRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
