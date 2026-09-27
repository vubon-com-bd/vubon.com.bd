/**
 * SubmitKycCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SubmitKycRequestDTO } from '../../dtos/requests/kyc/index.js';

export class SubmitKycCommand extends BaseCommand {
  readonly type = 'kyc.submit';

  constructor(public readonly payload: SubmitKycRequestDTO) {
    super();
  }
}
