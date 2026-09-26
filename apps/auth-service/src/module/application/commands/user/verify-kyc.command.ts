import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { VerifyKycRequestDTO } from '../../dtos/requests/user/verify-kyc.dto';

export class VerifyKycCommand extends BaseCommand {
  readonly type = 'user.verify-kyc';
  constructor(public readonly input: VerifyKycRequestDTO) { super(); }
}
