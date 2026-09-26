import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateUserCommand extends BaseCommand {
  readonly type = 'user.update';

  constructor(
    public readonly userId: string,
    public readonly emailVerified?: boolean,
    public readonly userType?: string,
    public readonly userStatus?: string,
    public readonly phone?: string,
    public readonly username?: string,
  ) {
    super();
  }
}
