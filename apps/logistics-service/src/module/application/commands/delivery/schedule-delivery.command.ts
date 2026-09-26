import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ScheduleDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.schedule';

  constructor(
    public readonly shipmentId: string,
    public readonly scheduledAt?: string,
  ) {
    super();
  }
}
