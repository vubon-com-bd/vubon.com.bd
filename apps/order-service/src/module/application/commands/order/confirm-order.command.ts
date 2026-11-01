/**
 * ConfirmOrderCommand
 * @module order-service/application/commands/order
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConfirmOrderCommandDTO } from '../../dtos/requests/order/index.js';

export class ConfirmOrderCommand extends BaseCommand {
  readonly type = 'order.order.confirm';

  constructor(
    public readonly dto: ConfirmOrderCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
