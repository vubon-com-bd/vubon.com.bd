import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { GenerateRecoveryCodesRequestDTO } from '../../dtos/requests/auth/generate-recovery-codes.dto';

export class GenerateRecoveryCodesCommand extends BaseCommand {
  readonly type = 'auth.generate-recovery-codes';
  constructor(
    public readonly userId: UserId,
    public readonly input: GenerateRecoveryCodesRequestDTO,
  ) { super(); }
}
