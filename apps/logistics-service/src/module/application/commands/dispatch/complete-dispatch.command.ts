import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CompleteDispatchCommand extends BaseCommand {
  readonly type = 'logistics.dispatch.complete';

  constructor(
    public readonly dispatchId: string,
    public readonly arrivedAt?: string,
  ) {
    super();
  }
}
