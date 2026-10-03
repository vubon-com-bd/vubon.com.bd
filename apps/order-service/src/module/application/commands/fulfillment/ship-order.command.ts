import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ShipOrderRequestDTO } from '../../dtos/requests/fulfillment/ship-order.dto.js';

export class ShipOrderCommand extends BaseCommand {
  readonly type = 'fulfillment.ship';
  constructor(public readonly dto: ShipOrderRequestDTO, public readonly actorId?: string) { super(); }
}
