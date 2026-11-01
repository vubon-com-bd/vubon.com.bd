/**
 * RescheduleDeliveryCommand
 * @module order-service/application/commands/delivery
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RescheduleDeliveryCommandDTO } from '../../dtos/requests/delivery/index.js';

export class RescheduleDeliveryCommand extends BaseCommand {
  readonly type = 'order.delivery.reschedule';

  constructor(
    public readonly dto: RescheduleDeliveryCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
