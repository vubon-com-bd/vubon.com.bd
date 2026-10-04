/**
 * UpdateUserCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateUserRequestDTO } from '../../dtos/requests/user/index.js';

export class UpdateUserCommand extends BaseCommand {
  readonly type = 'user.update';

  constructor(
    public readonly userId: string,
    public readonly payload: UpdateUserRequestDTO
  ) {
    super();
  }
}
