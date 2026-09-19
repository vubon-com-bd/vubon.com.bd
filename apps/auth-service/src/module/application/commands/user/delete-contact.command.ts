import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteContactCommand extends BaseCommand {
  readonly type = 'user.delete-contact';

  constructor(public readonly contactId: string) {
    super();
  }
}
