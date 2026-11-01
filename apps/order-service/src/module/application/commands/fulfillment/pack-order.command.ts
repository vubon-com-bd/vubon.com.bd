/**
 * PackOrderCommand
 * @module order-service/application/commands/fulfillment
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PackOrderCommandDTO } from '../../dtos/requests/fulfillment/index.js';

export class PackOrderCommand extends BaseCommand {
  readonly type = 'order.fulfillment.pack';

  constructor(
    public readonly dto: PackOrderCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
