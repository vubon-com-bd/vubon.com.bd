/**
 * SuspendUserCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SuspendUserCommand extends BaseCommand {
  readonly type = 'user.suspend';

  constructor(
    public readonly userId: string,
    public readonly reason: string,
    public readonly suspendedUntil?: string
  ) {
    super();
  }
}
