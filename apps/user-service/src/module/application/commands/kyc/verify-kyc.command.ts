import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class VerifyKycCommand extends BaseCommand {
  readonly type = 'user.kyc.verify';

  constructor(
    public readonly userId: string,
    public readonly kycId: string,
  ) {
    super();
  }
}
