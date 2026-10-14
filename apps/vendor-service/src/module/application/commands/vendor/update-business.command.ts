import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateBusinessRequestDTO } from '../../dtos/requests/vendor/index.js';

export class UpdateBusinessCommand extends BaseCommand {
  readonly type = 'vendor.vendor.update_business';
  constructor(
    public readonly dto: UpdateBusinessRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
