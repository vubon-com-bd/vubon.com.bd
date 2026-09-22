import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RescheduleDeliveryCommand extends BaseCommand {
  readonly type = 'delivery.reschedule';

  constructor(
    public readonly deliveryId: string,
    public readonly scheduledAt: string,
  ) {
    super();
  }
}
