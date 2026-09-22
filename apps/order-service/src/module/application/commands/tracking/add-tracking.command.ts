import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddTrackingCommand extends BaseCommand {
  readonly type = 'tracking.add';

  constructor(
    public readonly orderId: string,
    public readonly trackingNumber: string,
    public readonly carrier: string,
  ) {
    super();
  }
}
