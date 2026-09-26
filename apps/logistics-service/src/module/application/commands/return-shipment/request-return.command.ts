import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RequestReturnCommand extends BaseCommand {
  readonly type = 'logistics.return-shipment.request';

  constructor(
    public readonly shipmentId: string,
    public readonly reason: string,
    public readonly reasonType?: string,
  ) {
    super();
  }
}
