import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreatePackagingRequestDTO } from '../../dtos/requests/packaging/packaging.dto.js';
export class CreatePackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.create';
  constructor(public readonly dto: CreatePackagingRequestDTO, public readonly actorId?: string) { super(); }
}
