/**
 * DeleteUserCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeleteUserCommand extends BaseCommand {
  readonly type = 'user.delete';

  constructor(
    public readonly userId: string,
    public readonly reason?: string,
    public readonly hardDelete: boolean = false
  ) {
    super();
  }
}
