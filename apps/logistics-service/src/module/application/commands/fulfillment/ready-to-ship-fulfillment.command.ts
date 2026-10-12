import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReadyToShipRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class ReadyToShipFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.ready_to_ship';
  constructor(public readonly dto: ReadyToShipRequestDTO, public readonly actorId?: string) { super(); }
}
