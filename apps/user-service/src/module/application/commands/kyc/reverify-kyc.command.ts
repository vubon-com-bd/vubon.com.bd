/**
 * ReverifyKycCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ReverifyKycCommand extends BaseCommand {
  readonly type = 'kyc.reverify';

  constructor(
    public readonly kycId: string,
    public readonly userId: string,
    public readonly reason?: string
  ) {
    super();
  }
}
