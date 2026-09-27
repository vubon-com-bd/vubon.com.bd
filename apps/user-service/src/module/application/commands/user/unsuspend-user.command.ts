/**
 * UnsuspendUserCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UnsuspendUserCommand extends BaseCommand {
  readonly type = 'user.unsuspend';

  constructor(public readonly userId: string) {
    super();
  }
}
