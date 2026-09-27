/**
 * NotifyKycStatusCommand
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyKycStatusCommand extends BaseSagaCommand {
  readonly type = 'saga.notify.kycStatus';

  constructor(
    public readonly userId: string,
    public readonly kycId: string,
    public readonly status: string,
    public readonly reason?: string
  ) {
    super();
  }
}
