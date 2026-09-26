import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendWelcomeEmailCommand extends BaseSagaCommand {
  readonly type = 'marketing.saga.send-welcome-email';

  constructor(public readonly userId: string) {
    super();
  }
}
