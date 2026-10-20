/**
 * ConfirmDeliveryCommand
 * @module order-service/application/commands/delivery
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConfirmDeliveryCommandDTO } from '../../dtos/requests/delivery/index.js';

export class ConfirmDeliveryCommand extends BaseCommand {
  readonly type = 'order.delivery.confirm';

  constructor(
    public readonly dto: ConfirmDeliveryCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
