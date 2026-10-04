import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateOrderItemRequestDTO } from '../../dtos/requests/order-item/update-order-item.dto.js';

export class UpdateOrderItemCommand extends BaseCommand {
  readonly type = 'order.item.update';
  constructor(public readonly dto: UpdateOrderItemRequestDTO, public readonly actorId?: string) { super(); }
}
