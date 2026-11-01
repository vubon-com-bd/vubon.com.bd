import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { BeginPackingRequestDTO } from '@application/dtos/requests/fulfillment/index.js';
export class BeginPackingFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.begin-acking';
  constructor(public readonly dto: BeginPackingRequestDTO, public readonly actorId: string) { super(); }
}
