import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConsumePackagingRequestDTO } from '../../dtos/requests/packaging/packaging.dto.js';
export class ConsumePackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.consume';
  constructor(public readonly dto: ConsumePackagingRequestDTO, public readonly actorId?: string) { super(); }
}
