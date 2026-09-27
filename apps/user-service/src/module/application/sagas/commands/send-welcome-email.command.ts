/**
 * SendWelcomeEmailCommand — Saga command
 * @module user-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SendWelcomeEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.email.welcome';

  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly name: string
  ) {
    super();
  }
}
