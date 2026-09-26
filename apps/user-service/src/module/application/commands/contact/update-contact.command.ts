import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateContactCommand extends BaseCommand {
  readonly type = 'user.contact.update';

  constructor(
    public readonly contactId: string,
    public readonly value?: string,
  ) {
    super();
  }
}
