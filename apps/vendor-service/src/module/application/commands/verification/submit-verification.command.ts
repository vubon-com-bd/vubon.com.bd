/**
 * SubmitVerificationCommand
 * @module vendor-service/application/commands/verification
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SubmitVerificationRequestDto } from '../../dtos/requests/submit-verification.dto.js';

export class SubmitVerificationCommand extends BaseCommand {
  readonly type = 'vendor.verification.submit';
  constructor(
    public readonly dto: SubmitVerificationRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
