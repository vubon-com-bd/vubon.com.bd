import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.create';

  constructor(
    public readonly shipmentId: string,
    public readonly dispatchType: string = 'standard',
  ) {
    super();
  }
}
