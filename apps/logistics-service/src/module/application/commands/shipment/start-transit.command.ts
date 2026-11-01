import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartTransitRequestDTO } from '@application/dtos/requests/shipment/index.js';

export class StartTransitCommand extends BaseCommand {
  readonly type = 'logistics.shipment.start_transit';
  constructor(
    public readonly dto: StartTransitRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
