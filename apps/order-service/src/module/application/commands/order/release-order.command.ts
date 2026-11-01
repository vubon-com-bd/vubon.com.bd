/**
 * ReleaseOrderCommand
 * @module order-service/application/commands/order
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReleaseOrderCommandDTO } from '../../dtos/requests/order/index.js';

export class ReleaseOrderCommand extends BaseCommand {
  readonly type = 'order.order.release';

  constructor(
    public readonly dto: ReleaseOrderCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
