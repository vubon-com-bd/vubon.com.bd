import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddContactCommand extends BaseCommand {
  readonly type = 'user.add-contact';

  constructor(
    public readonly userId: string,
    public readonly phone: string,
    public readonly email: string,
  ) {
    super();
  }
}
