import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RecoverCartRequestDTO } from '../../dtos/requests/cart/recover-cart.dto.js';

export class RecoverCartCommand extends BaseCommand {
  readonly type = 'cart.recover';
  constructor(public readonly dto: RecoverCartRequestDTO) { super(); }
}
