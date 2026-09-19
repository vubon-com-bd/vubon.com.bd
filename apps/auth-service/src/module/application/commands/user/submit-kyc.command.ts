import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface KycDocumentInput {
  readonly type: string;
  readonly frontUrl: string;
  readonly number?: string;
  readonly backUrl?: string;
  readonly selfieUrl?: string;
}

export class SubmitKycCommand extends BaseCommand {
  readonly type = 'user.submit-kyc';

  constructor(
    public readonly userId: string,
    public readonly documents: readonly KycDocumentInput[],
    public readonly acceptTerms: true = true,
  ) {
    super();
  }
}
