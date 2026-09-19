import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RejectKycCommand extends BaseCommand {
  readonly type = 'user.reject-kyc';

  constructor(
    public readonly userId: string,
    public readonly kycId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
