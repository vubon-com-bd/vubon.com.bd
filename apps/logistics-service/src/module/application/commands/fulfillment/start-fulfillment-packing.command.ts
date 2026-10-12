import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartPackingRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class StartFulfillmentPackingCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.start_packing';
  constructor(public readonly dto: StartPackingRequestDTO, public readonly actorId?: string) { super(); }
}
