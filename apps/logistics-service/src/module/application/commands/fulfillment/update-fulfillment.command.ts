import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class UpdateFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.update';
  constructor(public readonly dto: UpdateFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
