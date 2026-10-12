import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ShipFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class ShipFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.ship';
  constructor(public readonly dto: ShipFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
