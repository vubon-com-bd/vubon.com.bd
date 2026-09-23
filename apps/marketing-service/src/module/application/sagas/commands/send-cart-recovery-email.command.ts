import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendCartRecoveryEmailCommand extends BaseSagaCommand {
  readonly type = 'marketing.saga.send-cart-recovery-email';

  constructor(public readonly userId: string) {
    super();
  }
}
