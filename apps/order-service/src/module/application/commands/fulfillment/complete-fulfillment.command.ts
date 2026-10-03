import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/complete-fulfillment.dto.js';

export class CompleteFulfillmentCommand extends BaseCommand {
  readonly type = 'fulfillment.complete';
  constructor(public readonly dto: CompleteFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
