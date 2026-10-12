import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartPickingRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class StartFulfillmentPickingCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.start_picking';
  constructor(public readonly dto: StartPickingRequestDTO, public readonly actorId?: string) { super(); }
}
