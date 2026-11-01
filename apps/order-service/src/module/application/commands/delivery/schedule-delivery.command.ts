/**
 * ScheduleDeliveryCommand
 * @module order-service/application/commands/delivery
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ScheduleDeliveryCommandDTO } from '../../dtos/requests/delivery/index.js';

export class ScheduleDeliveryCommand extends BaseCommand {
  readonly type = 'order.delivery.schedule';

  constructor(
    public readonly dto: ScheduleDeliveryCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
