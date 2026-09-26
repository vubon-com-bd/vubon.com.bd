import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class VerifyContactCommand extends BaseCommand {
  readonly type = 'user.contact.verify';

  constructor(
    public readonly contactId: string,
    public readonly code: string,
  ) {
    super();
  }
}
