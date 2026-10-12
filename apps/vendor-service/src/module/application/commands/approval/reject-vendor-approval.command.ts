/**
 * RejectVendorApprovalCommand
 * @module vendor-service/application/commands/approval
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectVendorRequestDto } from '../../dtos/requests/reject-vendor.dto.js';

export class RejectVendorApprovalCommand extends BaseCommand {
  readonly type = 'vendor.approval.reject';
  constructor(
    public readonly dto: RejectVendorRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
