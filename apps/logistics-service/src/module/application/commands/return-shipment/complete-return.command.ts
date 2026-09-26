import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CompleteReturnCommand extends BaseCommand {
  readonly type = 'logistics.return-shipment.complete';

  constructor(
    public readonly returnShipmentId: string,
    public readonly receivedAt?: string,
  ) {
    super();
  }
}
