import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ReverifyKycCommand extends BaseCommand {
  readonly type = 'user.kyc.reverify';

  constructor(
    public readonly userId: string,
    public readonly kycId: string,
  ) {
    super();
  }
}
