import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveOrderItemRequestDTO } from '../../dtos/requests/order-item/remove-order-item.dto.js';

export class RemoveOrderItemCommand extends BaseCommand {
  readonly type = 'order.item.remove';
  constructor(public readonly dto: RemoveOrderItemRequestDTO, public readonly actorId?: string) { super(); }
}
