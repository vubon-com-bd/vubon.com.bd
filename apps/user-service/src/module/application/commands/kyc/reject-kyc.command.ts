/**
 * RejectKycCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RejectKycCommand extends BaseCommand {
  readonly type = 'kyc.reject';

  constructor(
    public readonly kycId: string,
    public readonly reason: string,
    public readonly rejectedBy: string
  ) {
    super();
  }
}
