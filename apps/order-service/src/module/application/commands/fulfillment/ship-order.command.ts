/**
 * ShipOrderCommand
 * @module order-service/application/commands/fulfillment
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ShipOrderCommandDTO } from '../../dtos/requests/fulfillment/index.js';

export class ShipOrderCommand extends BaseCommand {
  readonly type = 'order.fulfillment.ship';

  constructor(
    public readonly dto: ShipOrderCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
