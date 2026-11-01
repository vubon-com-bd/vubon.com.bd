import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { VerifyBackupCodeRequestDTO } from '../../dtos/requests/auth/verify-backup-code.dto.js';
export class VerifyBackupCodeCommand extends BaseCommand {
  readonly type = 'auth.verify-backup-code';
  readonly commandType = 'auth.verify-backup-code';
  constructor(public readonly authId: string, public readonly input: VerifyBackupCodeRequestDTO) { super(); }
}
