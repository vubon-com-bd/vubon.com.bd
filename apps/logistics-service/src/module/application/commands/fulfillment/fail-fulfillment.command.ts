import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { FailFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class FailFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.fail';
  constructor(public readonly dto: FailFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
