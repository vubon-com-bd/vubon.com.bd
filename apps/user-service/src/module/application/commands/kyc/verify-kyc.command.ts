/**
 * VerifyKycCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class VerifyKycCommand extends BaseCommand {
  readonly type = 'kyc.verify';

  constructor(
    public readonly kycId: string,
    public readonly verifiedBy: string
  ) {
    super();
  }
}
