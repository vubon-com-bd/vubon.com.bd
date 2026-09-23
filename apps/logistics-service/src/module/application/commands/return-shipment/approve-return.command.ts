import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApproveReturnCommand extends BaseCommand {
  readonly type = 'logistics.return-shipment.approve';

  constructor(
    public readonly returnShipmentId: string,
    public readonly notes?: string,
  ) {
    super();
  }
}
