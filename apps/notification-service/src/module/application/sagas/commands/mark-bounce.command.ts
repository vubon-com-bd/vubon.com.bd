import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class MarkBounceCommand extends BaseCommand {
  readonly type = 'saga.bounce.mark';
  constructor(
    public readonly notificationId: string,
    public readonly reason: string,
    public readonly attempt: number,
  ) {
    super();
  }
}
