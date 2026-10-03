import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddOrderItemRequestDTO } from '../../dtos/requests/order-item/add-order-item.dto.js';

export class AddOrderItemCommand extends BaseCommand {
  readonly type = 'order.item.add';
  constructor(public readonly dto: AddOrderItemRequestDTO, public readonly actorId?: string) { super(); }
}
