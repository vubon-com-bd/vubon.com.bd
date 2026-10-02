import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateCartRequestDTO } from '../../dtos/requests/cart/create-cart.dto.js';

export class CreateCartCommand extends BaseCommand {
  readonly type = 'cart.create';
  constructor(
    public readonly dto: CreateCartRequestDTO,
    public readonly actorId?: string,
  ) { super(); }
}
