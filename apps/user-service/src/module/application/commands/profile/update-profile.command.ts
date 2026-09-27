/**
 * UpdateProfileCommand
 * @module user-service/application/commands/profile
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/profile/index.js';

export class UpdateProfileCommand extends BaseCommand {
  readonly type = 'profile.update';

  constructor(
    public readonly userId: string,
    public readonly payload: UpdateProfileRequestDTO
  ) {
    super();
  }
}
