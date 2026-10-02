import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteCartRequestDTO } from '../../dtos/requests/cart/delete-cart.dto.js';

export class DeleteCartCommand extends BaseCommand {
  readonly type = 'cart.delete';
  constructor(public readonly dto: DeleteCartRequestDTO) { super(); }
}
