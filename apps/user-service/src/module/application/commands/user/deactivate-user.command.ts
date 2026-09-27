/**
 * DeactivateUserCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeactivateUserCommand extends BaseCommand {
  readonly type = 'user.deactivate';

  constructor(
    public readonly userId: string,
    public readonly reason?: string
  ) {
    super();
  }
}
