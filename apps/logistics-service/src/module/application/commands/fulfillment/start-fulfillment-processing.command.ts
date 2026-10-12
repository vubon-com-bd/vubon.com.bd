import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartProcessingRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class StartFulfillmentProcessingCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.start_processing';
  constructor(public readonly dto: StartProcessingRequestDTO, public readonly actorId?: string) { super(); }
}
