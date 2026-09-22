import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendWelcomeEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.user.welcome-email';

  constructor(public readonly userId: string) {
    super();
  }
}
