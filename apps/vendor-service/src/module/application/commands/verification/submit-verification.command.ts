import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SubmitVerificationRequestDTO } from '../../dtos/requests/verification/index.js';

export class SubmitVerificationCommand extends BaseCommand {
  readonly type = 'vendor.verification.submit';
  constructor(
    public readonly dto: SubmitVerificationRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
