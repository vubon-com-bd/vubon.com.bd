/**
 * DeleteContactCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeleteContactCommand extends BaseCommand {
  readonly type = 'contact.delete';

  constructor(
    public readonly userId: string,
    public readonly contactId: string
  ) {
    super();
  }
}
