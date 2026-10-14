import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveVendorRequestDTO } from '../../dtos/requests/approval/index.js';

export class ApproveVendorCommand extends BaseCommand {
  readonly type = 'vendor.approval.approve';
  constructor(
    public readonly dto: ApproveVendorRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
