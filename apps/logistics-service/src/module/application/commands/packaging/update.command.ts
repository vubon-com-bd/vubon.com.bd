import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdatePackagingRequestDTO } from '@application/dtos/requests/packaging/index.js';
export class UpdatePackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.update';
  constructor(public readonly dto: UpdatePackagingRequestDTO, public readonly actorId: string) { super(); }
}
