/**
 * ApproveVendorApprovalCommand — approval workflow approval
 * @module vendor-service/application/commands/approval
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveVendorRequestDto } from '../../dtos/requests/approve-vendor.dto.js';

export class ApproveVendorApprovalCommand extends BaseCommand {
  readonly type = 'vendor.approval.approve';
  constructor(
    public readonly dto: ApproveVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
