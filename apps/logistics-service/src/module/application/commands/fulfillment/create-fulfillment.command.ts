import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class CreateFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.create';
  constructor(public readonly dto: CreateFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
