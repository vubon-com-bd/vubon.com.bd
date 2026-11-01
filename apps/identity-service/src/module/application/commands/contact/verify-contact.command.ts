import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
export class VerifyContactCommand extends BaseCommand {
  readonly type = 'user.verify-contact';
  readonly commandType = 'user.verify-contact';
  constructor(public readonly contactId: string, public readonly code: string) { super(); }
}
