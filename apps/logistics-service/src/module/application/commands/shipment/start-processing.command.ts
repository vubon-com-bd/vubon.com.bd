import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartProcessingRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class StartProcessingCommand extends BaseCommand {
  readonly type = 'logistics.shipment.start_processing';
  constructor(
    public readonly dto: StartProcessingRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
