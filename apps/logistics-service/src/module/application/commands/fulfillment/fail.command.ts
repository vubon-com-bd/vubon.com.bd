import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FailFulfillmentRequestDTO } from '@application/dtos/requests/fulfillment/index.js';
export class FailFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.fail';
  constructor(public readonly dto: FailFulfillmentRequestDTO, public readonly actorId: string) { super(); }
}
