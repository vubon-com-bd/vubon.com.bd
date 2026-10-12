import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SelectPackagingRequestDTO } from '../../dtos/requests/packaging/packaging.dto.js';
export class SelectPackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.select';
  constructor(public readonly dto: SelectPackagingRequestDTO, public readonly actorId?: string) { super(); }
}
