import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { HoldFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class HoldFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.hold';
  constructor(public readonly dto: HoldFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
