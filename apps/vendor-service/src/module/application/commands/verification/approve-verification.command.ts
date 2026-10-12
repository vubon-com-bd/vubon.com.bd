/**
 * ApproveVerificationCommand
 * @module vendor-service/application/commands/verification
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ApproveVerificationCommand extends BaseCommand {
  readonly type = 'vendor.verification.approve';
  constructor(
    public readonly vendorId: string,
    public readonly reviewedBy: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
