import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MoveToCartRequestDTO } from '../../dtos/requests/saved/move-to-cart.dto.js';

export class MoveToCartCommand extends BaseCommand {
  readonly type = 'saved.move-to-cart';
  constructor(public readonly dto: MoveToCartRequestDTO) { super(); }
}
