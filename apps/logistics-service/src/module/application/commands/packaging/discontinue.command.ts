import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DiscontinuePackagingRequestDTO } from '@application/dtos/requests/packaging/index.js';
export class DiscontinuePackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.discontinue';
  constructor(public readonly dto: DiscontinuePackagingRequestDTO, public readonly actorId: string) { super(); }
}
