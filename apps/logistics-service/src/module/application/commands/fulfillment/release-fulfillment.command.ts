import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReleaseFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class ReleaseFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.release';
  constructor(public readonly dto: ReleaseFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
