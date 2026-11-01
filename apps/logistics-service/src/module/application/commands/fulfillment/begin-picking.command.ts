import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { BeginPickingRequestDTO } from '@application/dtos/requests/fulfillment/index.js';
export class BeginPickingFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.begin-icking';
  constructor(public readonly dto: BeginPickingRequestDTO, public readonly actorId: string) { super(); }
}
