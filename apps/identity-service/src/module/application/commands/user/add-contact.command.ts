import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { AddContactRequestDTO } from '../../dtos/requests/user/add-contact.dto.js';
export class AddContactCommand extends BaseCommand {
  readonly type = 'user.add-contact';
  readonly commandType = 'user.add-contact';
  constructor(public readonly userId: string, public readonly input: AddContactRequestDTO) { super(); }
}
