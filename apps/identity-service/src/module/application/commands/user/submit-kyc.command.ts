import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SubmitKycRequestDTO } from '../../dtos/requests/user/submit-kyc.dto.js';
export class SubmitKycCommand extends BaseCommand {
  readonly type = 'user.submit-kyc';
  readonly commandType = 'user.submit-kyc';
  constructor(public readonly userId: string, public readonly input: SubmitKycRequestDTO) { super(); }
}
