import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { AddContactRequestDTO } from '../../dtos/requests/user/add-contact.dto';

export class AddContactCommand extends BaseCommand {
  readonly type = 'user.add-contact';
  constructor(
    public readonly userId: UserId,
    public readonly input: AddContactRequestDTO,
  ) { super(); }
}
