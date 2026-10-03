import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/start-fulfillment.dto.js';

export class StartFulfillmentCommand extends BaseCommand {
  readonly type = 'fulfillment.start';
  constructor(public readonly dto: StartFulfillmentRequestDTO, public readonly actorId?: string) { super(); }
}
