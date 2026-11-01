import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateSizeRequestDTO } from '@application/dtos/requests/packaging/index.js';
export class UpdateSizePackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.update_size';
  constructor(public readonly dto: UpdateSizeRequestDTO, public readonly actorId: string) { super(); }
}
