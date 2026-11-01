import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateFulfillmentRequestDTO } from '@application/dtos/requests/fulfillment/index.js';
export class CreateFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.create';
  constructor(public readonly dto: CreateFulfillmentRequestDTO, public readonly actorId: string) { super(); }
}
