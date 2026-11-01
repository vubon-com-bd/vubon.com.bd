import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PackagingActionRequestDTO } from '@application/dtos/requests/packaging/index.js';
export class ActivatePackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.activate';
  constructor(public readonly dto: PackagingActionRequestDTO, public readonly actorId: string) { super(); }
}
