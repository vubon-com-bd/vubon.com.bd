import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CompleteDeliveryCommand extends BaseCommand {
  readonly type = 'logistics.delivery.complete';

  constructor(
    public readonly deliveryId: string,
    public readonly signature?: string,
    public readonly photoUrl?: string,
    public readonly otp?: string,
  ) {
    super();
  }
}
