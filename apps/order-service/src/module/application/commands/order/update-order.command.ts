import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateOrderRequestDTO } from '../../dtos/requests/order/update-order.dto.js';

export class UpdateOrderCommand extends BaseCommand {
  readonly type = 'order.update';
  constructor(public readonly dto: UpdateOrderRequestDTO, public readonly actorId?: string) { super(); }
}
