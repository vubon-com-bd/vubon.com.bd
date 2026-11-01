import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/vendor/index.js';

export class UpdateProfileCommand extends BaseCommand {
  readonly type = 'vendor.vendor.update_profile';
  constructor(
    public readonly dto: UpdateProfileRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
