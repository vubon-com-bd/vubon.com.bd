import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateOrderRequestDTO } from '../../dtos/requests/order/create-order.dto.js';

export class CreateOrderCommand extends BaseCommand {
  readonly type = 'order.create';
  constructor(
    public readonly dto: CreateOrderRequestDTO,
    public readonly actorId?: string,
  ) { super(); }
}
