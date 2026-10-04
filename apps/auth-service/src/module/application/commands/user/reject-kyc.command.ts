import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RejectKycRequestDTO } from '../../dtos/requests/user/reject-kyc.dto.js';

export class RejectKycCommand extends BaseCommand {
  readonly type = 'user.reject-kyc';
  constructor(public readonly input: RejectKycRequestDTO) { super(); }
}
