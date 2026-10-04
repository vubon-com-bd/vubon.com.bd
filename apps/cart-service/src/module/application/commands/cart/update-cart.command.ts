import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateCartRequestDTO } from '../../dtos/requests/cart/update-cart.dto.js';

export class UpdateCartCommand extends BaseCommand {
  readonly type = 'cart.update';
  constructor(
    public readonly cartId: string,
    public readonly dto: UpdateCartRequestDTO,
  ) { super(); }
}
