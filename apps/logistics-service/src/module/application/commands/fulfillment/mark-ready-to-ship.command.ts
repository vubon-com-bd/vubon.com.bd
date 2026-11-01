import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkReadyToShipRequestDTO } from '@application/dtos/requests/fulfillment/index.js';
export class MarkReadyToShipFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.mark-eady-o-hip';
  constructor(public readonly dto: MarkReadyToShipRequestDTO, public readonly actorId: string) { super(); }
}
