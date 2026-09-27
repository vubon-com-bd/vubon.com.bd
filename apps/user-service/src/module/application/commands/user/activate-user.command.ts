/**
 * ActivateUserCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ActivateUserCommand extends BaseCommand {
  readonly type = 'user.activate';

  constructor(public readonly userId: string) {
    super();
  }
}
