import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PutFulfillmentOnHoldRequestDTO } from '@application/dtos/requests/fulfillment/index.js';
export class PutOnHoldFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.put-n-old';
  constructor(public readonly dto: PutFulfillmentOnHoldRequestDTO, public readonly actorId: string) { super(); }
}
