import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdatePackagingRequestDTO } from '../../dtos/requests/packaging/packaging.dto.js';
export class UpdatePackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.update';
  constructor(public readonly dto: UpdatePackagingRequestDTO, public readonly actorId?: string) { super(); }
}
