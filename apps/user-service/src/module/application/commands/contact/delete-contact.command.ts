import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteContactCommand extends BaseCommand {
  readonly type = 'user.contact.delete';

  constructor(public readonly contactId: string) {
    super();
  }
}
