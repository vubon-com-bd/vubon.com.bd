import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FulfillRequestDTO } from '@application/dtos/requests/fulfillment/index.js';
export class FulfillFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.fulfill';
  constructor(public readonly dto: FulfillRequestDTO, public readonly actorId: string) { super(); }
}
