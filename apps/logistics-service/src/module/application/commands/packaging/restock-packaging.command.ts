import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RestockPackagingRequestDTO } from '../../dtos/requests/packaging/packaging.dto.js';
export class RestockPackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.restock';
  constructor(public readonly dto: RestockPackagingRequestDTO, public readonly actorId?: string) { super(); }
}
