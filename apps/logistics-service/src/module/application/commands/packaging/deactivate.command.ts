import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivatePackagingRequestDTO } from '@application/dtos/requests/packaging/index.js';
export class DeactivatePackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.deactivate';
  constructor(public readonly dto: DeactivatePackagingRequestDTO, public readonly actorId: string) { super(); }
}
