import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SubmitVerificationCommand extends BaseCommand {
  readonly type = 'vendor.verification.submit';

  constructor(
    public readonly vendorId: string,
    public readonly documents: ReadonlyArray<{
      type: string;
      url: string;
      number?: string;
      expiresAt?: string;
    }>,
  ) {
    super();
  }
}
