/**
 * CreateOrderCommand
 * @module order-service/application/commands/order
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateOrderCommandDTO } from '../../dtos/requests/order/index.js';

export class CreateOrderCommand extends BaseCommand {
  readonly type = 'order.order.create';

  constructor(
    public readonly dto: CreateOrderCommandDTO,
    public readonly userId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
