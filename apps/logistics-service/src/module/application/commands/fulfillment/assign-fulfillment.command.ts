import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class AssignFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.assign';
  constructor(public readonly dto: AssignFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
