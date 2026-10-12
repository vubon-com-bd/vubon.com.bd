import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ReverifyKycRequestDTO } from '../../dtos/requests/kyc/reverify-kyc.dto.js';
export class ReverifyKycCommand extends BaseCommand {
  readonly type = 'user.reverify-kyc';
  readonly commandType = 'user.reverify-kyc';
  constructor(public readonly userId: string, public readonly input: ReverifyKycRequestDTO) { super(); }
}
