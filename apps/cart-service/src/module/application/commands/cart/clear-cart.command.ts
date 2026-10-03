import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ClearCartRequestDTO } from '../../dtos/requests/cart/clear-cart.dto.js';

export class ClearCartCommand extends BaseCommand {
  readonly type = 'cart.clear';
  constructor(public readonly dto: ClearCartRequestDTO) { super(); }
}
