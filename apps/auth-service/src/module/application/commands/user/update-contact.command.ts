import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateContactCommand extends BaseCommand {
  readonly type = 'user.update-contact';

  constructor(
    public readonly contactId: string,
    public readonly phone?: string,
    public readonly email?: string,
  ) {
    super();
  }
}
