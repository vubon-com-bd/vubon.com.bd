import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { SubmitKycRequestDTO } from '../../dtos/requests/user/submit-kyc.dto';

export class SubmitKycCommand extends BaseCommand {
  readonly type = 'user.submit-kyc';
  constructor(
    public readonly userId: UserId,
    public readonly input: SubmitKycRequestDTO,
  ) { super(); }
}
