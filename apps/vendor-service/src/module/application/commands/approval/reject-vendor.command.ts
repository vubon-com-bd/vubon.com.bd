import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectVendorRequestDTO } from '../../dtos/requests/approval/index.js';

export class RejectVendorCommand extends BaseCommand {
  readonly type = 'vendor.approval.reject';
  constructor(
    public readonly dto: RejectVendorRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
