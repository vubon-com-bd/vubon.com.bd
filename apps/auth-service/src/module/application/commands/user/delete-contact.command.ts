import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { DeleteContactRequestDTO } from '../../dtos/requests/user/delete-contact.dto';

export class DeleteContactCommand extends BaseCommand {
  readonly type = 'user.delete-contact';
  constructor(public readonly input: DeleteContactRequestDTO) { super(); }
}
