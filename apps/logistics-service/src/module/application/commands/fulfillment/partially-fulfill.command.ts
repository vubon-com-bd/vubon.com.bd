import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PartiallyFulfillRequestDTO } from '@application/dtos/requests/fulfillment/index.js';
export class PartiallyFulfillFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.partially-ulfill';
  constructor(public readonly dto: PartiallyFulfillRequestDTO, public readonly actorId: string) { super(); }
}
