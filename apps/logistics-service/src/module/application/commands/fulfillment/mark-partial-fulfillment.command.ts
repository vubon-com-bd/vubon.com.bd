import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PartialFulfillFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class MarkPartialFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.mark_partial';
  constructor(public readonly dto: PartialFulfillFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
