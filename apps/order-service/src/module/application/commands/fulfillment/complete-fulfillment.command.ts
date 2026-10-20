/**
 * CompleteFulfillmentCommand
 * @module order-service/application/commands/fulfillment
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CompleteFulfillmentCommandDTO } from '../../dtos/requests/fulfillment/index.js';

export class CompleteFulfillmentCommand extends BaseCommand {
  readonly type = 'order.fulfillment.complete';

  constructor(
    public readonly dto: CompleteFulfillmentCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
