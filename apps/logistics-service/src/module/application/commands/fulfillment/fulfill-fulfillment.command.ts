import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FulfillFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class FulfillFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.fulfill';
  constructor(public readonly dto: FulfillFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
