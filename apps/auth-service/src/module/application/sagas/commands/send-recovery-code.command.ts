import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendRecoveryCodeCommand extends BaseSagaCommand {
  readonly type = 'saga.send-recovery-code';

  constructor(public readonly userId: string) {
    super();
  }
}
