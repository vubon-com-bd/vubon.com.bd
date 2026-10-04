/**
 * UpdateContactCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateContactCommand extends BaseCommand {
  readonly type = 'contact.update';

  constructor(
    public readonly userId: string,
    public readonly contactId: string,
    public readonly value?: string,
    public readonly label?: string,
    public readonly isPrimary?: boolean
  ) {
    super();
  }
}
