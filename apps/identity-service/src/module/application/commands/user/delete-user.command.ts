import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { DeleteUserRequestDTO } from '../../dtos/requests/user/delete-user.dto.js';
export class DeleteUserCommand extends BaseCommand {
  readonly type = 'user.delete';
  readonly commandType = 'user.delete';
  constructor(public readonly input: DeleteUserRequestDTO, public readonly deletedBy?: string) { super(); }
}
