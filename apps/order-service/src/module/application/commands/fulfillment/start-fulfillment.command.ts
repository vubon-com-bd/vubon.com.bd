/**
 * StartFulfillmentCommand
 * @module order-service/application/commands/fulfillment
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartFulfillmentCommandDTO } from '../../dtos/requests/fulfillment/index.js';

export class StartFulfillmentCommand extends BaseCommand {
  readonly type = 'order.fulfillment.start';

  constructor(
    public readonly dto: StartFulfillmentCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
