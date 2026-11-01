import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RecoverCartRequestDTO } from '../../dtos/requests/cart/index.js';

export class RecoverCartCommand extends BaseCommand {
  readonly type = 'cart.cart.recover';

  constructor(
    public readonly dto: RecoverCartRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
