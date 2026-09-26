import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SuspendCourierCommand extends BaseCommand {
  readonly type = 'logistics.courier.suspend';

  constructor(
    public readonly courierId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
