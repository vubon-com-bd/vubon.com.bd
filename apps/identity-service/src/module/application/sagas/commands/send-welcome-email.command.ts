/**
 * Send Welcome Email Command (Saga step)
 * @module identity-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendWelcomeEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.send-welcome-email';
  constructor(
    public readonly userId: string,
    public readonly email: string,
  ) {
    super();
  }
}
