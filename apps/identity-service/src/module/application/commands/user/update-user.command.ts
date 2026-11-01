import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateUserRequestDTO } from '../../dtos/requests/user/update-user.dto.js';
export class UpdateUserCommand extends BaseCommand {
  readonly type = 'user.update';
  readonly commandType = 'user.update';
  constructor(public readonly userId: string, public readonly input: UpdateUserRequestDTO, public readonly updatedBy?: string) { super(); }
}
