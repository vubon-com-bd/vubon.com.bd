import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartFulfillmentRequestDTO } from '@application/dtos/requests/fulfillment/index.js';
export class StartFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.start';
  constructor(public readonly dto: StartFulfillmentRequestDTO, public readonly actorId: string) { super(); }
}
