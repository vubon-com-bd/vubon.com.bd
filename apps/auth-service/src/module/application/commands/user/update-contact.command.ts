import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateContactRequestDTO } from '../../dtos/requests/user/update-contact.dto';

export class UpdateContactCommand extends BaseCommand {
  readonly type = 'user.update-contact';
  constructor(public readonly input: UpdateContactRequestDTO) { super(); }
}
