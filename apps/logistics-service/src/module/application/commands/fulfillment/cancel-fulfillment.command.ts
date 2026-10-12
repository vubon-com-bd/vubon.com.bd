import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/fulfillment.dto.js';
export class CancelFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.cancel';
  constructor(public readonly dto: CancelFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
