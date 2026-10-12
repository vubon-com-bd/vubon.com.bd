/**
 * ResubmitApprovalCommand
 * @module vendor-service/application/commands/approval
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ResubmitApprovalCommand extends BaseCommand {
  readonly type = 'vendor.approval.resubmit';
  constructor(
    public readonly vendorId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
