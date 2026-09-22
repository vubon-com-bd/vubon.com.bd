import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddContactCommand extends BaseCommand {
  readonly type = 'user.contact.add';

  constructor(
    public readonly userId: string,
    public readonly contactType: string,
    public readonly value: string,
  ) {
    super();
  }
}
