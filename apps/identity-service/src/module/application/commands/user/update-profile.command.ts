import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/user/update-profile.dto.js';
export class UpdateProfileCommand extends BaseCommand {
  readonly type = 'user.update-profile';
  readonly commandType = 'user.update-profile';
  constructor(public readonly userId: string, public readonly input: UpdateProfileRequestDTO) { super(); }
}
