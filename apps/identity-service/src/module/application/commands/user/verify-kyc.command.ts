import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { VerifyKycRequestDTO } from '../../dtos/requests/user/verify-kyc.dto.js';
export class VerifyKycCommand extends BaseCommand {
  readonly type = 'user.verify-kyc';
  readonly commandType = 'user.verify-kyc';
  constructor(public readonly input: VerifyKycRequestDTO, public readonly reviewedBy: string) { super(); }
}
