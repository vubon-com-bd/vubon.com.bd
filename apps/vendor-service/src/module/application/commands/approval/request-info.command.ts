import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RequestInfoRequestDTO } from '../../dtos/requests/approval/index.js';

export class RequestInfoCommand extends BaseCommand {
  readonly type = 'vendor.approval.request_info';
  constructor(
    public readonly dto: RequestInfoRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
