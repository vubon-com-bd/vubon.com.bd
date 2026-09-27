/**
 * VerifyContactCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class VerifyContactCommand extends BaseCommand {
  readonly type = 'contact.verify';

  constructor(
    public readonly userId: string,
    public readonly contactId: string,
    public readonly verificationCode: string
  ) {
    super();
  }
}
